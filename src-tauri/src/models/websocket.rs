use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct WsMessage {
    pub event: String,
    pub payload: serde_json::Value,
}
