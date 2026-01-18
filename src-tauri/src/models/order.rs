use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct OrderCreate {
    pub business_id: i32,
    pub order_number: String,
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

#[derive(Serialize, Deserialize)]
pub struct OrderCreateResponse {
    pub message: String,
    pub order: OrderCreate,
}
