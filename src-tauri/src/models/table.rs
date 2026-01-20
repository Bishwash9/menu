use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, sqlx::FromRow)]
pub struct Table {
    pub id: i64,
    pub business_id: i32,
    pub table_number: String,
    pub capacity: Option<i32>,
    pub location: Option<String>,
    pub status_id: i32,
    pub reserved_by: Option<i32>,
    pub qr_code: Option<String>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct TableCreate {
    pub business_id: i32,
    pub table_number: String,
    pub capacity: Option<i32>,
    pub location: Option<String>,
    pub status_id: i32,
    pub reserved_by: Option<i32>,
    pub qr_code: Option<String>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct TableUpdate {
    pub table_number: Option<String>,
    pub capacity: Option<i32>,
    pub location: Option<String>,
    pub status_id: Option<i32>,
    pub reserved_by: Option<i32>,
    pub qr_code: Option<String>,
}
