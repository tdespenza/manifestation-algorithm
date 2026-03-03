use crate::identity::UserIdentity;
use libp2p::{gossipsub, identify, kad, mdns, ping, swarm::NetworkBehaviour};
use base64::{Engine as _, engine::general_purpose::STANDARD as BASE64};
use serde::{Deserialize, Serialize};
use tokio::sync::oneshot;
use libp2p::Multiaddr;
use sha2::{Sha256, Digest};
use cid::Cid;
use multihash::Multihash;
use std::error::Error;

/// Maximum number of scores retained per slot in the sliding window (~80 KB at capacity).
pub const MAX_SCORES_CAPACITY: usize = 10_000;

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
            Err(e) => {
                eprintln!("Failed to serialize payload: {}", e);
                false
            },
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NetworkStatUpdate {
    pub peer_count: usize,
    pub connected_peers: Vec<String>,
    pub total_manifestations: usize,
    pub avg_score: Option<f64>,
    pub percentile_90: Option<f64>,
    pub category_stats: std::collections::HashMap<String, CategoryStats>,
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

        let digest = Sha256::digest(&json_bytes);
        let hash = Multihash::<64>::wrap(0x12, &digest)
            .map_err(|e| e.to_string())?;

        // Use DAG-JSON (0x0129)
        let cid = Cid::new_v1(0x0129, hash);
        Ok(cid.to_string())
    }

    pub fn validate(&self) -> Result<(), String> {
        // 1. Score validation — valid range is 0–10,000 (max from question weights)
        if self.score < 0.0 || self.score > 10_000.0 {
            return Err(format!("Score {} is out of range (0.0 - 10,000.0)", self.score));
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
            // 4. Privacy validation (PII check in keys) — must run before range check
            if category.contains('@') || category.contains("http") {
                return Err(format!("Category '{}' contains potential PII or invalid characters", category));
            }

            if score < 0.0 || score > 10.0 {
                return Err(format!("Category '{}' score {} is out of range (0.0 - 10.0)", category, score));
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

/// Serialisable snapshot used to persist and restore received score windows across sessions.
#[derive(Serialize, Deserialize, Default)]
pub struct NetworkScoresCache {
    pub scores: Vec<f64>,
    pub category_scores: std::collections::HashMap<String, Vec<f64>>,
}

#[cfg(test)]
mod tests {
    use super::*;

    fn valid_result() -> ManifestationResult {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
        ManifestationResult {
            score: 5_000.0,
            timestamp: now,
            category_scores: std::collections::HashMap::from([("health".to_string(), 5.0)]),
        }
    }

    // ── Score boundary (kills line-96 mutants: `<→<=` and `>→>=`) ──────────

    #[test]
    fn validate_score_zero_is_valid() {
        // Kills `score < 0.0` → `score <= 0.0`
        let mut r = valid_result();
        r.score = 0.0;
        assert!(r.validate().is_ok(), "score 0.0 should be valid");
    }

    #[test]
    fn validate_score_max_is_valid() {
        // Kills `score > 10_000.0` → `score >= 10_000.0`
        let mut r = valid_result();
        r.score = 10_000.0;
        assert!(r.validate().is_ok(), "score 10000.0 should be valid");
    }

    #[test]
    fn validate_score_negative_fails() {
        let mut r = valid_result();
        r.score = -0.1;
        assert!(r.validate().is_err());
    }

    #[test]
    fn validate_score_over_max_fails() {
        let mut r = valid_result();
        r.score = 10_000.1;
        assert!(r.validate().is_err());
    }

    // ── Timestamp boundary (kills line-107 mutants: `>→==`, `>→>=`, `+→*`) ─

    #[test]
    fn validate_timestamp_far_future_fails() {
        // Kills `> → ==` (600 ≠ 300) and `+ → *` (now*300 >> any real ts)
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
        let mut r = valid_result();
        r.timestamp = now + 600;
        assert!(r.validate().is_err(), "timestamp 600 s in future must fail");
    }

    #[test]
    fn validate_timestamp_at_grace_boundary_is_valid() {
        // Kills `> → >=`: now+300 must pass (not strictly greater)
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
        let mut r = valid_result();
        r.timestamp = now + 300;
        assert!(r.validate().is_ok(), "timestamp at exactly now+300 should be valid");
    }

    // ── Category score boundary (kills line-118 mutants: `<→==`, `<→<=`, `>→>=`) ─

    #[test]
    fn validate_category_score_zero_is_valid() {
        // Kills `cat_score < 0.0` → `== 0.0` and `<= 0.0`
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
        let r = ManifestationResult {
            score: 5_000.0,
            timestamp: now,
            category_scores: std::collections::HashMap::from([("cat".to_string(), 0.0)]),
        };
        assert!(r.validate().is_ok(), "category score 0.0 should be valid");
    }

    #[test]
    fn validate_category_score_max_is_valid() {
        // Kills `cat_score > 10.0` → `>= 10.0`
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
        let r = ManifestationResult {
            score: 5_000.0,
            timestamp: now,
            category_scores: std::collections::HashMap::from([("cat".to_string(), 10.0)]),
        };
        assert!(r.validate().is_ok(), "category score 10.0 should be valid");
    }

    #[test]
    fn validate_category_score_negative_fails() {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
        let r = ManifestationResult {
            score: 5_000.0,
            timestamp: now,
            category_scores: std::collections::HashMap::from([("cat".to_string(), -0.1)]),
        };
        assert!(r.validate().is_err());
    }

    #[test]
    fn validate_category_score_over_max_fails() {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
        let r = ManifestationResult {
            score: 5_000.0,
            timestamp: now,
            category_scores: std::collections::HashMap::from([("cat".to_string(), 10.1)]),
        };
        assert!(r.validate().is_err());
    }

    #[test]
    fn validate_category_pii_at_sign_fails() {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
        let r = ManifestationResult {
            score: 5_000.0,
            timestamp: now,
            category_scores: std::collections::HashMap::from([("user@example.com".to_string(), 5.0)]),
        };
        assert!(r.validate().is_err());
    }

    #[test]
    fn validate_category_pii_http_fails() {
        let now = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs();
        let r = ManifestationResult {
            score: 5_000.0,
            timestamp: now,
            category_scores: std::collections::HashMap::from([("http://evil.com".to_string(), 5.0)]),
        };
        assert!(r.validate().is_err());
    }

    #[test]
    fn validate_fully_valid_result_passes() {
        assert!(valid_result().validate().is_ok());
    }
}
