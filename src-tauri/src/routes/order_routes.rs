use reqwest::Client;
use crate::models::order::*;
use crate::services::api_client::BASE_URL;

#[tauri::command]
pub async fn create_order(data: OrderCreate) -> Result<OrderCreateResponse, String> {
    let client = Client::new();
    let url = format!("{}orders/", BASE_URL);
    let response = client.post(&url)
        .json(&data)
        .send()
        .await
        .map_err(|e| format!("Request failed: {}", e))?;

    let status = response.status();
    if status == reqwest::StatusCode::CREATED {
        let resp: OrderCreateResponse = response.json().await.map_err(|e| format!("Failed to parse response: {}", e))?;
        Ok(resp)
    } else if status == reqwest::StatusCode::BAD_REQUEST {
        let err: serde_json::Value = response.json().await.map_err(|e| format!("Failed to parse error: {}", e))?;
        Err(err["error"].as_str().unwrap_or("Unknown error").to_string())
    } else {
        Err(format!("Unexpected status: {}", status))
    }
}
