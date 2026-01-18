pub mod models;
pub mod services;
pub mod routes;

use crate::routes::auth_routes::*;
use crate::routes::order_routes::*;
use crate::routes::staff_routes::*;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            signup,
            login,
            refresh_token,
            create_order,
            create_staff,
            delete_staff,
            update_staff
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
