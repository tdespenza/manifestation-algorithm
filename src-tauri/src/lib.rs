mod network;

use network::{Command, PeerNode};
use std::sync::Mutex;
use tauri::{AppHandle, Emitter, Manager, State};
use tokio::sync::{mpsc, oneshot};

struct NetworkState {
    sender: Mutex<Option<mpsc::Sender<Command>>>,
}

#[tauri::command]
async fn get_peer_count(state: State<'_, NetworkState>) -> Result<usize, String> {
    let sender = {
        let guard = state.sender.lock().map_err(|e| e.to_string())?;
        guard.clone()
    };

    if let Some(tx) = sender {
        let (repl_tx, repl_rx) = oneshot::channel();
        tx.send(Command::GetPeers { sender: repl_tx })
            .await
            .map_err(|e| e.to_string())?;
            
        let peers = repl_rx.await.map_err(|e| e.to_string())?;
        Ok(peers.len())
    } else {
        Err("Node not running".into())
    }
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .manage(NetworkState {
            sender: Mutex::new(None),
        })
        .setup(|app| {
            let app_handle = app.handle().clone();

            tauri::async_runtime::spawn(async move {
                println!("Initializing P2P Node...");
                let (cmd_tx, cmd_rx) = mpsc::channel(32);
                let (event_tx, mut event_rx) = mpsc::channel(32);

                if let Some(state) = app_handle.try_state::<NetworkState>() {
                    if let Ok(mut guard) = state.sender.lock() {
                        *guard = Some(cmd_tx.clone());
                    }
                }

                let handle_clone = app_handle.clone();
                tauri::async_runtime::spawn(async move {
                    while let Some(stats) = event_rx.recv().await {
                        let _ = handle_clone.emit("network-stats", stats);
                    }
                });

                let id_keys = libp2p::identity::Keypair::generate_ed25519();
                match PeerNode::new(id_keys, cmd_rx, event_tx).await {
                    Ok(mut node) => {
                        println!("P2P Node created successfully.");
                        
                        let (ack_tx, ack_rx) = oneshot::channel();
                        let listen_addr = "/ip4/0.0.0.0/tcp/0".parse().unwrap();
                        
                        let _ = cmd_tx.send(Command::StartListening { 
                            addr: listen_addr, 
                            sender: ack_tx 
                        }).await;

                        match ack_rx.await {
                            Ok(Ok(_)) => println!("P2P Node listening started"),
                            Ok(Err(e)) => eprintln!("P2P Node failed to listen: {}", e),
                            Err(e) => eprintln!("P2P Node channel error: {}", e),
                        }

                        node.run().await;
                    }
                    Err(e) => {
                        eprintln!("Failed to create P2P node: {}", e);
                    }
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, get_peer_count])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
