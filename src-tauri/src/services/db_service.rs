use sqlx::{mysql::MySqlPool, sqlite::{SqlitePool, SqliteConnectOptions}};
use std::sync::Arc;
use tauri::{AppHandle, Manager};
use std::fs;
use crate::models::staff::StaffCreate;
use crate::models::order::OrderCreate;

pub struct DbService {
    pub local_pool: SqlitePool,
    pub cloud_pool: Option<MySqlPool>,
}

impl DbService {
    pub async fn new(app_handle: &AppHandle) -> Result<Arc<Self>, String> {
        let app_dir = app_handle
            .path()
            .app_data_dir()
            .map_err(|e| e.to_string())?;
        
        if !app_dir.exists() {
            fs::create_dir_all(&app_dir).map_err(|e| e.to_string())?;
        }

        let db_path = app_dir.join("namaste_pms.db");
        
        // Use ConnectOptions to ensure the file is created if it doesn't exist
        let sqlite_options = SqliteConnectOptions::new()
            .filename(db_path)
            .create_if_missing(true);

        // Initialize SQLite
        let local_pool = SqlitePool::connect_with(sqlite_options)
            .await
            .map_err(|e| format!("Failed to connect to SQLite: {}", e))?;

        // Create tables if not exists
        sqlx::query(
            "CREATE TABLE IF NOT EXISTS staff (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                business_id INTEGER NOT NULL,
                role_id INTEGER NOT NULL,
                shift_id INTEGER NOT NULL,
                status_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                password TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                business_id INTEGER NOT NULL,
                order_number TEXT NOT NULL,
                guest_id INTEGER NOT NULL,
                order_type_id INTEGER NOT NULL,
                status_id INTEGER NOT NULL,
                subtotal REAL NOT NULL,
                tax REAL NOT NULL,
                discount REAL NOT NULL,
                total_amount REAL NOT NULL,
                notes TEXT,
                served_by INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS sync_queue (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                table_name TEXT NOT NULL,
                data TEXT NOT NULL,
                operation TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );"
        )
        .execute(&local_pool)
        .await
        .map_err(|e| e.to_string())?;

        // Initialize Cloud MySQL (Optional, might fail if offline)
        let cloud_pool = if let Ok(cloud_url) = std::env::var("DATABASE_URL") {
            MySqlPool::connect(&cloud_url).await.ok()
        } else {
            None
        };

        Ok(Arc::new(Self {
            local_pool,
            cloud_pool,
        }))
    }

    pub async fn create_staff_local(&self, staff: &StaffCreate) -> Result<i64, String> {
        let result = sqlx::query(
            "INSERT INTO staff (business_id, role_id, shift_id, status_id, name, phone, password) 
             VALUES (?, ?, ?, ?, ?, ?, ?)"
        )
        .bind(staff.business_id)
        .bind(staff.role_id)
        .bind(staff.shift_id)
        .bind(staff.status_id)
        .bind(&staff.name)
        .bind(&staff.phone)
        .bind(&staff.password)
        .execute(&self.local_pool)
        .await
        .map_err(|e| e.to_string())?;

        let id = result.last_insert_rowid();
        
        // Add to sync queue
        let data = serde_json::to_string(staff).map_err(|e| e.to_string())?;
        self.save_locally("staff", &data, "INSERT").await?;

        Ok(id)
    }

    pub async fn create_order_local(&self, order: &OrderCreate) -> Result<i64, String> {
        let result = sqlx::query(
            "INSERT INTO orders (business_id, order_number, guest_id, order_type_id, status_id, subtotal, tax, discount, total_amount, notes, served_by) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        )
        .bind(order.business_id)
        .bind(&order.order_number)
        .bind(order.guest_id)
        .bind(order.order_type_id)
        .bind(order.status_id)
        .bind(order.subtotal)
        .bind(order.tax)
        .bind(order.discount)
        .bind(order.total_amount)
        .bind(&order.notes)
        .bind(order.served_by)
        .execute(&self.local_pool)
        .await
        .map_err(|e| e.to_string())?;

        let id = result.last_insert_rowid();

        // Add to sync queue
        let data = serde_json::to_string(order).map_err(|e| e.to_string())?;
        self.save_locally("orders", &data, "INSERT").await?;

        Ok(id)
    }

    pub async fn save_locally(&self, table: &str, data: &str, operation: &str) -> Result<(), String> {
        sqlx::query(
            "INSERT INTO sync_queue (table_name, data, operation) VALUES (?, ?, ?)"
        )
        .bind(table)
        .bind(data)
        .bind(operation)
        .execute(&self.local_pool)
        .await
        .map_err(|e| e.to_string())?;
        
        Ok(())
    }
}
