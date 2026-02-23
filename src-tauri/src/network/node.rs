use super::types::{
    AppBehaviour, CategoryStats, Command, NetworkScoresCache,
    NetworkStatUpdate, SignedManifestation, MAX_SCORES_CAPACITY,
};
use super::utils::calculate_percentile;
use libp2p::{
    gossipsub, identify, kad, mdns, noise, ping, tcp, yamux, core,
    Multiaddr, Swarm, Transport,
};
use libp2p::swarm::SwarmEvent;
use libp2p::futures::StreamExt;
use lru::LruCache;
use std::collections::VecDeque;
use std::error::Error;
use std::num::NonZeroUsize;
use std::path::PathBuf;
use std::sync::{Arc, atomic::{AtomicU64, Ordering}};
use std::time::Duration;
use tokio::sync::mpsc;

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
    /// Bootstrap peer addresses to dial on startup (empty = use defaults).
    bootstrap_peers: Vec<Multiaddr>,
}

impl PeerNode {
    pub async fn new(
        keypair: libp2p::identity::Keypair,
        command_receiver: mpsc::Receiver<Command>,
        event_sender: mpsc::Sender<NetworkStatUpdate>,
        cache_path: Option<PathBuf>,
        bootstrap_peers: Vec<Multiaddr>,
    ) -> Result<Self, Box<dyn Error + Send + Sync>> {
        let transport = libp2p::tcp::tokio::Transport::new(tcp::Config::default())
            .upgrade(core::upgrade::Version::V1)
            .authenticate(noise::Config::new(&keypair).unwrap())
            .multiplex(yamux::Config::default());

        let mut swarm = libp2p::SwarmBuilder::with_existing_identity(keypair.clone())
            .with_tokio()
            .with_other_transport(|_key| transport)?
            .with_behaviour(|key| {
                let message_id_fn = |message: &gossipsub::Message| {
                    use sha2::{Sha256, Digest};
                    let mut hasher = Sha256::new();
                    hasher.update(&message.data);
                    let result = hasher.finalize();
                    gossipsub::MessageId::from(format!("{:x}", result))
                };
                let gossipsub_config = gossipsub::ConfigBuilder::default()
                    .heartbeat_interval(Duration::from_secs(10))
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

                let store = kad::store::MemoryStore::new(key.public().to_peer_id());
                let kademlia = kad::Behaviour::new(key.public().to_peer_id(), store);

                let identify = identify::Behaviour::new(identify::Config::new(
                    "manifestation/1.0.0".to_string(),
                    key.public(),
                ));

                let ping = ping::Behaviour::new(
                    ping::Config::new().with_interval(Duration::from_secs(30))
                );

                let mdns = mdns::tokio::Behaviour::new(
                    mdns::Config::default(),
                    key.public().to_peer_id(),
                )?;

                Ok(AppBehaviour { gossipsub, kademlia, identify, ping, mdns })
            })?
            .with_swarm_config(|c| c.with_idle_connection_timeout(Duration::from_secs(60)))
            .build();

        let topic = gossipsub::IdentTopic::new("manifestation-global");
        swarm.behaviour_mut().gossipsub.subscribe(&topic)?;

        let bytes_in  = Arc::new(AtomicU64::new(0));
        let bytes_out = Arc::new(AtomicU64::new(0));

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
            bootstrap_peers,
        })
    }

    pub async fn run(mut self) {
        let peers_to_dial: Vec<Multiaddr> = if self.bootstrap_peers.is_empty() {
            Self::default_bootstrap_peers()
        } else {
            self.bootstrap_peers.clone()
        };
        for addr in peers_to_dial {
            if let Err(e) = self.swarm.dial(addr.clone()) {
                println!("Bootstrap dial skipped for {}: {}", addr, e);
            } else {
                println!("Dialing bootstrap peer: {}", addr);
            }
        }

        loop {
            tokio::select! {
                event = self.swarm.select_next_some() => {
                    self.handle_swarm_event(event).await;
                }
                command = self.command_receiver.recv() => {
                    if !self.handle_command(command).await {
                        break;
                    }
                }
            }
        }
    }

    async fn handle_swarm_event(&mut self, event: SwarmEvent<super::types::AppBehaviourEvent>) {
        match event {
            SwarmEvent::NewListenAddr { address, .. } => {
                println!("Listening on {:?}", address);
            }
            SwarmEvent::Behaviour(super::types::AppBehaviourEvent::Mdns(
                mdns::Event::Discovered(list)
            )) => {
                for (peer_id, multiaddr) in list {
                    println!("mDNS discovered: {:?}", peer_id);
                    self.swarm.behaviour_mut().gossipsub.add_explicit_peer(&peer_id);
                    self.swarm.behaviour_mut().kademlia.add_address(&peer_id, multiaddr);
                }
                let stats = self.get_stats();
                if let Err(e) = self.event_sender.send(stats).await {
                    eprintln!("Failed to send stats: {}", e);
                }
            }
            SwarmEvent::Behaviour(super::types::AppBehaviourEvent::Mdns(
                mdns::Event::Expired(list)
            )) => {
                for (peer_id, multiaddr) in list {
                    println!("mDNS expired: {:?}", peer_id);
                    self.swarm.behaviour_mut().gossipsub.remove_explicit_peer(&peer_id);
                    self.swarm.behaviour_mut().kademlia.remove_address(&peer_id, &multiaddr);
                }
                let stats = self.get_stats();
                if let Err(e) = self.event_sender.send(stats).await {
                    eprintln!("Failed to send stats: {}", e);
                }
            }
            SwarmEvent::Behaviour(super::types::AppBehaviourEvent::Gossipsub(
                gossipsub::Event::Message {
                    propagation_source: _peer_id,
                    message_id: id,
                    message,
                }
            )) => {
                self.handle_gossip_message(id, message).await;
            }
            SwarmEvent::ConnectionEstablished { .. } | SwarmEvent::ConnectionClosed { .. } => {
                let stats = self.get_stats();
                if let Err(e) = self.event_sender.send(stats).await {
                    eprintln!("Failed to send stats: {}", e);
                }
            }
            _ => {}
        }
    }

    async fn handle_gossip_message(
        &mut self,
        id: gossipsub::MessageId,
        message: gossipsub::Message,
    ) {
        // Deduplication: skip if we've already processed this message
        if self.seen_messages.contains(&id) {
            println!("Duplicate message received: {:?}, skipping", id);
            return;
        }
        self.seen_messages.put(id.clone(), ());

        self.bytes_in.fetch_add(message.data.len() as u64, Ordering::Relaxed);

        match serde_json::from_slice::<SignedManifestation>(&message.data) {
            Ok(signed) => {
                // 1. Cryptographic signature check (app-level)
                if !signed.verify() {
                    println!("SECURITY: Invalid signature, dropping.");
                    return;
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
                    if let Err(e) = self.event_sender.send(stats).await {
                        eprintln!("Failed to send stats: {}", e);
                    }
                }
            }
            Err(e) => {
                eprintln!("Received unparseable message: {} ({})",
                    String::from_utf8_lossy(&message.data), e);
            }
        }
    }

    /// Handle a command from the frontend; returns `false` to signal shutdown.
    async fn handle_command(&mut self, command: Option<Command>) -> bool {
        match command {
            Some(Command::StartListening { addr, sender }) => {
                if let Err(e) = match self.swarm.listen_on(addr) {
                    Ok(_)  => sender.send(Ok(())),
                    Err(e) => sender.send(Err(Box::new(e))),
                } {
                    eprintln!("Failed to send StartListening response: {:?}", e);
                }
                true
            }
            Some(Command::Publish { topic, message, sender }) => {
                self.bytes_out.fetch_add(message.len() as u64, Ordering::Relaxed);
                let topic = gossipsub::IdentTopic::new(topic);
                if let Err(e) = match self.swarm.behaviour_mut().gossipsub.publish(topic, message) {
                    Ok(_)  => sender.send(Ok(())),
                    Err(e) => sender.send(Err(Box::new(e))),
                } {
                    eprintln!("Failed to send Publish response: {:?}", e);
                }
                true
            }
            Some(Command::GetPeers { sender }) => {
                let peers = self.swarm.connected_peers().map(|p| p.to_string()).collect();
                if let Err(e) = sender.send(peers) {
                    eprintln!("Failed to send peers: {:?}", e);
                }
                true
            }
            Some(Command::Shutdown) => {
                println!("Shutting down peer node...");
                if let Some(ref path) = self.cache_path.clone() {
                    self.save_cache(path);
                }
                false
            }
            None => false,
        }
    }

    fn get_stats(&self) -> NetworkStatUpdate {
        let peers: Vec<String> = self.swarm.connected_peers().map(|p| p.to_string()).collect();

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
            bandwidth_in:  self.bytes_in.load(Ordering::Relaxed),
            bandwidth_out: self.bytes_out.load(Ordering::Relaxed),
        }
    }

    /// Returns well-known bootstrap peer addresses for WAN DHT peer discovery.
    /// These complement mDNS (LAN-only) for internet-scale peer connectivity.
    /// Used as fallback when no custom bootstrap peers are configured.
    pub fn default_bootstrap_peers() -> Vec<Multiaddr> {
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
