export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue' | 'Cancelled';
export type PaymentMethod = 'Cash' | 'Card' | 'UPI' | 'Bank Transfer' | 'Partial';

export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
}

export interface Invoice {
    id: string;
    invoiceNumber: string;
    guestName: string;
    roomNumber?: string;
    date: string;
    dueDate: string;
    items: InvoiceItem[];
    subtotal: number;
    tax: number;
    total: number;
    status: InvoiceStatus;
    paymentMethod?: PaymentMethod;
    paidAmount: number;
}

export interface BillingStats {
    totalRevenue: number;
    pendingPayments: number;
    paidInvoices: number;
    overdueAmount: number;
}
