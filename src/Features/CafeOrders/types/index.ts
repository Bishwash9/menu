export type OrderStatus = 'Pending' | 'Preparing' | 'Ready' | 'Served' | 'Completed' | 'Cancelled';
export type OrderType = 'Dine In' | 'Takeaway' | 'Room Service';
export type PaymentStatus = 'Pending' | 'Paid' | 'Partial';
export type Priority = 'Low' | 'Normal' | 'High' | 'Urgent';

export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
    notes?: string;
}

export interface CafeOrder {
    id: string;
    orderNumber: string;
    customer: string;
    type: OrderType;
    tableNumber?: string;
    roomNumber?: string;
    items: OrderItem[];
    total: number;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    priority: Priority;
    createdAt: string;
    prepTime?: number;
    notes?: string;
}

export interface CafeStats {
    pendingOrders: number;
    activeTables: number;
    todayRevenue: number;
    avgPrepTime: number;
}

export interface CafeNotification {
    id: string;
    message: string;
    time: string;
    type: 'warning' | 'success' | 'info';
}
