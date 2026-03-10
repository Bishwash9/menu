export interface CartItem {
    id: number;
    food_item_id: number;
    food_item_name: string;
    quantity: number;
    unit_price: number;
    total_price: number;
}

export interface CartAddRequest {
    food_item_id: number;
    quantity: number;
    unit_price: number;
}