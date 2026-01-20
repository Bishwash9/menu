pub mod models;
pub mod services;
pub mod routes;

use crate::routes::auth_routes::{signup, login, refresh_token, get_users};
use crate::routes::staff_routes::{create_staff, delete_staff, update_staff, get_staff};
use crate::routes::order_routes::{create_order, get_orders, create_order_item, get_order_items, update_order_item, delete_order_item};
use crate::routes::guest_routes::{create_guest, get_guests, update_guest, delete_guest};
use crate::routes::food_item_routes::{create_food_item, get_food_items, update_food_item, delete_food_item};
use crate::routes::table_routes::{create_table, get_tables, update_table, delete_table};
use crate::models::websocket::WsMessage;
use crate::services::websocket_service::WebSocketService;
use crate::services::db_service::DbService;
use crate::services::sync_service::SyncService;
use std::sync::Arc;
use tauri::Manager;

#[tauri::command]
async fn send_ws_message(
    service: tauri::State<'_, Arc<WebSocketService>>,
    db: tauri::State<'_, Arc<DbService>>,
    event: String,
    payload: serde_json::Value,
) -> Result<(), String> {
    // Log important events to DB for sync
    if event == "booking-created" || event == "staff-update" {
        let data = serde_json::to_string(&payload).unwrap_or_default();
        let _ = db.save_locally("events", &data, &event).await;
    }

    service.broadcast(WsMessage { event, payload }).await;
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    dotenvy::dotenv().ok();
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let handle = app.handle().clone();
            
            // Initialize Database and Sync Services
            tauri::async_runtime::block_on(async {
                let db_service = DbService::new(&handle).await.expect("Failed to init DB");
                let sync_service = SyncService::new(Arc::clone(&db_service));
                
                // Start Background Sync Worker
                let sync_service_clone = Arc::new(sync_service);
                tauri::async_runtime::spawn(async move {
                    sync_service_clone.start_sync_worker().await;
                });

                let ws_service = WebSocketService::new(handle, Arc::clone(&db_service), "127.0.0.1:3012".to_string());
                
                app.manage(db_service);
                app.manage(ws_service);
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            signup,
            get_users,
            login,
            refresh_token,
            create_staff,
            delete_staff,
            update_staff,
            get_staff,
            create_order,
            get_orders,
            create_order_item,
            get_order_items,
            update_order_item,
            delete_order_item,
            create_guest,
            get_guests,
            update_guest,
            delete_guest,
            create_food_item,
            get_food_items,
            update_food_item,
            delete_food_item,
            create_table,
            get_tables,
            update_table,
            delete_table,
            send_ws_message,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
