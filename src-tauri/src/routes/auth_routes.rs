use reqwest::Client;
use crate::models::auth::*;
use crate::services::api_client::BASE_URL;

#[tauri::command]
pub async fn signup(data: SignupRequest) -> Result<SignupResponse, String> {
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
pub async fn login(data: LoginRequest) -> Result<LoginResponse, String> {
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
pub async fn refresh_token(data: RefreshRequest) -> Result<RefreshResponse, String> {
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
