use crate::models::food_item::*;
use crate::models::websocket::WsMessage;
use crate::services::db_service::DbService;
use crate::services::websocket_service::WebSocketService;
use tauri::State;
use std::sync::Arc;

#[tauri::command]
pub async fn create_food_item(
    db: State<'_, Arc<DbService>>,
    ws: State<'_, Arc<WebSocketService>>,
    data: FoodItemCreate
) -> Result<String, String> {
    let id = db.create_food_item_local(&data).await?;

    ws.broadcast(WsMessage {
        event: "food-item-created".to_string(),
        payload: serde_json::to_value(&data).unwrap_or_default(),
    }).await;

    Ok(format!("Food item created successfully with ID {}", id))
}

#[tauri::command]
pub async fn get_food_items(
    db: State<'_, Arc<DbService>>
) -> Result<Vec<FoodItem>, String> {
    let items = sqlx::query_as::<_, FoodItem>(
        "SELECT id, business_id, category_id, name, description, price, preparation_time, spice_level_id, is_available, image_url FROM food_items"
    )
    .fetch_all(&db.local_pool)
    .await
    .map_err(|e| e.to_string())?;

    Ok(items)
}

#[tauri::command]
pub async fn update_food_item(
    db: State<'_, Arc<DbService>>,
    ws: State<'_, Arc<WebSocketService>>,
    id: i64,
    data: FoodItemUpdate
) -> Result<String, String> {
    let mut payload = serde_json::to_value(&data).unwrap_or_default();
    payload["id"] = serde_json::json!(id);
    
    db.save_locally("food_items", &payload.to_string(), "UPDATE").await?;

    ws.broadcast(WsMessage {
        event: "food-item-updated".to_string(),
        payload,
    }).await;

    Ok("Food item update queued successfully".to_string())
}

#[tauri::command]
pub async fn delete_food_item(
    db: State<'_, Arc<DbService>>,
    ws: State<'_, Arc<WebSocketService>>,
    id: i64
) -> Result<String, String> {
    db.delete_local("food_items", id).await?;

    ws.broadcast(WsMessage {
        event: "food-item-deleted".to_string(),
        payload: serde_json::json!({ "id": id }),
    }).await;

    Ok("Food item deletion queued successfully".to_string())
}
