export type OrderType = 'table' | 'room';

export interface OrderModel {
    fullname : string;
    orderType : OrderType;
    identifier : string; //yo chai MOCK_ORDER_DATA ho
}