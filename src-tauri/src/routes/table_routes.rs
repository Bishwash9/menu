use crate::models::table::*;
use crate::models::websocket::WsMessage;
use crate::services::db_service::DbService;
use crate::services::websocket_service::WebSocketService;
use tauri::State;
use std::sync::Arc;

#[tauri::command]
pub async fn create_table(
    db: State<'_, Arc<DbService>>,
    ws: State<'_, Arc<WebSocketService>>,
    data: TableCreate
) -> Result<String, String> {
    let id = db.create_table_local(&data).await?;

    ws.broadcast(WsMessage {
        event: "table-created".to_string(),
        payload: serde_json::to_value(&data).unwrap_or_default(),
    }).await;

    Ok(format!("Table created successfully with ID {}", id))
}

#[tauri::command]
pub async fn get_tables(
    db: State<'_, Arc<DbService>>
) -> Result<Vec<Table>, String> {
    let tables = sqlx::query_as::<_, Table>(
        "SELECT id, business_id, table_number, capacity, location, status_id, reserved_by, qr_code FROM tables"
    )
    .fetch_all(&db.local_pool)
    .await
    .map_err(|e| e.to_string())?;

    Ok(tables)
}

#[tauri::command]
pub async fn update_table(
    db: State<'_, Arc<DbService>>,
    ws: State<'_, Arc<WebSocketService>>,
    id: i64,
    data: TableUpdate
) -> Result<String, String> {
    let mut payload = serde_json::to_value(&data).unwrap_or_default();
    payload["id"] = serde_json::json!(id);

    db.save_locally("tables", &payload.to_string(), "UPDATE").await?;

    ws.broadcast(WsMessage {
        event: "table-updated".to_string(),
        payload,
    }).await;

    Ok("Table update queued successfully".to_string())
}

#[tauri::command]
pub async fn delete_table(
    db: State<'_, Arc<DbService>>,
    ws: State<'_, Arc<WebSocketService>>,
    id: i64
) -> Result<String, String> {
    db.delete_local("tables", id).await?;

    ws.broadcast(WsMessage {
        event: "table-deleted".to_string(),
        payload: serde_json::json!({ "id": id }),
    }).await;

    Ok("Table deletion queued successfully".to_string())
}
