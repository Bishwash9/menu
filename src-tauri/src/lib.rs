use serde::{Deserialize, Serialize};
use reqwest::Client;


const BASE_URL: &str = "http://localhost:8000/api/";

#[derive(Serialize, Deserialize, Debug)]
struct SignupRequest {
    username: String,
    password: String,
    email: String,
    business_name: String,
    phone_number: String,
    pan_number: String,
    address: String,
    business_type_id: i32,
}

#[derive(Serialize, Deserialize)]
struct SignupResponse {
    message: String,
}

#[derive(Serialize, Deserialize)]
struct LoginRequest {
    phone_number: String,
    password: String,
}

#[derive(Serialize, Deserialize)]
struct Tokens {
    refresh: String,
    access: String,
}

#[derive(Serialize, Deserialize)]
struct LoginResponse {
    message: String,
    tokens: Tokens,
}

#[derive(Serialize, Deserialize)]
struct RefreshRequest {
    refresh: String,
}

#[derive(Serialize, Deserialize)]
struct RefreshResponse {
    access: String,
}

#[tauri::command]
async fn signup(data: SignupRequest) -> Result<SignupResponse, String> {
    let client = Client::new();
    let url = format!("{}signup/", BASE_URL);
    let response = client.post(&url)
        .json(&data)
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    let status = response.status();
    if status == reqwest::StatusCode::CREATED {
        let resp: SignupResponse = response.json().await.map_err(|e| format!("Failed to parse response: {}", e))?;
        Ok(resp)
    } else if status == reqwest::StatusCode::BAD_REQUEST {
        let err: serde_json::Value = response.json().await.map_err(|e| format!("Failed to parse error: {}", e))?;
        Err(err["error"].as_str().unwrap_or("Unknown error").to_string())
    } else {
        Err(format!("Unexpected status: {}", status))
    }
}

#[tauri::command]
async fn login(data: LoginRequest) -> Result<LoginResponse, String> {
    let client = Client::new();
    let url = format!("{}login/", BASE_URL);
    let response = client.post(&url)
        .json(&data)
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    let status = response.status();
    if status == reqwest::StatusCode::OK {
        let resp: LoginResponse = response.json().await.map_err(|e| format!("Failed to parse response: {}", e))?;
        Ok(resp)
    } else if status == reqwest::StatusCode::BAD_REQUEST || status == reqwest::StatusCode::UNAUTHORIZED {
        let err: serde_json::Value = response.json().await.map_err(|e| format!("Failed to parse error: {}", e))?;
        Err(err["error"].as_str().unwrap_or("Unknown error").to_string())
    } else {
        Err(format!("Unexpected status: {}", status))
    }
}

#[tauri::command]
async fn refresh_token(data: RefreshRequest) -> Result<RefreshResponse, String> {
    let client = Client::new();
    let url = format!("{}refresh-token/", BASE_URL);
    let response = client.post(&url)
        .json(&data)
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    let status = response.status();
    if status.is_success() {
        let resp: RefreshResponse = response.json().await.map_err(|e| format!("Failed to parse response: {}", e))?;
        Ok(resp)
    } else {
        let err: serde_json::Value = response.json().await.map_err(|e| format!("Failed to parse error: {}", e))?;
        Err(err["detail"].as_str().unwrap_or("Token invalid").to_string())
    }
}



#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![signup, login, refresh_token])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
