use std::io::{Read, Write};
use std::path::Path;

mod network;
mod identity;

use network::{Command, PeerNode, ManifestationResult, SignedManifestation};
use identity::UserIdentity;
use std::sync::Mutex;
use tauri::{Emitter, Manager, State};
use tokio::sync::{mpsc, oneshot};

struct NetworkState {
    sender: Mutex<Option<mpsc::Sender<Command>>>,
    identity: Mutex<Option<UserIdentity>>,
    /// Controls whether `publish_result` forwards data to the P2P network.
    /// Default: false (explicit opt-in required, per PRD Feature 3.6).
    sharing_enabled: Mutex<bool>,
}

fn load_or_generate_keypair(path: &Path) -> std::io::Result<libp2p::identity::Keypair> {
    if path.exists() {
        let mut bytes = Vec::new();
        let mut file = std::fs::File::open(path)?;
        file.read_to_end(&mut bytes)?;
        
        libp2p::identity::Keypair::from_protobuf_encoding(&bytes)
            .map_err(|e| std::io::Error::new(std::io::ErrorKind::InvalidData, e))
    } else {
        println!("Generating new identity keypair...");
        let keypair = libp2p::identity::Keypair::generate_ed25519();
        let encoded = keypair.to_protobuf_encoding()
            .map_err(|e| std::io::Error::new(std::io::ErrorKind::Other, e))?;
            
        if let Some(parent) = path.parent() {
            std::fs::create_dir_all(parent)?;
        }
        
        let mut file = std::fs::File::create(path)?;
        file.write_all(&encoded)?;
        println!("Saved identity to {:?}", path);
        Ok(keypair)
    }
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

/// Publish a signed manifestation result to the gossipsub network.
/// The result is signed with the user's persistent Ed25519 identity key.
/// Returns the IPFS CID of the published payload.
/// Fails if network sharing has not been enabled via `set_network_sharing`.
#[tauri::command]
async fn publish_result(
    score: f64,
    category_scores: std::collections::HashMap<String, f64>,
    state: State<'_, NetworkState>
) -> Result<String, String> {
    // Opt-in gate: sharing must be explicitly enabled (PRD Feature 3.6)
    {
        let guard = state.sharing_enabled.lock().map_err(|e| e.to_string())?;
        if !*guard {
            return Err("Network sharing is disabled. Enable it in Settings to share results anonymously.".into());
        }
    }
    // Build the result
    let timestamp = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map_err(|e| e.to_string())?
        .as_secs();
    let result = ManifestationResult { score, timestamp, category_scores };

    // Validate before signing
    result.validate()?;

    // Get identity
    let identity = {
        let guard = state.identity.lock().map_err(|e| e.to_string())?;
        guard.clone().ok_or_else(|| "Identity not initialized".to_string())?
    };

    // Sign the result
    let signed = SignedManifestation::new(result, &identity)?;
    let cid = signed.payload.get_cid()?;
    let payload_bytes = serde_json::to_vec(&signed).map_err(|e| e.to_string())?;

    // Publish via gossipsub
    let sender = {
        let guard = state.sender.lock().map_err(|e| e.to_string())?;
        guard.clone()
    };
    if let Some(tx) = sender {
        let (ack_tx, ack_rx) = tokio::sync::oneshot::channel();
        tx.send(Command::Publish {
            topic: "manifestation-global".to_string(),
            message: payload_bytes,
            sender: ack_tx,
        }).await.map_err(|e| e.to_string())?;
        ack_rx.await.map_err(|e| e.to_string())?.map_err(|e| e.to_string())?;
    } else {
        return Err("Node not running".into());
    }
    Ok(cid)
}


/// Enable or disable anonymous P2P result sharing.
/// Sharing is **opt-in** and disabled by default (PRD Feature 3.6).
#[tauri::command]
fn set_network_sharing(enabled: bool, state: State<'_, NetworkState>) -> Result<(), String> {
    let mut guard = state.sharing_enabled.lock().map_err(|e| e.to_string())?;
    *guard = enabled;
    println!("Network sharing {}", if enabled { "enabled" } else { "disabled" });
    Ok(())
}

/// Return the current sharing opt-in state.
#[tauri::command]
fn get_network_sharing(state: State<'_, NetworkState>) -> Result<bool, String> {
    let guard = state.sharing_enabled.lock().map_err(|e| e.to_string())?;
    Ok(*guard)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .manage(NetworkState {
            sender: Mutex::new(None),
            identity: Mutex::new(None),
            sharing_enabled: Mutex::new(false),
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


                // Path to identity key file
                let key_path = match app_handle.path().app_data_dir() {
                    Ok(path) => {
                        if !path.exists() {
                            let _ = std::fs::create_dir_all(&path);
                        }
                        path.join("identity.key")
                    },
                    Err(_) => std::path::PathBuf::from("identity.key"), // Fallback
                };

                // Load or generate user identity (separate from P2P node ID)
                let user_id_path = key_path.with_file_name("user_identity.json");
                let _user_identity = match UserIdentity::load_or_create(&user_id_path) {
                    Ok(id) => {
                        println!("User identity loaded (pk: {}...)", &id.public_key_b64()[..8]);
                        if let Some(state) = app_handle.try_state::<NetworkState>() {
                            if let Ok(mut guard) = state.identity.lock() {
                                *guard = Some(id.clone());
                            }
                        }
                        id
                    },
                    Err(e) => {
                        eprintln!("Failed to load user identity: {}. Using ephemeral.", e);
                        UserIdentity::generate()
                    }
                };

                let id_keys = match load_or_generate_keypair(&key_path) {
                    Ok(kp) => {
                        println!("Identity loaded/generated at {:?}", key_path);
                        kp
                    },
                    Err(e) => {
                        eprintln!("Failed to init identity at {:?}: {}. Using ephemeral key.", key_path, e);
                        libp2p::identity::Keypair::generate_ed25519()
                    }
                };

                // Build cache path for network score persistence
                let cache_path = match app_handle.path().app_data_dir() {
                    Ok(path) => Some(path.join("network_cache.json")),
                    Err(_) => None,
                };

                match PeerNode::new(id_keys, cmd_rx, event_tx, cache_path).await {
                    Ok(node) => {
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
        .invoke_handler(tauri::generate_handler![greet, get_peer_count, publish_result, set_network_sharing, get_network_sharing])
        .build(tauri::generate_context!())
        .expect("error while running tauri application")
        .run(|app_handle, event| {
            if let tauri::RunEvent::ExitRequested { code: _, api: _, .. } = event {
                 // Nothing special needed here unless preventing exit
            }
            if let tauri::RunEvent::Exit = event {
                // Use try_send to avoid blocking the main thread during teardown.
                // The channel has capacity 32; at shutdown it is effectively empty.
                if let Some(state) = app_handle.try_state::<NetworkState>() {
                    if let Ok(guard) = state.sender.lock() {
                        if let Some(tx) = guard.as_ref() {
                            if let Err(e) = tx.try_send(Command::Shutdown) {
                                eprintln!("Warning: Could not signal P2P shutdown: {}", e);
                            }
                        }
                    }
                }
            }
        });
}
