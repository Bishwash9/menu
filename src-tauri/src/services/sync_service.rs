use sqlx::mysql::MySqlPool;
use std::sync::Arc;
use tokio::time::{sleep, Duration};
use crate::services::db_service::DbService;

pub struct SyncService {
    db_service: Arc<DbService>,
}

impl SyncService {
    pub fn new(db_service: Arc<DbService>) -> Self {
        Self { db_service }
    }

    pub async fn start_sync_worker(&self) {
        loop {
            if let Some(ref cloud_pool) = self.db_service.cloud_pool {
                // 1. Push local changes to Cloud
                if let Err(e) = self.process_queue(cloud_pool).await {
                    println!("Push error: {}", e);
                }

                // 2. Pull cloud changes to Local (Sync Down)
                if let Err(e) = self.sync_down(cloud_pool).await {
                    println!("Pull error: {}", e);
                }
            }
            sleep(Duration::from_secs(10)).await;
        }
    }

    async fn sync_down(&self, _pool: &MySqlPool) -> Result<(), String> {
        // Here you would:
        // 1. Fetch latest changes from Azure (e.g., using a timestamp column)
        // 2. Upsert them into SQLite
        // 3. Emit a WebSocket event so the UI refreshes
        Ok(())
    }

    async fn process_queue(&self, cloud_pool: &MySqlPool) -> Result<(), String> {
        let items: Vec<(i64, String, String, String)> = sqlx::query_as(
            "SELECT id, table_name, data, operation FROM sync_queue ORDER BY id LIMIT 10"
        )
        .fetch_all(&self.db_service.local_pool)
        .await
        .map_err(|e| e.to_string())?;

        for (id, table, data, op) in items {
            let success = match table.as_str() {
                "staff" => self.sync_staff(cloud_pool, &data, &op).await,
                "orders" => self.sync_order(cloud_pool, &data, &op).await,
                "guests" => self.sync_guest(cloud_pool, &data, &op).await,
                "food_items" => self.sync_food_item(cloud_pool, &data, &op).await,
                "tables" => self.sync_table(cloud_pool, &data, &op).await,
                "order_items" => self.sync_order_item(cloud_pool, &data, &op).await,
                _ => Ok(()),
            };

            if let Ok(_) = success {
                // If successful, delete from queue
                sqlx::query("DELETE FROM sync_queue WHERE id = ?")
                    .bind(id)
                    .execute(&self.db_service.local_pool)
                    .await
                    .map_err(|e| e.to_string())?;
            } else {
                println!("Failed to sync item {}: {:?}", id, success.err());
                // Stop processing for now to avoid congestion
                break;
            }
        }

        Ok(())
    }

    async fn sync_staff(&self, pool: &MySqlPool, data: &str, op: &str) -> Result<(), String> {
        use crate::models::staff::StaffCreate;
        let staff: StaffCreate = serde_json::from_str(data).map_err(|e| e.to_string())?;

        if op == "INSERT" {
            sqlx::query(
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
            .execute(pool)
            .await
            .map_err(|e| e.to_string())?;
        }
        // Handle UPDATE/DELETE similarly...
        Ok(())
    }

    async fn sync_order(&self, pool: &MySqlPool, data: &str, op: &str) -> Result<(), String> {
        use crate::models::order::OrderCreate;
        let order: OrderCreate = serde_json::from_str(data).map_err(|e| e.to_string())?;

        if op == "INSERT" {
            sqlx::query(
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
            .execute(pool)
            .await
            .map_err(|e| e.to_string())?;
        }
        Ok(())
    }

    async fn sync_guest(&self, pool: &MySqlPool, data: &str, op: &str) -> Result<(), String> {
        let item: serde_json::Value = serde_json::from_str(data).map_err(|e| e.to_string())?;
        
        if op == "INSERT" {
            sqlx::query(
                "INSERT INTO guests (business_id, name, phone, verify_id, status_id) VALUES (?, ?, ?, ?, ?)"
            )
            .bind(item["business_id"].as_i64())
            .bind(item["name"].as_str())
            .bind(item["phone"].as_str())
            .bind(item["verify_id"].as_i64())
            .bind(item["status_id"].as_i64())
            .execute(pool)
            .await
            .map_err(|e| e.to_string())?;
        }
        Ok(())
    }

    async fn sync_food_item(&self, pool: &MySqlPool, data: &str, op: &str) -> Result<(), String> {
        let item: serde_json::Value = serde_json::from_str(data).map_err(|e| e.to_string())?;
        if op == "INSERT" {
            sqlx::query(
                "INSERT INTO food_items (business_id, category_id, name, description, price, preparation_time, spice_level_id, is_available, image_url) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
            )
            .bind(item["business_id"].as_i64())
            .bind(item["category_id"].as_i64())
            .bind(item["name"].as_str())
            .bind(item["description"].as_str())
            .bind(item["price"].as_f64())
            .bind(item["preparation_time"].as_i64())
            .bind(item["spice_level_id"].as_i64())
            .bind(item["is_available"].as_bool())
            .bind(item["image_url"].as_str())
            .execute(pool)
            .await
            .map_err(|e| e.to_string())?;
        }
        Ok(())
    }

    async fn sync_table(&self, pool: &MySqlPool, data: &str, op: &str) -> Result<(), String> {
        let item: serde_json::Value = serde_json::from_str(data).map_err(|e| e.to_string())?;
        if op == "INSERT" {
            sqlx::query(
                "INSERT INTO tables (business_id, table_number, capacity, location, status_id, reserved_by, qr_code) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)"
            )
            .bind(item["business_id"].as_i64())
            .bind(item["table_number"].as_str())
            .bind(item["capacity"].as_i64())
            .bind(item["location"].as_str())
            .bind(item["status_id"].as_i64())
            .bind(item["reserved_by"].as_i64())
            .bind(item["qr_code"].as_str())
            .execute(pool)
            .await
            .map_err(|e| e.to_string())?;
        }
        Ok(())
    }

    async fn sync_order_item(&self, pool: &MySqlPool, data: &str, op: &str) -> Result<(), String> {
        let item: serde_json::Value = serde_json::from_str(data).map_err(|e| e.to_string())?;
        if op == "INSERT" {
            sqlx::query(
                "INSERT INTO order_items (order_id, food_item_id, quantity, unit_price, total_price, status_id, special_instructions) 
                 VALUES (?, ?, ?, ?, ?, ?, ?)"
            )
            .bind(item["order_id"].as_i64())
            .bind(item["food_item_id"].as_i64())
            .bind(item["quantity"].as_i64())
            .bind(item["unit_price"].as_f64())
            .bind(item["total_price"].as_f64())
            .bind(item["status_id"].as_i64())
            .bind(item["special_instructions"].as_str())
            .execute(pool)
            .await
            .map_err(|e| e.to_string())?;
        }
        Ok(())
    }
}
