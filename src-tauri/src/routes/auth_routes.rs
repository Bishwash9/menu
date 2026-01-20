use crate::models::auth::*;
use crate::services::db_service::DbService;
use std::sync::Arc;
use tauri::State;
use bcrypt::{hash, verify, DEFAULT_COST};
use jsonwebtoken::{encode, Header, EncodingKey};
use chrono::{Utc, Duration};
use serde::{Deserialize, Serialize};

const JWT_SECRET: &[u8] = b"secret_key_change_me"; // In prod, use env var

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String, // email
    exp: usize,
}

#[tauri::command]
pub async fn signup(
    db: State<'_, Arc<DbService>>,
    data: SignupRequest
) -> Result<SignupResponse, String> {
    // 1. Check if user exists
    let exists: bool = sqlx::query_scalar("SELECT EXISTS(SELECT 1 FROM users WHERE email = ?)")
        .bind(&data.email)
        .fetch_one(&db.local_pool)
        .await
        .map_err(|e| e.to_string())?;

    if exists {
        return Err("User already exists".to_string());
    }

    // 2. Hash password
    let password_hash = hash(&data.password, DEFAULT_COST).map_err(|e| e.to_string())?;

    // 3. Insert user
    let result = sqlx::query(
        "INSERT INTO users (email, password_hash, name, phone, role) VALUES (?, ?, ?, ?, ?)"
    )
    .bind(&data.email)
    .bind(password_hash)
    .bind(&data.username) // Mapping username to name
    .bind("") // Phone optional
    .bind("admin") // Default role
    .execute(&db.local_pool)
    .await
    .map_err(|e| e.to_string())?;

    let id = result.last_insert_rowid();

    // 4. Generate Token
    let expiration = Utc::now()
        .checked_add_signed(Duration::hours(24))
        .expect("valid timestamp")
        .timestamp();

    let claims = Claims {
        sub: data.email.clone(),
        exp: expiration as usize,
    };

    let token = encode(&Header::default(), &claims, &EncodingKey::from_secret(JWT_SECRET))
        .map_err(|e| e.to_string())?;

    // 5. Create response
    Ok(SignupResponse {
        id: id as i32,
        email: data.email,
        username: data.username,
        access_token: token,
        token_type: "bearer".to_string(),
    })
}

#[tauri::command]
pub async fn login(
    db: State<'_, Arc<DbService>>,
    data: LoginRequest
) -> Result<LoginResponse, String> {
    // 1. Fetch user by email
    let user: Option<(i64, String, String, String)> = sqlx::query_as(
        "SELECT id, email, password_hash, name FROM users WHERE email = ?"
    )
    .bind(&data.username) // LoginRequest uses 'username' field for email usually
    .fetch_optional(&db.local_pool)
    .await
    .map_err(|e| e.to_string())?;

    if let Some((_id, email, password_hash, name)) = user {
        // 2. Verify password
        let valid = verify(&data.password, &password_hash).map_err(|e| e.to_string())?;
        if !valid {
            return Err("Invalid credentials".to_string());
        }

        // 3. Generate Token
        let expiration = Utc::now()
            .checked_add_signed(Duration::hours(24))
            .expect("valid timestamp")
            .timestamp();

        let claims = Claims {
            sub: email.clone(),
            exp: expiration as usize,
        };

        let token = encode(&Header::default(), &claims, &EncodingKey::from_secret(JWT_SECRET))
            .map_err(|e| e.to_string())?;

        Ok(LoginResponse {
            access_token: token,
            token_type: "bearer".to_string(),
            username: name,
        })
    } else {
        Err("User not found".to_string())
    }
}

#[tauri::command]
pub async fn refresh_token() -> Result<RefreshResponse, String> {
    // Mock refresh for now, or implement proper refresh logic if needed
    Ok(RefreshResponse {
        access_token: "new_token".to_string(),
        token_type: "bearer".to_string(),
    })
}

#[tauri::command]
pub async fn get_users(db: State<'_, Arc<DbService>>) -> Result<serde_json::Value, String> {
    let users: Vec<(i64, String, String)> = sqlx::query_as(
        "SELECT id, email, name FROM users"
    )
    .fetch_all(&db.local_pool)
    .await
    .map_err(|e| e.to_string())?;

    let json_users: Vec<serde_json::Value> = users.into_iter().map(|(id, email, name)| {
        serde_json::json!({
            "id": id,
            "email": email,
            "business_name": name // Mapping name to business_name for frontend compat
        })
    }).collect();

    Ok(serde_json::json!(json_users))
}
