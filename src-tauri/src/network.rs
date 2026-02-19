use crate::identity::UserIdentity;
use libp2p::{
    gossipsub, identify, kad, mdns, noise, ping, swarm::NetworkBehaviour, tcp, yamux, Multiaddr,
    Swarm, Transport, core,
};
use base64::{Engine as _, engine::general_purpose::STANDARD as BASE64};
use libp2p::swarm::SwarmEvent;
use serde::{Deserialize, Serialize};
use std::collections::VecDeque;
use std::error::Error;
use std::path::PathBuf;
use std::sync::{Arc, atomic::{AtomicU64, Ordering}};
use std::time::Duration;
use tokio::sync::{mpsc, oneshot};
use libp2p::futures::StreamExt;
use lru::LruCache;
use std::num::NonZeroUsize;
use sha2::{Sha256, Digest};
use cid::Cid;
use multihash::{Code, MultihashDigest};


#[derive(NetworkBehaviour)]
pub struct AppBehaviour {
    pub gossipsub: gossipsub::Behaviour,
    pub kademlia: kad::Behaviour<kad::store::MemoryStore>,
    pub identify: identify::Behaviour,
    pub ping: ping::Behaviour,
    pub mdns: mdns::tokio::Behaviour,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CategoryStats {
    pub avg: f64,
    pub p90: f64,
}

/// A `ManifestationResult` signed with the author's Ed25519 key.
/// The gossipsub layer uses `MessageAuthenticity::Anonymous` — this struct
/// provides application-level authentication without leaking the node PeerId.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SignedManifestation {
    pub payload: ManifestationResult,
    /// Base64-encoded Ed25519 public key of the author
    pub public_key: String,
    /// Base64-encoded detached Ed25519 signature over the canonical JSON of `payload`
    pub signature: String,
}

impl SignedManifestation {
    pub fn new(payload: ManifestationResult, identity: &UserIdentity) -> Result<Self, String> {
        let msg_bytes = serde_json::to_vec(&payload).map_err(|e| e.to_string())?;
        let sig = identity.sign(&msg_bytes);
        let sig_b64 = BASE64.encode(sig.to_bytes());
        let pk_b64 = identity.public_key_b64();
        Ok(Self { payload, public_key: pk_b64, signature: sig_b64 })
    }

