use futures_util::{SinkExt, StreamExt};
use std::collections::HashMap;
use std::net::SocketAddr;
use std::sync::Arc;
use tauri::{AppHandle, Emitter};
use tokio::net::TcpListener;
use tokio::sync::{mpsc, Mutex};
use tokio_tungstenite::accept_async;
use tokio_tungstenite::tungstenite::protocol::Message;
use crate::models::websocket::WsMessage;
use crate::services::db_service::DbService;

type PeerMap = Arc<Mutex<HashMap<SocketAddr, mpsc::UnboundedSender<Message>>>>;

pub struct WebSocketService {
    peers: PeerMap,
}

impl WebSocketService {
    pub fn new(app_handle: AppHandle, db: Arc<DbService>, addr: String) -> Arc<Self> {
        let peers = Arc::new(Mutex::new(HashMap::new()));
        let service = Arc::new(Self {
            peers: Arc::clone(&peers),
        });
        let service_clone = Arc::clone(&service);

        tauri::async_runtime::spawn(async move {
            let listener = TcpListener::bind(&addr).await.expect("Failed to bind WebSocket server");
            println!("WebSocket server listening on: {}", addr);

            while let Ok((stream, addr)) = listener.accept().await {
                let peers = Arc::clone(&peers);
                let app_handle = app_handle.clone();
                let db = Arc::clone(&db);

                tauri::async_runtime::spawn(async move {
                    println!("New connection from: {}", addr);
                    
                    if let Ok(ws_stream) = accept_async(stream).await {
                        let (tx, mut rx) = mpsc::unbounded_channel();
                        peers.lock().await.insert(addr, tx);

                        let (mut ws_sender, mut ws_receiver) = ws_stream.split();

                        loop {
                            tokio::select! {
                                Some(msg) = rx.recv() => {
                                    if let Err(e) = ws_sender.send(msg).await {
                                        println!("Error sending to peer {}: {}", addr, e);
                                        break;
                                    }
                                }
                                Some(result) = ws_receiver.next() => {
                                    match result {
                                        Ok(msg) => {
                                            if let Message::Text(text) = msg {
                                                if let Ok(ws_msg) = serde_json::from_str::<WsMessage>(&text) {
                                                    // Log to DB for Sync if it's a mutation
                                                    if ws_msg.event.contains("create") || ws_msg.event.contains("update") || ws_msg.event.contains("delete") {
                                                        let _ = db.save_locally("events", &text, &ws_msg.event).await;
                                                    }

                                                    // Emit to frontend (local app)
                                                    app_handle.emit("ws-message", ws_msg.clone()).unwrap_or_default();
                                                    
                                                    // Broadcast to ALL connected peers (including sender/others)
                                                    let json = serde_json::to_string(&ws_msg).unwrap_or_default();
                                                    let broadcast_msg = Message::Text(json.into());
                                                    let peers_guard = peers.lock().await;
                                                    for (_peer_addr, peer_tx) in peers_guard.iter() {
                                                        // Optionally skip sender: if *_peer_addr != addr { ... }
                                                        let _ = peer_tx.send(broadcast_msg.clone());
                                                    }
                                                }
                                            }
                                        }
                                        Err(e) => {
                                            println!("Error receiving from peer {}: {}", addr, e);
                                            break;
                                        }
                                    }
                                }
                            }
                        }

                        peers.lock().await.remove(&addr);
                        println!("Connection closed: {}", addr);
                    }
                });
            }
        });

        service_clone
    }

    pub async fn broadcast(&self, msg: WsMessage) {
        let json = serde_json::to_string(&msg).unwrap_or_default();
        let message = Message::Text(json.into());
        let peers = self.peers.lock().await;
        for (_, tx) in peers.iter() {
            let _ = tx.send(message.clone());
        }
    }
}
