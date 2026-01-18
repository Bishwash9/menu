use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct SignupRequest {
    pub username: String,
    pub password: String,
    pub email: String,
    pub business_name: String,
    pub phone_number: String,
    pub pan_number: String,
    pub address: String,
    pub business_type_id: i32,
}

#[derive(Serialize, Deserialize)]
pub struct SignupResponse {
    pub message: String,
}

#[derive(Serialize, Deserialize)]
pub struct LoginRequest {
    pub phone_number: String,
    pub password: String,
}

#[derive(Serialize, Deserialize)]
pub struct Tokens {
    pub refresh: String,
    pub access: String,
}

#[derive(Serialize, Deserialize)]
pub struct LoginResponse {
    pub message: String,
    pub tokens: Tokens,
}

#[derive(Serialize, Deserialize)]
pub struct RefreshRequest {
    pub refresh: String,
}

#[derive(Serialize, Deserialize)]
pub struct RefreshResponse {
    pub access: String,
}
