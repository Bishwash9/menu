use crate::models::order::*;
use crate::models::websocket::WsMessage;
use crate::services::db_service::DbService;
use crate::services::websocket_service::WebSocketService;
use tauri::State;
use std::sync::Arc;

#[tauri::command]
pub async fn create_order(
    db: State<'_, Arc<DbService>>,
    ws: State<'_, Arc<WebSocketService>>,
    data: OrderCreate
) -> Result<OrderCreateResponse, String> {
    // 1. Save locally (Instant)
    let id = db.create_order_local(&data).await?;

    // 2. Broadcast via WebSocket
    ws.broadcast(WsMessage {
        event: "order-created".to_string(),
        payload: serde_json::to_value(&data).unwrap_or_default(),
    }).await;

    Ok(OrderCreateResponse {
        message: format!("Order created successfully with ID {}", id),
        order: data,
    })
}
