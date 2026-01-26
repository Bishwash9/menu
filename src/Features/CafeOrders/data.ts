import type { CafeOrder, OrderStatus, OrderType, Priority } from './Types';

export const ORDER_STATUSES: OrderStatus[] = ['Pending', 'Preparing', 'Ready', 'Served', 'Completed', 'Cancelled'];
export const ORDER_TYPES: OrderType[] = ['Dine In', 'Takeaway', 'Room Service'];
export const PRIORITIES: Priority[] = ['Low', 'Normal', 'High', 'Urgent'];


export const initialOrders: CafeOrder[] = [
    {
        id: '1',
        orderNumber: 'ORD001',
        customer: 'Walk-in Customer',
        type: 'Dine In',
        tableNumber: 'T1',
        items: [
            { id: '1', name: 'Paneer Butter Masala', quantity: 2, price: 320 },
            { id: '2', name: 'Butter Naan', quantity: 4, price: 60 },
        ],
        total: 1062.20,
        status: 'Served',
        paymentStatus: 'Paid',
        priority: 'Normal',
        createdAt: new Date().toISOString(),
        prepTime: 15,
    },
    {
        id: '2',
        orderNumber: 'ORD002',
        customer: 'John Doe',
        type: 'Room Service',
        tableNumber: 'T2',
        roomNumber: '201',
        items: [
            { id: '3', name: 'Club Sandwich', quantity: 1, price: 280 },
            { id: '4', name: 'Coffee', quantity: 2, price: 120 },
        ],
        total: 520,
        status: 'Preparing',
        paymentStatus: 'Pending',
        priority: 'High',
        createdAt: new Date(Date.now() - 600000).toISOString(),
        prepTime: 20,
    },
    {
        id: '3',
        orderNumber: 'ORD003',
        customer: 'Jane Smith',
        type: 'Takeaway',
        tableNumber: 'T5',
        items: [
            { id: '5', name: 'Chicken Biryani', quantity: 2, price: 350 },
        ],
        total: 700,
        status: 'Pending',
        paymentStatus: 'Paid',
        priority: 'Normal',
        createdAt: new Date(Date.now() - 300000).toISOString(),
    },
];