    pub fn verify(&self) -> bool {
        match serde_json::to_vec(&self.payload) {
            Ok(msg_bytes) => UserIdentity::verify(&msg_bytes, &self.signature, &self.public_key),
            Err(_) => false,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NetworkStatUpdate {
    pub peer_count: usize,
    pub connected_peers: Vec<String>,
    pub total_manifestations: usize, // New field for aggregation
    pub avg_score: Option<f64>,
    pub percentile_90: Option<f64>,
    pub category_stats: std::collections::HashMap<String, CategoryStats>,
    
    // Bandwidth metrics (bytes)
    pub bandwidth_in: u64,
    pub bandwidth_out: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ManifestationResult {
    pub score: f64,
    pub timestamp: u64,
    pub category_scores: std::collections::HashMap<String, f64>,
}

impl ManifestationResult {
    pub fn get_cid(&self) -> Result<String, String> {
        let json_bytes = serde_json::to_vec(self).map_err(|e| e.to_string())?;
        
        let hash = Code::Sha2_256.digest(&json_bytes);
        
        // Use DAG-JSON (0x0129)
        let cid = Cid::new_v1(0x0129, hash);
        Ok(cid.to_string())
    }

    pub fn validate(&self) -> Result<(), String> {
        // 1. Score validation — max possible score is 10,000
        if self.score < 0.0 || self.score > 10_000.0 {
            return Err(format!("Score {} is out of range (0.0 - 10000.0)", self.score));
        }

        // 2. Timestamp validation (not in future)
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map_err(|e| e.to_string())?
            .as_secs();
        
        // Allow 5 minutes drift
        if self.timestamp > now + 300 {
            return Err(format!("Timestamp {} is in the future", self.timestamp));
        }

        // 3. Category scores validation
        for (category, &score) in &self.category_scores {
            if score < 0.0 || score > 10_000.0 {
                return Err(format!("Category '{}' score {} is out of range", category, score));
            }

            // 4. Privacy validation (PII check in keys)
            if category.contains('@') || category.contains("http") { 
                // Basic heuristic for email/url which might contain PII
                return Err(format!("Category '{}' contains potential PII or invalid characters", category));
            }
        }

        Ok(())
    }
}

pub enum Command {
    StartListening {
        addr: Multiaddr,
        sender: oneshot::Sender<Result<(), Box<dyn Error + Send>>>,
    },
    Publish {
        topic: String,
        message: Vec<u8>,
        sender: oneshot::Sender<Result<(), Box<dyn Error + Send>>>,
    },
    GetPeers {
        sender: oneshot::Sender<Vec<String>>,
    },
    Shutdown,
}

/// Maximum number of scores retained per slot in the sliding window (~80 KB at capacity).
const MAX_SCORES_CAPACITY: usize = 10_000;

/// Serialisable snapshot used to persist and restore received score windows across sessions.
#[derive(Serialize, Deserialize, Default)]
struct NetworkScoresCache {
    scores: Vec<f64>,
    category_scores: std::collections::HashMap<String, Vec<f64>>,
}

pub struct PeerNode {
    swarm: Swarm<AppBehaviour>,
    command_receiver: mpsc::Receiver<Command>,
    event_sender: mpsc::Sender<NetworkStatUpdate>,
    total_manifestations: usize,
    received_scores: VecDeque<f64>,
    received_category_scores: std::collections::HashMap<String, VecDeque<f64>>,
    /// Cumulative inbound application bytes (gossipsub message payloads).
    bytes_in: Arc<AtomicU64>,
    /// Cumulative outbound application bytes (published gossipsub payloads).
    bytes_out: Arc<AtomicU64>,
    seen_messages: LruCache<gossipsub::MessageId, ()>,
    /// Optional path for persisting the score window across restarts.
    cache_path: Option<PathBuf>,
}

impl PeerNode {
    pub async fn new(
        keypair: libp2p::identity::Keypair,
        command_receiver: mpsc::Receiver<Command>,
        event_sender: mpsc::Sender<NetworkStatUpdate>,
        cache_path: Option<PathBuf>,
    ) -> Result<Self, Box<dyn Error + Send + Sync>> {
        let transport = libp2p::tcp::tokio::Transport::new(tcp::Config::default())
            .upgrade(core::upgrade::Version::V1)
            .authenticate(noise::Config::new(&keypair).unwrap())
            .multiplex(yamux::Config::default());

        let mut swarm = libp2p::SwarmBuilder::with_existing_identity(keypair.clone())
            .with_tokio()
            .with_other_transport(|_key| transport)?
            .with_behaviour(|key| {
                // GossipSub configuration
                let message_id_fn = |message: &gossipsub::Message| {
                    let mut hasher = Sha256::new();
                    hasher.update(&message.data);
                    let result = hasher.finalize();
                    gossipsub::MessageId::from(format!("{:x}", result))
                };
                let gossipsub_config = gossipsub::ConfigBuilder::default()
                    .heartbeat_interval(Duration::from_secs(10))
                    // Permissive mode required for Anonymous authenticity
                    .validation_mode(gossipsub::ValidationMode::Permissive)
                    .message_id_fn(message_id_fn)
                    .duplicate_cache_time(Duration::from_secs(60))
                    .build()
                    .map_err(|msg| std::io::Error::new(std::io::ErrorKind::Other, msg))?;

                // Use Anonymous authenticity so the P2P node identity is NOT leaked.
                // Application-level signatures in SignedManifestation provide authentication.
                let gossipsub = gossipsub::Behaviour::new(
                    gossipsub::MessageAuthenticity::Anonymous,
                    gossipsub_config,
                )?;

                // Kademlia configuration
                let store = kad::store::MemoryStore::new(key.public().to_peer_id());
                let kademlia = kad::Behaviour::new(
                    key.public().to_peer_id(),
                    store,
                );

                // Identify configuration
                let identify = identify::Behaviour::new(identify::Config::new(
                    "manifestation/1.0.0".to_string(),
                    key.public(),
                ));

                // Ping configuration
                let ping = ping::Behaviour::new(ping::Config::new().with_interval(Duration::from_secs(30)));

                // mDNS configuration
                let mdns = mdns::tokio::Behaviour::new(mdns::Config::default(), key.public().to_peer_id())?;

                Ok(AppBehaviour {
                    gossipsub,
                    kademlia,
                    identify,
                    ping,
                    mdns,
                })
            })?
            .with_swarm_config(|c| c.with_idle_connection_timeout(Duration::from_secs(60)))
            .build();

        // Subscribe to default topic
        let topic = gossipsub::IdentTopic::new("manifestation-global");
        swarm.behaviour_mut().gossipsub.subscribe(&topic)?;

        let bytes_in = Arc::new(AtomicU64::new(0));
        let bytes_out = Arc::new(AtomicU64::new(0));

        // Restore persisted score window from previous session, if available.
        let cache = cache_path.as_ref()
            .and_then(|p| Self::load_cache(p))
            .unwrap_or_default();

        Ok(Self {
            swarm,
            command_receiver,
            event_sender,
            total_manifestations: cache.scores.len(),
            seen_messages: LruCache::new(NonZeroUsize::new(10000).unwrap()),
            received_scores: VecDeque::from(cache.scores),
            received_category_scores: cache.category_scores.into_iter()
                .map(|(k, v)| (k, VecDeque::from(v)))
                .collect(),
            bytes_in,
            bytes_out,
            cache_path,
        })
    }

    pub async fn run(mut self) {
        // Dial WAN bootstrap peers for DHT peer discovery (complement to LAN mDNS).
        for addr in Self::bootstrap_peers() {
            if let Err(e) = self.swarm.dial(addr.clone()) {
                println!("Bootstrap dial skipped for {}: {}", addr, e);
            } else {
                println!("Dialing bootstrap peer: {}", addr);
            }
        }

        loop {
            tokio::select! {
                event = self.swarm.select_next_some() => {
                    match event {
                        SwarmEvent::NewListenAddr { address, .. } => {
                            println!("Listening on {:?}", address);
                        }
                        SwarmEvent::Behaviour(AppBehaviourEvent::Mdns(mdns::Event::Discovered(list))) => {
                            for (peer_id, _multiaddr) in list {
                                println!("mDNS discovered: {:?}", peer_id);
                                self.swarm.behaviour_mut().gossipsub.add_explicit_peer(&peer_id);
                                self.swarm.behaviour_mut().kademlia.add_address(&peer_id, _multiaddr);
                            }
                            let stats = self.get_stats();
                            let _ = self.event_sender.send(stats).await;
                        }
                        SwarmEvent::Behaviour(AppBehaviourEvent::Mdns(mdns::Event::Expired(list))) => {
                            for (peer_id, _multiaddr) in list {
                                println!("mDNS expired: {:?}", peer_id);
                                self.swarm.behaviour_mut().gossipsub.remove_explicit_peer(&peer_id);
                                self.swarm.behaviour_mut().kademlia.remove_address(&peer_id, &_multiaddr);
                            }
                            let stats = self.get_stats();
                            let _ = self.event_sender.send(stats).await;
                        }
                        SwarmEvent::Behaviour(AppBehaviourEvent::Gossipsub(gossipsub::Event::Message {
                            propagation_source: _peer_id,
                            message_id: id,
                            message,
                        })) => {
                            // Check if we've seen this message recently (Deduplication)
                            if self.seen_messages.contains(&id) {
                                println!("Duplicate message received: {:?}, skipping", id);
                                continue;
                            }
                            self.seen_messages.put(id.clone(), ());

                            // Track inbound bytes (application-layer payload)
                            self.bytes_in.fetch_add(message.data.len() as u64, Ordering::Relaxed);

                            match serde_json::from_slice::<SignedManifestation>(&message.data) {
                                Ok(signed) => {
                                    // 1. Cryptographic signature check (app-level)
                                    if !signed.verify() {
                                        println!("SECURITY: Invalid signature, dropping.");
                                        continue;
                                    }
                                    // 2. Domain validation (range / privacy checks)
                                    if let Err(e) = signed.payload.validate() {
                                        println!("Validation failed for received message: {}", e);
                                    } else {
                                        println!("Received valid signed result from author key: {}", &signed.public_key[..8]);
                                        self.total_manifestations += 1;

                                        // Sliding window: evict oldest entry when at capacity
                                        if self.received_scores.len() >= MAX_SCORES_CAPACITY {
                                            self.received_scores.pop_front();
                                        }
                                        self.received_scores.push_back(signed.payload.score);

                                        for (category, score) in &signed.payload.category_scores {
                                            let cat_scores = self.received_category_scores
                                                .entry(category.clone())
                                                .or_default();
                                            if cat_scores.len() >= MAX_SCORES_CAPACITY {
                                                cat_scores.pop_front();
                                            }
                                            cat_scores.push_back(*score);
                                        }

                                        let stats = self.get_stats();
                                        let _ = self.event_sender.send(stats).await;
                                    }
                                }
                                Err(e) => {
                                    println!("Received unparseable message: {} ({})", String::from_utf8_lossy(&message.data), e);
                                }
                            }
                        }
                        SwarmEvent::ConnectionEstablished { .. } | SwarmEvent::ConnectionClosed { .. } => {
                            let stats = self.get_stats();
                            let _ = self.event_sender.send(stats).await;
                        }
                        _ => {}
                    }
                }
                command = self.command_receiver.recv() => {
                    match command {
                        Some(Command::StartListening { addr, sender }) => {
                            let _ = match self.swarm.listen_on(addr) {
                                Ok(_) => sender.send(Ok(())),
                                Err(e) => sender.send(Err(Box::new(e))),
                            };
                        }
                        Some(Command::Publish { topic, message, sender }) => {
                            // Track outbound bytes (application-layer payload)
                            self.bytes_out.fetch_add(message.len() as u64, Ordering::Relaxed);
                            let topic = gossipsub::IdentTopic::new(topic);
                            let _ = match self.swarm.behaviour_mut().gossipsub.publish(topic, message) {
                                Ok(_) => sender.send(Ok(())),
                                Err(e) => sender.send(Err(Box::new(e))),
                            };
                        }
                        Some(Command::GetPeers { sender }) => {
                            let peers = self.swarm.connected_peers().map(|p| p.to_string()).collect();
                            let _ = sender.send(peers);
                        }
                        Some(Command::Shutdown) => {
                            println!("Shutting down peer node...");
                            // Persist score window for next session
                            if let Some(ref path) = self.cache_path.clone() {
                                self.save_cache(path);
                            }
                            break;
                        }
                        None => {
                            break;
                        }
                    }
                }
            }
        }
    }

    fn get_stats(&self) -> NetworkStatUpdate {
        let peers: Vec<String> = self.swarm.connected_peers().map(|p| p.to_string()).collect();

        // Collect VecDeque → Vec<f64> contiguous slice for percentile calculation.
        let scores_vec: Vec<f64> = self.received_scores.iter().cloned().collect();
        let (avg_score, percentile_90) = if scores_vec.is_empty() {
            (None, None)
        } else {
            let sum: f64 = scores_vec.iter().sum();
            let avg = sum / scores_vec.len() as f64;
            let p90 = calculate_percentile(&scores_vec, 0.9);
            (Some(avg), p90)
        };

        let mut category_stats = std::collections::HashMap::new();
        for (category, scores) in &self.received_category_scores {
            if scores.is_empty() { continue; }
            let scores_slice: Vec<f64> = scores.iter().cloned().collect();
            let sum: f64 = scores_slice.iter().sum();
            let avg = sum / scores_slice.len() as f64;
            let p90 = calculate_percentile(&scores_slice, 0.9).unwrap_or(0.0);
            category_stats.insert(category.clone(), CategoryStats { avg, p90 });
        }

        NetworkStatUpdate {
            peer_count: peers.len(),
            connected_peers: peers,
            total_manifestations: self.total_manifestations,
            avg_score,
            percentile_90,
            category_stats,
            bandwidth_in: self.bytes_in.load(Ordering::Relaxed),
            bandwidth_out: self.bytes_out.load(Ordering::Relaxed),
        }
    }

    /// Returns well-known bootstrap peer addresses for WAN DHT peer discovery.
    /// These complement mDNS (LAN-only) for internet-scale peer connectivity.
    fn bootstrap_peers() -> Vec<Multiaddr> {
        [
            "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ",
            "/ip4/104.236.179.241/tcp/4001/p2p/QmSoLPppuBtQSGwKDZT2M73ULpjvfd3aZ6ha4oFGL1KrGM",
            "/ip4/128.199.219.111/tcp/4001/p2p/QmSoLSafTMBsPKadTEgaXctDQVcqN88CNLHXMkTNwMKPnu",
        ]
        .iter()
        .filter_map(|a| a.parse().ok())
        .collect()
    }

    fn load_cache(path: &std::path::Path) -> Option<NetworkScoresCache> {
        let file = std::fs::File::open(path).ok()?;
        serde_json::from_reader(file).ok()
    }

    fn save_cache(&self, path: &std::path::Path) {
        let cache = NetworkScoresCache {
            scores: self.received_scores.iter().cloned().collect(),
            category_scores: self.received_category_scores.iter()
                .map(|(k, v)| (k.clone(), v.iter().cloned().collect()))
                .collect(),
        };
        match std::fs::File::create(path) {
            Ok(file) => {
                if let Err(e) = serde_json::to_writer(file, &cache) {
                    eprintln!("Failed to save network cache: {}", e);
                } else {
                    println!("Network score cache saved ({} scores)", cache.scores.len());
                }
            }
            Err(e) => eprintln!("Failed to create network cache file: {}", e),
        }
    }
}

fn calculate_percentile(scores: &[f64], percentile: f64) -> Option<f64> {
    if scores.is_empty() {
        return None;
    }
    let mut sorted = scores.to_vec();
    sorted.sort_by(|a, b| a.partial_cmp(b).unwrap_or(std::cmp::Ordering::Equal));
    let idx = (sorted.len() as f64 * percentile) as usize;
    if idx < sorted.len() {
        Some(sorted[idx])
    } else {
        Some(*sorted.last().unwrap())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    // ── Percentile tests ──────────────────────────────────────────────────────

    #[test]
    fn test_percentile_calculation() {
        let scores = vec![10.0, 20.0, 30.0, 40.0, 50.0, 60.0, 70.0, 80.0, 90.0, 100.0];
        // 10 * 0.9 = 9.0 -> index 9 -> 100.0.
        assert_eq!(calculate_percentile(&scores, 0.9), Some(100.0));

        let scores2 = vec![1.0, 2.0, 3.0, 4.0, 5.0];
        // 5 * 0.9 = 4.5 -> index 4 -> 5.0
        assert_eq!(calculate_percentile(&scores2, 0.9), Some(5.0));
        
        // Test median (50th percentile)
        let scores3 = vec![1.0, 3.0, 5.0];
        // 3 * 0.5 = 1.5 -> index 1 -> 3.0
        assert_eq!(calculate_percentile(&scores3, 0.5), Some(3.0));
    }

    #[test]
    fn test_empty_scores() {
        let scores: Vec<f64> = vec![];
        assert_eq!(calculate_percentile(&scores, 0.9), None);
    }
    
    #[test]
    fn test_unsorted_input() {
        let scores = vec![50.0, 10.0, 30.0];
        // Sorted: 10, 30, 50. 
        // 3 * 0.9 = 2.7 -> index 2 -> 50.0
        assert_eq!(calculate_percentile(&scores, 0.9), Some(50.0));
    }

    // ── Privacy validation tests ──────────────────────────────────────────────

    fn make_result(score: f64, categories: Vec<(&str, f64)>) -> ManifestationResult {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
        ManifestationResult {
            score,
            timestamp: now,
            category_scores: categories.into_iter().map(|(k, v)| (k.to_string(), v)).collect(),
        }
    }

    #[test]
    fn test_validate_accepts_valid_result() {
        let r = make_result(75.0, vec![("focus", 80.0), ("gratitude", 60.0)]);
        assert!(r.validate().is_ok());
    }

    #[test]
    fn test_validate_rejects_score_above_range() {
        let r = make_result(101.0, vec![]);
        assert!(r.validate().is_err());
    }

    #[test]
    fn test_validate_rejects_negative_score() {
        let r = make_result(-1.0, vec![]);
        assert!(r.validate().is_err());
    }

    #[test]
    fn test_validate_rejects_category_score_above_100() {
        let r = make_result(50.0, vec![("focus", 150.0)]);
        assert!(r.validate().is_err());
    }

    // ── PII / Anonymity validation tests ─────────────────────────────────────

    #[test]
    fn test_validate_rejects_email_in_category_key() {
        // A category key containing '@' indicates PII (email address leak)
        let r = make_result(50.0, vec![("user@example.com", 75.0)]);
        let err = r.validate().unwrap_err();
        assert!(err.contains("PII"), "Expected PII error, got: {}", err);
    }

    #[test]
    fn test_validate_rejects_url_in_category_key() {
        // A category key containing 'http' indicates PII (URL/identifier leak)
        let r = make_result(50.0, vec![("http://profile.example.com", 75.0)]);
        let err = r.validate().unwrap_err();
        assert!(err.contains("PII"), "Expected PII error, got: {}", err);
    }

    #[test]
    fn test_validate_rejects_https_in_category_key() {
        let r = make_result(50.0, vec![("https://user-profile.net", 60.0)]);
        let err = r.validate().unwrap_err();
        assert!(err.contains("PII"), "Expected PII error, got: {}", err);
    }

    #[test]
    fn test_validate_accepts_normal_category_keys() {
        // Normal category keys should not trigger PII check
        let r = make_result(50.0, vec![
            ("meditation", 80.0),
            ("gratitude_practice", 70.0),
            ("focus-level", 90.0),
        ]);
        assert!(r.validate().is_ok());
    }

    // ── Signature / anonymity tests ───────────────────────────────────────────

    #[test]
    fn test_signed_manifestation_verifies_correctly() {
        let identity = crate::identity::UserIdentity::generate();
        let payload = make_result(60.0, vec![("clarity", 55.0)]);

        let signed = SignedManifestation::new(payload, &identity)
            .expect("signing should succeed");

        assert!(signed.verify(), "Signature should verify with matching key");
    }

    #[test]
    fn test_signed_manifestation_rejects_tampered_payload() {
        let identity = crate::identity::UserIdentity::generate();
        let payload = make_result(60.0, vec![("clarity", 55.0)]);

        let mut signed = SignedManifestation::new(payload, &identity)
            .expect("signing should succeed");

        // Tamper with the score
        signed.payload.score = 99.9;

        assert!(!signed.verify(), "Signature should NOT verify after payload tampering");
    }

    #[test]
    fn test_signed_manifestation_public_key_does_not_contain_sensitive_data() {
        let identity = crate::identity::UserIdentity::generate();
        let payload = make_result(50.0, vec![]);
        let signed = SignedManifestation::new(payload, &identity).unwrap();

        // Public key is base64 — should not contain '@', 'http', or spaces
        assert!(!signed.public_key.contains('@'));
        assert!(!signed.public_key.contains("http"));
        assert!(!signed.public_key.contains(' '));
        // Should be exactly 44 chars (base64-encoded 32 bytes)
        assert_eq!(signed.public_key.len(), 44,
            "Ed25519 public key b64 should be 44 chars, got {}", signed.public_key.len());
    }

    // ── Message deduplication / ordering tests ────────────────────────────────

    #[test]
    fn test_cid_generation_is_deterministic() {
        let r = make_result(75.0, vec![("focus", 80.0)]);
        let cid1 = r.get_cid().expect("CID generation failed");
        let cid2 = r.get_cid().expect("CID generation failed");
        assert_eq!(cid1, cid2, "CID must be deterministic for the same payload");
    }

    #[test]
    fn test_cid_changes_when_payload_changes() {
        let r1 = make_result(75.0, vec![("focus", 80.0)]);
        let r2 = make_result(76.0, vec![("focus", 80.0)]);
        let cid1 = r1.get_cid().unwrap();
        let cid2 = r2.get_cid().unwrap();
        assert_ne!(cid1, cid2, "Different payloads must have different CIDs");
    }

    #[test]
    fn test_message_ordering_resilience_via_sorting() {
        // Verify percentile is order-resilient (always sorts internally)
        let ordered   = vec![10.0, 20.0, 30.0, 40.0, 50.0];
        let reversed  = vec![50.0, 40.0, 30.0, 20.0, 10.0];
        let shuffled  = vec![30.0, 10.0, 50.0, 40.0, 20.0];

        let p50_ord = calculate_percentile(&ordered,  0.5);
        let p50_rev = calculate_percentile(&reversed, 0.5);
        let p50_shu = calculate_percentile(&shuffled, 0.5);

        assert_eq!(p50_ord, p50_rev, "Percentile must be ordering-resilient");
        assert_eq!(p50_ord, p50_shu, "Percentile must be shuffle-resilient");
    }
}
