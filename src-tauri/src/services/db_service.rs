use sqlx::{mysql::MySqlPool, sqlite::{SqlitePool, SqliteConnectOptions}};
use std::sync::Arc;
use tauri::{AppHandle, Manager};
use std::fs;
use crate::models::staff::StaffCreate;
use crate::models::order::{OrderCreate, OrderItemCreate};
use serde_json::json;
use crate::models::guest::GuestCreate;
use crate::models::food_item::FoodItemCreate;
use crate::models::table::TableCreate;

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
        println!("Database path: {:?}", db_path);
        
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
                table_id INTEGER NOT NULL,
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
            );
            CREATE TABLE IF NOT EXISTS guests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                business_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                phone TEXT NOT NULL,
                verify_id INTEGER NOT NULL,
                status_id INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            CREATE TABLE IF NOT EXISTS food_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                business_id INTEGER NOT NULL,
                category_id INTEGER NOT NULL,
                name TEXT NOT NULL,
                description TEXT,
                price REAL NOT NULL,
                preparation_time INTEGER NOT NULL,
                spice_level_id INTEGER,
                is_available BOOLEAN DEFAULT 1,
                image_url TEXT
            );
            CREATE TABLE IF NOT EXISTS order_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_id INTEGER NOT NULL,
                food_item_id INTEGER NOT NULL,
                quantity INTEGER NOT NULL,
                unit_price REAL NOT NULL,
                total_price REAL NOT NULL,
                status_id INTEGER NOT NULL,
                special_instructions TEXT
            );
            CREATE TABLE IF NOT EXISTS tables (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                business_id INTEGER NOT NULL,
                table_number TEXT NOT NULL,
                capacity INTEGER,
                location TEXT,
                status_id INTEGER NOT NULL,
                reserved_by INTEGER,
                qr_code TEXT
            );"
        )
        .execute(&local_pool)
        .await
        .map_err(|e| e.to_string())?;


        let _ = sqlx::query(
            "CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                name TEXT,
                phone TEXT,
                role TEXT DEFAULT 'user',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )"
        )
        .execute(&local_pool)
        .await;

        // Patch: Add table_id to orders if it doesn't exist (ignoring error if it does)
        let _ = sqlx::query("ALTER TABLE orders ADD COLUMN table_id INTEGER DEFAULT 0")
            .execute(&local_pool)
            .await;

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

    pub async fn create_guest_local(&self, guest: &GuestCreate) -> Result<i64, String> {
        let result = sqlx::query(
            "INSERT INTO guests (business_id, name, phone, verify_id, status_id) 
             VALUES (?, ?, ?, ?, ?)"
        )
        .bind(guest.business_id)
        .bind(&guest.name)
        .bind(&guest.phone)
        .bind(guest.verify_id)
        .bind(guest.status_id)
        .execute(&self.local_pool)
        .await
        .map_err(|e| e.to_string())?;

        let id = result.last_insert_rowid();
        let data = serde_json::to_string(guest).map_err(|e| e.to_string())?;
        self.save_locally("guests", &data, "INSERT").await?;
        Ok(id)
    }

    pub async fn create_food_item_local(&self, item: &FoodItemCreate) -> Result<i64, String> {
        let result = sqlx::query(
            "INSERT INTO food_items (business_id, category_id, name, description, price, preparation_time, spice_level_id, is_available, image_url) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
        )
        .bind(item.business_id)
        .bind(item.category_id)
        .bind(&item.name)
        .bind(&item.description)
        .bind(item.price)
        .bind(item.preparation_time)
        .bind(item.spice_level_id)
        .bind(item.is_available)
        .bind(&item.image_url)
        .execute(&self.local_pool)
        .await
        .map_err(|e| e.to_string())?;

        let id = result.last_insert_rowid();
        let data = serde_json::to_string(item).map_err(|e| e.to_string())?;
        self.save_locally("food_items", &data, "INSERT").await?;
        Ok(id)
    }

    pub async fn create_table_local(&self, table: &TableCreate) -> Result<i64, String> {
        let result = sqlx::query(
            "INSERT INTO tables (business_id, table_number, capacity, location, status_id, reserved_by, qr_code) 
             VALUES (?, ?, ?, ?, ?, ?, ?)"
        )
        .bind(table.business_id)
        .bind(&table.table_number)
        .bind(table.capacity)
        .bind(&table.location)
        .bind(table.status_id)
        .bind(table.reserved_by)
        .bind(&table.qr_code)
        .execute(&self.local_pool)
        .await
        .map_err(|e| e.to_string())?;

        let id = result.last_insert_rowid();
        let data = serde_json::to_string(table).map_err(|e| e.to_string())?;
        self.save_locally("tables", &data, "INSERT").await?;
        Ok(id)
    }

    pub async fn create_order_item_local(&self, item: &OrderItemCreate) -> Result<i64, String> {
        let result = sqlx::query(
            "INSERT INTO order_items (order_id, food_item_id, quantity, unit_price, total_price, status_id, special_instructions) 
             VALUES (?, ?, ?, ?, ?, ?, ?)"
        )
        .bind(item.order_id)
        .bind(item.food_item_id)
        .bind(item.quantity)
        .bind(item.unit_price)
        .bind(item.total_price)
        .bind(item.status_id)
        .bind(&item.special_instructions)
        .execute(&self.local_pool)
        .await
        .map_err(|e| e.to_string())?;

        let id = result.last_insert_rowid();
        let data = serde_json::to_string(item).map_err(|e| e.to_string())?;
        self.save_locally("order_items", &data, "INSERT").await?;
        Ok(id)
    }

    pub async fn delete_local(&self, table: &str, id: i64) -> Result<(), String> {
        sqlx::query(&format!("DELETE FROM {} WHERE id = ?", table))
            .bind(id)
            .execute(&self.local_pool)
            .await
            .map_err(|e| e.to_string())?;

        let data = json!({ "id": id }).to_string();
        self.save_locally(table, &data, "DELETE").await?;
        Ok(())
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
