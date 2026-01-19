pub mod models;
pub mod services;
pub mod routes;

use crate::routes::auth_routes::*;
use crate::routes::order_routes::*;
use crate::routes::staff_routes::*;
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

                let ws_service = WebSocketService::new(handle, Arc::clone(&db_service), "127.0.0.1:8080".to_string());
                
                app.manage(db_service);
                app.manage(ws_service);
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            signup,
            login,
            refresh_token,
            create_order,
            create_staff,
            delete_staff,
            update_staff,
            send_ws_message,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
