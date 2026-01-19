import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';

export interface WsMessage {
    event: string;
    payload: any;
}

export type WsStatus = 'connected' | 'disconnected' | 'connecting';

interface WebSocketContextType {
    status: WsStatus;
    lastMessage: WsMessage | null;
    sendMessage: (event: string, payload: any) => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [status, setStatus] = useState<WsStatus>('connecting');
    const [lastMessage, setLastMessage] = useState<WsMessage | null>(null);
    const wsRef = useRef<WebSocket | null>(null);
    const reconnectTimeoutRef = useRef<number | null>(null);
    const isComponentMounted = useRef(true);

    const connect = useCallback(() => {
        if (!isComponentMounted.current) return;

        console.log('Connecting to internal WebSocket server...');
        const ws = new WebSocket('ws://127.0.0.1:8080');
        wsRef.current = ws;

        ws.onopen = () => {
            console.log('WebSocket connected');
            setStatus('connected');
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                setLastMessage(data);
            } catch (e) {
                console.error('Failed to parse WS message:', e);
            }
        };

        ws.onclose = () => {
            if (!isComponentMounted.current) return;
            console.log('WebSocket disconnected. Retrying in 5s...');
            setStatus('disconnected');
            reconnectTimeoutRef.current = window.setTimeout(connect, 5000);
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            ws.close();
        };
    }, []);

    useEffect(() => {
        isComponentMounted.current = true;
        
        // Give the Rust server a tiny bit of time to start up before connecting
        // This prevents the "Connection Refused" error on app launch
        const startupTimeout = setTimeout(() => {
            connect();
        }, 500);

        return () => {
            isComponentMounted.current = false;
            clearTimeout(startupTimeout);
            
            if (wsRef.current) {
                // If it's still connecting, closing it causes a noisy browser error.
                // We only close if it's actually OPEN or CLOSING.
                if (wsRef.current.readyState === WebSocket.OPEN) {
                    wsRef.current.close();
                }
            }
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
        };
    }, [connect]);

    const sendMessage = useCallback((event: string, payload: any) => {
        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({ event, payload }));
        } else {
            console.warn('WebSocket not connected');
        }
    }, []);

    return (
        <WebSocketContext.Provider value={{ status, lastMessage, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocketContext = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocketContext must be used within a WebSocketProvider');
    }
    return context;
};
