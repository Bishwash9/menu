use reqwest::Client;
use crate::models::staff::*;
use crate::services::api_client::BASE_URL;

#[tauri::command]
pub async fn create_staff(data: StaffCreate) -> Result<StaffCreateResponse, String> {
    let client = Client::new();
    let url = format!("{}staff/", BASE_URL);
    let response = client.post(&url)
        .json(&data)
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    let status = response.status();
    if status.is_success() {
        let resp: StaffCreateResponse = response.json().await.map_err(|e| format!("Failed to parse response: {}", e))?;
        Ok(resp)
    } else {
        let err: serde_json::Value = response.json().await.map_err(|e| format!("Failed to parse error: {}", e))?;
        Err(err["detail"].as_str().unwrap_or("Unknown error").to_string())
    }
}

#[tauri::command]
pub async fn delete_staff(data: StaffDelete) -> Result<StaffDeleteResponse, String> {
    let client = Client::new();
    let url = format!("{}staff/{}", BASE_URL, data.id);
    let response = client.delete(&url)
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    let status = response.status();
    if status.is_success() {
        let resp: StaffDeleteResponse = response.json().await.map_err(|e| format!("Failed to parse response: {}", e))?;
        Ok(resp)
    } else {
        let err: serde_json::Value = response.json().await.map_err(|e| format!("Failed to parse error: {}", e))?;
        Err(err["detail"].as_str().unwrap_or("Unknown error").to_string())
    }
}

#[tauri::command]
pub async fn update_staff(data: StaffUpdate) -> Result<StaffUpdateResponse, String> {
    let client = Client::new();
    let url = format!("{}staff/{}", BASE_URL, data.id);
    let response = client.put(&url)
        .json(&data)
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    let status = response.status();
    if status.is_success() {
        let resp: StaffUpdateResponse = response.json().await.map_err(|e| format!("Failed to parse response: {}", e))?;
        Ok(resp)
    } else {
        let err: serde_json::Value = response.json().await.map_err(|e| format!("Failed to parse error: {}", e))?;
        Err(err["detail"].as_str().unwrap_or("Unknown error").to_string())
    }
}
