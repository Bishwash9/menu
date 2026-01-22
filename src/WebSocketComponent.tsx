import { useState, useEffect, useRef } from 'react';

const WebSocketComponent = () => {
    const [inputMessage, setInputMessage] = useState('');
    const [tableData, setTableData] = useState<TableData[] | null>(null); // State to store table data
    const [orderData, setOrderData] = useState<OrderData[] | null>(null); // State to store order data
    const [isWebSocketConnected, setIsWebSocketConnected] = useState(false); // Track WebSocket connection status
    const socketRef = useRef<WebSocket | null>(null);

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzY5MTAzNDczLCJpYXQiOjE3NjkxMDE2NzMsImp0aSI6ImRlZmM3YzlhNjA2NjQ4MGVhNGI3NGM1MzMxMjAzYzY5IiwidXNlcl9pZCI6IjMifQ.Om1Rfsd4gOGdDhPb22DH9tDkNcrwWhqJQ2HuOIsLyaM';
    interface TableData {
        id: number;
        business_id: number;
        table_number: string;
        location: string;
        status_id: number;
        reserved_by: null | string;
        created_at: string;
        updated_at: string;
    }

    interface OrderData {
        id: number;
        order_number: string;
        business_id: number;
        business_name: string;
        guest_id: number;
        guest_name: string;
        table_id: number;
        order_type_id: number;
        order_type_name: string;
        served_by: number;
        served_by_name: string;
        status_id: number;
        status_name: string;
        subtotal: string;
        tax: string;
        discount: string;
        total_amount: string;
        notes: string;
        created_at: string;
        updated_at: string;
    }

    useEffect(() => {
        // Connect to the WebSocket server at the /ws/conn/ endpoint
        const ws = new WebSocket(`wss://p448pq99-8000.inc1.devtunnels.ms/ws/api/?token=${token}`);
        socketRef.current = ws;

        ws.onopen = () => {
            console.log('WebSocket connection established');
            setIsWebSocketConnected(true); // Set connection status to true
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('Received:', data);

                if (data.status === 'success') {
                    // Logic based on the "action" returned by our Unified Consumer
                    switch (data.action) {
                        case 'connection_established':
                        case 'pong':
                            console.log('Ping/Pong received');
                            break;
                        case 'tables_list':
                        case 'table_details':
                            setTableData(data.data);
                            break;
                        case 'orders_list':
                            setOrderData(data.data);
                            break;
                        case 'order_created':
                            setOrderData((prevOrders) => [...(prevOrders || []), data.data]); // Add new order to the list
                            break;
                        case 'subscribed':
                            console.log('Subscribed to table:', data.data.table_id);
                            break;
                        default:
                            console.log('Unhandled action:', data.action);
                    }
                } else if (data.status === 'error') {
                    console.error(`Backend Error: ${data.message}`);
                }
            } catch (error) {
                console.error('Parsing error:', error);
            }
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
            setIsWebSocketConnected(false);
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
                console.log('WebSocket connection closed on unmount');
            }
        };
    }, [token]);

    // --- Unified Helper to send actions ---
    const sendAction = (action: string, payload: Record<string, unknown> = {}) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
            const message = { action, ...payload };
            console.log('Sending message:', message);
            socketRef.current.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not open');
        }
    };

    return (
        <div>
            <h1>Unified WebSocket (Django Channels)</h1>
            <p>Status: {isWebSocketConnected ? '🟢 Connected' : '🔴 Disconnected'}</p>

            <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                <input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ping text..."
                />
                <button onClick={() => sendAction('ping', { message: inputMessage })}>Ping Server</button>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => sendAction('get_tables')}>Fetch All Tables</button>
                <button onClick={() => sendAction('get_table', { table_id: 1 })}>Fetch Table with ID 1</button>
                <button onClick={() => sendAction('create_table', { name: 'New Table', status: 'Available' })}>Create Table</button>
                <button onClick={() => sendAction('update_table', { table_id: 1, name: 'Updated Table', status: 'Occupied' })}>Update Table</button>
                <button onClick={() => sendAction('delete_table', { table_id: 1 })}>Delete Table</button>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button onClick={() => sendAction('get_orders', { table_id: 1 })}>Fetch Orders for Table 1</button>
                <button onClick={() => sendAction('create_order', { table_id: 1, items: ['Pizza', 'Pasta'] })}>Create Order for Table 1</button>
            </div>

            {tableData && (
                <div>
                    <h2>Table Data:</h2>
                    <pre>{JSON.stringify(tableData, null, 2)}</pre>
                </div>
            )}

            {orderData && (
                <div>
                    <h2>Orders</h2>
                    <table border={1} style={{ borderCollapse: 'collapse', width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Order Number</th>
                                <th>Business Name</th>
                                <th>Guest Name</th>
                                <th>Table ID</th>
                                <th>Order Type</th>
                                <th>Served By</th>
                                <th>Status</th>
                                <th>Subtotal</th>
                                <th>Tax</th>
                                <th>Discount</th>
                                <th>Total Amount</th>
                                <th>Notes</th>
                                <th>Created At</th>
                                <th>Updated At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData.map((order: OrderData) => (
                                <tr key={order.id}>
                                    <td>{order.order_number}</td>
                                    <td>{order.business_name}</td>
                                    <td>{order.guest_name}</td>
                                    <td>{order.table_id}</td>
                                    <td>{order.order_type_name}</td>
                                    <td>{order.served_by_name}</td>
                                    <td>{order.status_name}</td>
                                    <td>{order.subtotal}</td>
                                    <td>{order.tax}</td>
                                    <td>{order.discount}</td>
                                    <td>{order.total_amount}</td>
                                    <td>{order.notes}</td>
                                    <td>{order.created_at}</td>
                                    <td>{order.updated_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default WebSocketComponent;