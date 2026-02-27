export type OrderType = 'table' | 'room';

export interface OrderModel {
    fullname : string;
    orderType : OrderType;
    identifier : string | number;
}

export interface Order{
    id: number;
    business_id: string;
    business_name: string;
    order_number: string;
    table_id?: number;
    room_id?: number;
    guest_id: number;
    guest_name: string;
    order_type_id: number;
    order_type_name: string;
    status_id: number;
    subtotal: number;
    discount: number;
    tax: number;
    total_amount: number;
    notes: string;
    served_by: null;
    items : OrderItem[];
    created_at: string;
    updated_at: string;
}

export interface OrderItem{
    id?: number; 
    order_id?: number;
    food_item_id: number;
    food_item_name?: string;
    quantity: number;
    unit_price?: string; 
    total_price?: string; 
    note?: string;
    status_id: number;
    status_name?: string; 
}

export interface GetOrderResponse{
    orders: Order[];
}