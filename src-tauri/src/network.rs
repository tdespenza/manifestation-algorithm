use libp2p::{
    gossipsub, identify, kad, mdns, noise, ping, swarm::NetworkBehaviour, tcp, yamux, Multiaddr,
    PeerId, StreamProtocol, Swarm,
};
use libp2p::swarm::SwarmEvent;
use serde::{Deserialize, Serialize};
use std::collections::hash_map::DefaultHasher;
use std::error::Error;
use std::hash::{Hash, Hasher};
use std::time::Duration;
use tokio::sync::{mpsc, oneshot};
use libp2p::futures::StreamExt;

#[derive(NetworkBehaviour)]
pub struct AppBehaviour {
    pub gossipsub: gossipsub::Behaviour,
    pub kademlia: kad::Behaviour<kad::store::MemoryStore>,
    pub identify: identify::Behaviour,
    pub ping: ping::Behaviour,
    pub mdns: mdns::tokio::Behaviour,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NetworkStatUpdate {
    pub peer_count: usize,
    pub connected_peers: Vec<String>,
    pub total_manifestations: usize, // New field for aggregation
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ManifestationResult {
    pub score: f64,
    pub timestamp: u64,
    pub category_scores: std::collections::HashMap<String, f64>,
}

pub enum Command {
    StartListening {
        addr: Multiaddr,
        sender: oneshot::Sender<Result<(), Box<dyn Error + Send>>>,
    },
    Dial {
        peer_id: PeerId,
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

pub struct PeerNode {
    swarm: Swarm<AppBehaviour>,
    command_receiver: mpsc::Receiver<Command>,
    event_sender: mpsc::Sender<NetworkStatUpdate>,
    total_manifestations: usize,
}

impl PeerNode {
    pub async fn new(
        keypair: libp2p::identity::Keypair,
        command_receiver: mpsc::Receiver<Command>,
        event_sender: mpsc::Sender<NetworkStatUpdate>,
    ) -> Result<Self, Box<dyn Error + Send + Sync>> {
        let peer_id = keypair.public().to_peer_id();

        let mut swarm = libp2p::SwarmBuilder::with_existing_identity(keypair)
            .with_tokio()
            .with_tcp(
                tcp::Config::default(),
                noise::Config::new,
                yamux::Config::default,
            )?
            .with_behaviour(|key| {
                // GossipSub configuration
                let message_id_fn = |message: &gossipsub::Message| {
                    let mut s = DefaultHasher::new();
                    message.data.hash(&mut s);
                    gossipsub::MessageId::from(s.finish().to_string())
                };
                let gossipsub_config = gossipsub::ConfigBuilder::default()
                    .heartbeat_interval(Duration::from_secs(10))
                    .validation_mode(gossipsub::ValidationMode::Strict)
                    .message_id_fn(message_id_fn)
                    .build()
                    .map_err(|msg| std::io::Error::new(std::io::ErrorKind::Other, msg))?;

                let gossipsub = gossipsub::Behaviour::new(
                    gossipsub::MessageAuthenticity::Signed(key.clone()),
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

        Ok(Self {
            swarm,
            command_receiver,
            event_sender,
            total_manifestations: 0,
        })
    }

    pub async fn run(mut self) {
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
                            propagation_source: peer_id,
                            message_id: id,
                            message,
                        })) => {
                            match serde_json::from_slice::<ManifestationResult>(&message.data) {
                                Ok(result) => {
                                    println!("Received valid result from {}: {:?}", peer_id, result);
                                    self.total_manifestations += 1;
                                    let stats = self.get_stats();
                                    let _ = self.event_sender.send(stats).await;
                                }
                                Err(e) => {
                                    println!("Received invalid message: {} ({})", String::from_utf8_lossy(&message.data), e);
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
                        Some(Command::Dial { peer_id, addr, sender }) => {
                            let _ = match self.swarm.dial(addr) {
                                Ok(_) => sender.send(Ok(())),
                                Err(e) => sender.send(Err(Box::new(e))),
                            };
                        }
                        Some(Command::Publish { topic, message, sender }) => {
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
        NetworkStatUpdate {
            peer_count: peers.len(),
            connected_peers: peers,
            total_manifestations: self.total_manifestations,
        }
    }
}
