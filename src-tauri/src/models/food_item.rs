use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, sqlx::FromRow)]
pub struct FoodItem {
    pub id: i64,
    pub business_id: i32,
    pub category_id: i32,
    pub name: String,
    pub description: Option<String>,
    pub price: f32,
    pub preparation_time: i32,
    pub spice_level_id: Option<i32>,
    pub is_available: bool,
    pub image_url: Option<String>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct FoodItemCreate {
    pub business_id: i32,
    pub category_id: i32,
    pub name: String,
    pub description: Option<String>,
    pub price: f32,
    pub preparation_time: i32,
    pub spice_level_id: Option<i32>,
    pub is_available: bool,
    pub image_url: Option<String>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct FoodItemUpdate {
    pub category_id: Option<i32>,
    pub name: Option<String>,
    pub description: Option<String>,
    pub price: Option<f32>,
    pub preparation_time: Option<i32>,
    pub spice_level_id: Option<i32>,
    pub is_available: Option<bool>,
    pub image_url: Option<String>,
}
