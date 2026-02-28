export type OrderType = 'table' | 'room';

export interface OrderModel {
    fullname : string;
    orderType : OrderType;
    identifier : string | number;
}

export interface Order{
    id: number;
    business_id: number;
    business_name: string;
    order_number: string;
    table_id: number | null;
    table_number?: number | null;
    room_id: number | null;
    is_room_order: boolean;
    guest_id: number | null;
    order_type_id: number;
    order_type_name: string;
    status_id: number;
    status_name: string;
    subtotal: string;
    discount: string;
    tax: string;
    total_amount: string;
    notes: string;
    served_by: string | null;
    items: OrderItem[];
    created_at: string;
    updated_at: string;
}

export interface OrderItem{
    id: number; 
    order_id: number;
    order_number: string;
    food_item_id: number;
    food_item_name: string;
    food_item_available: boolean;
    quantity: number;
    unit_price: string; 
    total_price: string; 
    note: string;
    status_id: number;
    status_name: string;
    created_at: string;
    updated_at: string; 
}

export interface CreateOrderItem{
    food_item_id: number;
    quantity: number;
    status_id: number;
    note?: string;
}

export interface CreateOrderRequest{
    business_id: number;
    table_id?: number | null;
    room_id?: number | null;
    guest_id?: number | null;
    order_type_id: number;
    order_number: string;
    status_id: number;
    subtotal: string;
    tax: string;
    discount: string;
    total_amount: string;
    served_by?: number | null;
    notes?: string;
    is_room_order: boolean
    items: CreateOrderItem[];
}

export interface GetOrderResponse{
    orders: Order[];
}