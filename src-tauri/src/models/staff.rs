use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct StaffCreate {
    pub business_id: i32,
    pub role_id: i32,
    pub shift_id: i32,
    pub status_id: i32,
    pub name: String,
    pub phone: String,
    pub password: String,
}

#[derive(Serialize, Deserialize)]
pub struct StaffCreateResponse {
    pub message: String,
    pub staff: StaffCreate,
}

#[derive(Serialize, Deserialize)]
pub struct StaffDelete {
    pub id: i32,
}

#[derive(Serialize, Deserialize)]
pub struct StaffDeleteResponse {
    pub message: String,
}

#[derive(Serialize, Deserialize)]
pub struct StaffUpdate {
    pub id: i32,
    pub business_id: i32,
    pub role_id: i32,
    pub shift_id: i32,
    pub status_id: i32,
    pub name: String,
    pub phone: String,
    pub password: String,
}

#[derive(Serialize, Deserialize)]
pub struct StaffUpdateResponse {
    pub message: String,
    pub staff: StaffUpdate,
}
