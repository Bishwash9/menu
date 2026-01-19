use crate::models::staff::*;
use crate::models::websocket::WsMessage;
use crate::services::db_service::DbService;
use crate::services::websocket_service::WebSocketService;
use tauri::State;
use std::sync::Arc;

#[tauri::command]
pub async fn create_staff(
    db: State<'_, Arc<DbService>>,
    ws: State<'_, Arc<WebSocketService>>,
    data: StaffCreate
) -> Result<StaffCreateResponse, String> {
    // 1. Save locally (Optimization: Instant)
    let id = db.create_staff_local(&data).await?;

    // 2. Broadcast via WebSocket (Optimization: Snappy UI)
    ws.broadcast(WsMessage {
        event: "staff-created".to_string(),
        payload: serde_json::to_value(&data).unwrap_or_default(),
    }).await;

    Ok(StaffCreateResponse {
        message: format!("Staff created successfully with ID {}", id),
        staff: data,
    })
}

#[tauri::command]
pub async fn delete_staff(
    db: State<'_, Arc<DbService>>,
    ws: State<'_, Arc<WebSocketService>>,
    data: StaffDelete
) -> Result<StaffDeleteResponse, String> {
    // Save to sync queue for cloud delete
    let data_json = serde_json::to_string(&data).unwrap_or_default();
    db.save_locally("staff", &data_json, "DELETE").await?;

    // Broadcast
    ws.broadcast(WsMessage {
        event: "staff-deleted".to_string(),
        payload: serde_json::to_value(&data).unwrap_or_default(),
    }).await;

    Ok(StaffDeleteResponse {
        message: "Staff deletion queued successfully".to_string(),
    })
}

#[tauri::command]
pub async fn update_staff(
    db: State<'_, Arc<DbService>>,
    ws: State<'_, Arc<WebSocketService>>,
    data: StaffUpdate
) -> Result<StaffUpdateResponse, String> {
    // Save to sync queue for cloud update
    let data_json = serde_json::to_string(&data).unwrap_or_default();
    db.save_locally("staff", &data_json, "UPDATE").await?;

    // Broadcast
    ws.broadcast(WsMessage {
        event: "staff-updated".to_string(),
        payload: serde_json::to_value(&data).unwrap_or_default(),
    }).await;

    Ok(StaffUpdateResponse {
        message: "Staff update queued successfully".to_string(),
        staff: data,
    })
}
