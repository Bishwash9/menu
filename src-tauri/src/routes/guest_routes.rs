use crate::models::guest::*;
use crate::models::websocket::WsMessage;
use crate::services::db_service::DbService;
use crate::services::websocket_service::WebSocketService;
use tauri::State;
use std::sync::Arc;

#[tauri::command]
pub async fn create_guest(
    db: State<'_, Arc<DbService>>,
    ws: State<'_, Arc<WebSocketService>>,
    data: GuestCreate
) -> Result<String, String> {
    let id = db.create_guest_local(&data).await?;

    ws.broadcast(WsMessage {
        event: "guest-created".to_string(),
        payload: serde_json::to_value(&data).unwrap_or_default(),
    }).await;

    Ok(format!("Guest created successfully with ID {}", id))
}

#[tauri::command]
pub async fn get_guests(
    db: State<'_, Arc<DbService>>
) -> Result<Vec<Guest>, String> {
    let guests = sqlx::query_as::<_, Guest>(
        "SELECT id, business_id, name, phone, verify_id, status_id, created_at, updated_at FROM guests"
    )
    .fetch_all(&db.local_pool)
    .await
    .map_err(|e| e.to_string())?;

    Ok(guests)
}

#[tauri::command]
pub async fn update_guest(
    db: State<'_, Arc<DbService>>,
    ws: State<'_, Arc<WebSocketService>>,
    id: i64,
    data: GuestUpdate
) -> Result<String, String> {
    // Save to sync queue
    let mut payload = serde_json::to_value(&data).unwrap_or_default();
    payload["id"] = serde_json::json!(id);
    
    db.save_locally("guests", &payload.to_string(), "UPDATE").await?;

    ws.broadcast(WsMessage {
        event: "guest-updated".to_string(),
        payload,
    }).await;

    Ok("Guest update queued successfully".to_string())
}

#[tauri::command]
pub async fn delete_guest(
    db: State<'_, Arc<DbService>>,
    ws: State<'_, Arc<WebSocketService>>,
    id: i64
) -> Result<String, String> {
    db.delete_local("guests", id).await?;

    ws.broadcast(WsMessage {
        event: "guest-deleted".to_string(),
        payload: serde_json::json!({ "id": id }),
    }).await;

    Ok("Guest deletion queued successfully".to_string())
}
