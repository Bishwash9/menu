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

#[tauri::command]
pub async fn get_orders(
    db: State<'_, Arc<DbService>>,
    table_id: Option<i32>
) -> Result<Vec<OrderCreate>, String> {
    let query = if let Some(tid) = table_id {
        sqlx::query_as::<_, OrderCreate>(
            "SELECT business_id, order_number, table_id, guest_id, order_type_id, status_id, subtotal, tax, discount, total_amount, notes, served_by FROM orders WHERE table_id = ?"
        ).bind(tid)
    } else {
        sqlx::query_as::<_, OrderCreate>(
            "SELECT business_id, order_number, table_id, guest_id, order_type_id, status_id, subtotal, tax, discount, total_amount, notes, served_by FROM orders"
        )
    };

    let orders = query.fetch_all(&db.local_pool).await.map_err(|e| e.to_string())?;

    Ok(orders)
}

#[tauri::command]
pub async fn get_order_items(
    db: State<'_, Arc<DbService>>,
    order_id: Option<i32>
) -> Result<Vec<OrderItem>, String> {
    let query = if let Some(oid) = order_id {
        sqlx::query_as::<_, OrderItem>("SELECT * FROM order_items WHERE order_id = ?").bind(oid)
    } else {
        sqlx::query_as::<_, OrderItem>("SELECT * FROM order_items")
    };

    let items = query.fetch_all(&db.local_pool).await.map_err(|e| e.to_string())?;
    Ok(items)
}

#[tauri::command]
pub async fn create_order_item(
    db: State<'_, Arc<DbService>>,
    ws: State<'_, Arc<WebSocketService>>,
    data: OrderItemCreate
) -> Result<String, String> {
    db.create_order_item_local(&data).await?;

    ws.broadcast(WsMessage {
        event: "order-item-created".to_string(),
        payload: serde_json::to_value(&data).unwrap_or_default(),
    }).await;

    Ok("Order item created successfully".to_string())
}

#[tauri::command]
pub async fn update_order_item(
    db: State<'_, Arc<DbService>>,
    ws: State<'_, Arc<WebSocketService>>,
    id: i64,
    data: serde_json::Value
) -> Result<String, String> {
    let mut payload = data.clone();
    payload["id"] = serde_json::json!(id);

    db.save_locally("order_items", &payload.to_string(), "UPDATE").await?;

    ws.broadcast(WsMessage {
        event: "order-item-updated".to_string(),
        payload,
    }).await;

    Ok("Order item update queued successfully".to_string())
}

#[tauri::command]
pub async fn delete_order_item(
    db: State<'_, Arc<DbService>>,
    ws: State<'_, Arc<WebSocketService>>,
    id: i64
) -> Result<String, String> {
    db.delete_local("order_items", id).await?;

    ws.broadcast(WsMessage {
        event: "order-item-deleted".to_string(),
        payload: serde_json::json!({ "id": id }),
    }).await;

    Ok("Order item deletion queued successfully".to_string())
}
