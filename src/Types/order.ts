export type OrderType = 'table' | 'room';

export interface OrderModel {
    fullname : string;
    orderType : OrderType;
    identifier : string | number;
}

export interface Order{
    id: number;
    business_id: string;
    order_number: string;
    table_id?: number;
    room_id?: number;
    guest_id: number;
    order_type_id: number;
    status_id: number;
    subtotal: number;
    discount: number;
    tax: number;
    total_amount: number;
    created_at: string;
    updated_at: string;
}

export interface GetOrderResponse{
    orders: Order[];
}