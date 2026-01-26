import type { Invoice, InvoiceStatus, PaymentMethod } from './Types';

export const INVOICE_STATUSES: InvoiceStatus[] = ['Paid', 'Pending', 'Overdue', 'Cancelled'];
export const PAYMENT_METHODS: PaymentMethod[] = ['Cash', 'Card', 'UPI', 'Bank Transfer', 'Partial'];

export const initialInvoices: Invoice[] = [
    {
        id: '1',
        invoiceNumber: 'INV-2026-001',
        guestName: 'John Doe',
        roomNumber: '201',
        date: '2026-01-18',
        dueDate: '2026-01-22',
        items: [
            { id: '1', description: 'Room Booking (4 nights)', quantity: 4, rate: 2500, amount: 10000 },
            { id: '2', description: 'Room Service', quantity: 3, rate: 500, amount: 1500 },
            { id: '3', description: 'Laundry', quantity: 1, rate: 300, amount: 300 },
        ],
        subtotal: 11800,
        tax: 2124,
        total: 13924,
        status: 'Paid',
        paymentMethod: 'Card',
        paidAmount: 13924,
    },
    {
        id: '2',
        invoiceNumber: 'INV-2026-002',
        guestName: 'Jane Smith',
        roomNumber: '102',
        date: '2026-01-19',
        dueDate: '2026-01-25',
        items: [
            { id: '1', description: 'Room Booking (6 nights)', quantity: 6, rate: 3500, amount: 21000 },
            { id: '2', description: 'Restaurant', quantity: 5, rate: 800, amount: 4000 },
            { id: '3', description: 'Spa Service', quantity: 2, rate: 1500, amount: 3000 },
        ],
        subtotal: 28000,
        tax: 5040,
        total: 33040,
        status: 'Pending',
        paidAmount: 15000,
    },
    {
        id: '3',
        invoiceNumber: 'INV-2026-003',
        guestName: 'Mike Johnson',
        date: '2026-01-10',
        dueDate: '2026-01-15',
        items: [
            { id: '1', description: 'Cafe Order', quantity: 1, rate: 850, amount: 850 },
        ],
        subtotal: 850,
        tax: 153,
        total: 1003,
        status: 'Overdue',
        paidAmount: 0,
    },
    {
        id: '4',
        invoiceNumber: 'INV-2026-004',
        guestName: 'Sarah Wilson',
        roomNumber: '305',
        date: '2026-01-20',
        dueDate: '2026-01-23',
        items: [
            { id: '1', description: 'Room Booking (3 nights)', quantity: 3, rate: 2000, amount: 6000 },
        ],
        subtotal: 6000,
        tax: 1080,
        total: 7080,
        status: 'Paid',
        paymentMethod: 'UPI',
        paidAmount: 7080,
    },
];
