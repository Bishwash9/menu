use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, sqlx::FromRow)]
pub struct Guest {
    pub id: i64,
    pub business_id: i32,
    pub name: String,
    pub phone: String,
    pub verify_id: i32,
    pub status_id: i32,
    pub created_at: Option<String>,
    pub updated_at: Option<String>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct GuestCreate {
    pub business_id: i32,
    pub name: String,
    pub phone: String,
    pub verify_id: i32,
    pub status_id: i32,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct GuestUpdate {
    pub name: Option<String>,
    pub phone: Option<String>,
    pub verify_id: Option<i32>,
    pub status_id: Option<i32>,
}
