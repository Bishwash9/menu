import type { Table, TableStatus, TableArea } from './types';

export const TABLE_STATUSES: TableStatus[] = ['Available', 'Occupied', 'Reserved'];
export const TABLE_AREAS: TableArea[] = ['Main Hall', 'Garden', 'Rooftop', 'Private'];

export const initialTables: Table[] = [
    {
        id: '1',
        tableNumber: 'T1',
        area: 'Main Hall',
        status: 'Occupied',
        seats: 4,
        currentOrder: {
            orderId: 'ORD001',
            amount: 1062,
            items: 2,
        },
    },
    {
        id: '2',
        tableNumber: 'T2',
        area: 'Main Hall',
        status: 'Occupied',
        seats: 4,
        currentOrder: {
            orderId: 'ORD002',
            amount: 158,
            items: 2,
        },
    },
    {
        id: '3',
        tableNumber: 'T3',
        area: 'Garden',
        status: 'Reserved',
        seats: 6,
    },
    {
        id: '4',
        tableNumber: 'T4',
        area: 'Rooftop',
        status: 'Available',
        seats: 4,
    },
    {
        id: '5',
        tableNumber: 'T5',
        area: 'Private',
        status: 'Available',
        seats: 8,
    },
    {
        id: '6',
        tableNumber: 'T6',
        area: 'Main Hall',
        status: 'Available',
        seats: 2,
    },
];
