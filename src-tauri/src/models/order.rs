use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, sqlx::FromRow)]
pub struct OrderCreate {
    pub business_id: i32,
    pub order_number: String,
    pub table_id: i32,
    pub guest_id: i32,
    pub order_type_id: i32,
    pub status_id: i32,
    pub subtotal: f32,
    pub tax: f32,
    pub discount: f32,
    pub total_amount: f32,
    pub notes: String,
    pub served_by: i32,
}

#[derive(Serialize, Deserialize, Clone, Debug, sqlx::FromRow)]
pub struct OrderItem {
    pub id: i64,
    pub order_id: i32,
    pub food_item_id: i32,
    pub quantity: i32,
    pub unit_price: f32,
    pub total_price: f32,
    pub status_id: i32,
    pub special_instructions: Option<String>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct OrderItemCreate {
    pub order_id: i32,
    pub food_item_id: i32,
    pub quantity: i32,
    pub unit_price: f32,
    pub total_price: f32,
    pub status_id: i32,
    pub special_instructions: Option<String>,
}

#[derive(Serialize, Deserialize)]
pub struct OrderCreateResponse {
    pub message: String,
    pub order: OrderCreate,
}
