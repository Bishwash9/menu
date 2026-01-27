import { useWebSocketContext } from '../Providers/WebSocketProvider';

export const useWebSocket = () => {
    return useWebSocketContext();
};
