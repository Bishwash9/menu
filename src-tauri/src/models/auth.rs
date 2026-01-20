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
    pub id: i32,
    pub email: String,
    pub username: String,
    pub access_token: String,
    pub token_type: String,
}

#[derive(Serialize, Deserialize)]
pub struct LoginRequest {
    pub username: String, // Helper for email/username login
    pub password: String,
}

#[derive(Serialize, Deserialize)]
pub struct Tokens {
    pub refresh: String,
    pub access: String,
}

#[derive(Serialize, Deserialize)]
pub struct LoginResponse {
    pub access_token: String,
    pub token_type: String,
    pub username: String,
}

#[derive(Serialize, Deserialize)]
pub struct RefreshRequest {
    pub refresh: String,
}

#[derive(Serialize, Deserialize)]
pub struct RefreshResponse {
    pub access_token: String,
    pub token_type: String,
}
