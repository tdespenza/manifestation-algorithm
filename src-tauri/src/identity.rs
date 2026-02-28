use ed25519_dalek::{SigningKey, VerifyingKey, Signer, Signature, Verifier};
use rand_core::OsRng;
use std::path::Path;
use base64::{Engine as _, engine::general_purpose::STANDARD as BASE64};
use serde::{Deserialize, Serialize};

/// Represents the user's pseudonymous/anonymous cryptographic identity.
/// Saved to disk to provide stable identity across sessions.
#[derive(Serialize, Deserialize, Clone)]
pub struct UserIdentity {
    /// Raw 32-byte Ed25519 secret key bytes (base64-encoded in JSON)
    #[serde(with = "base64_bytes")]
    secret_bytes: Vec<u8>,
}

mod base64_bytes {
    use base64::{Engine as _, engine::general_purpose::STANDARD as BASE64};
    use serde::{Deserialize, Deserializer, Serializer};

    pub fn serialize<S: Serializer>(bytes: &Vec<u8>, s: S) -> Result<S::Ok, S::Error> {
        s.serialize_str(&BASE64.encode(bytes))
    }

    pub fn deserialize<'de, D: Deserializer<'de>>(d: D) -> Result<Vec<u8>, D::Error> {
        let s = String::deserialize(d)?;
        BASE64.decode(&s).map_err(serde::de::Error::custom)
    }
}

impl UserIdentity {
    /// Generate a fresh random Ed25519 identity
    pub fn generate() -> Self {
        let mut csprng = OsRng;
        let keypair = SigningKey::generate(&mut csprng);
        Self {
            secret_bytes: keypair.to_bytes().to_vec(),
        }
    }

    /// Load from disk or create a new identity if the file does not exist
    pub fn load_or_create<P: AsRef<Path>>(path: P) -> std::io::Result<Self> {
        if path.as_ref().exists() {
            let file = std::fs::File::open(&path)?;
            serde_json::from_reader(file)
                .map_err(|e| std::io::Error::new(std::io::ErrorKind::InvalidData, e))
        } else {
            let identity = Self::generate();
            if let Some(parent) = path.as_ref().parent() {
                std::fs::create_dir_all(parent)?;
            }
            let file = std::fs::File::create(&path)?;
            serde_json::to_writer(file, &identity)
                .map_err(|e| std::io::Error::new(std::io::ErrorKind::Other, e))?;
            // Restrict permissions to owner-only (rw-------) on Unix
            #[cfg(unix)]
            {
                use std::os::unix::fs::PermissionsExt;
                if let Err(e) = std::fs::set_permissions(&path, std::fs::Permissions::from_mode(0o600)) {
                    eprintln!("Failed to set permissions: {}", e);
                }
            }
            Ok(identity)
        }
    }

    fn signing_key(&self) -> SigningKey {
        let bytes: [u8; 32] = self.secret_bytes.as_slice().try_into()
            .expect("secret key must be 32 bytes");
        SigningKey::from_bytes(&bytes)
    }

    /// Sign arbitrary bytes; returns a detached signature
    pub fn sign(&self, message: &[u8]) -> Signature {
        self.signing_key().sign(message)
    }

    /// Ed25519 public key for this identity
    pub fn verifying_key(&self) -> VerifyingKey {
        self.signing_key().verifying_key()
    }

    /// Base64-encoded public key string for embedding in messages
    pub fn public_key_b64(&self) -> String {
        BASE64.encode(self.verifying_key().as_bytes())
    }

    /// Verify a (message, signature, public_key) tuple — purely static, no self needed
    pub fn verify(message: &[u8], signature_b64: &str, public_key_b64: &str) -> bool {
        let Ok(pub_bytes) = BASE64.decode(public_key_b64) else { return false; };
        let Ok(sig_bytes) = BASE64.decode(signature_b64) else { return false; };
        let Ok(pub_arr) = <[u8; 32]>::try_from(pub_bytes.as_slice()) else { return false; };
        let Ok(sig_arr) = <[u8; 64]>::try_from(sig_bytes.as_slice()) else { return false; };
        let Ok(vk)  = VerifyingKey::from_bytes(&pub_arr) else { return false; };
        let sig = Signature::from_bytes(&sig_arr);
        vk.verify(message, &sig).is_ok()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_sign_and_verify() {
        let id = UserIdentity::generate();
        let msg = b"hello world";
        let sig = id.sign(msg);
        let sig_b64 = BASE64.encode(sig.to_bytes());
        let pk_b64 = id.public_key_b64();

        assert!(UserIdentity::verify(msg, &sig_b64, &pk_b64));
        assert!(!UserIdentity::verify(b"tampered", &sig_b64, &pk_b64));
    }

    #[test]
    fn test_serialization_roundtrip() {
        let id = UserIdentity::generate();
        let pk = id.public_key_b64();

        // Serialize to a temp buffer, deserialize, and confirm same key
        let json = serde_json::to_string(&id).unwrap();
        let id2: UserIdentity = serde_json::from_str(&json).unwrap();
        assert_eq!(pk, id2.public_key_b64());
    }

    // ── Security edge-cases ───────────────────────────────────────────────────

    #[test]
    fn test_verify_rejects_malformed_base64_signature() {
        let id = UserIdentity::generate();
        let msg = b"test message";
        let pk_b64 = id.public_key_b64();
        // Garbage / non-base64 data
        assert!(!UserIdentity::verify(msg, "!!!not-base64!!!", &pk_b64));
        assert!(!UserIdentity::verify(msg, "", &pk_b64));
    }

    #[test]
    fn test_verify_rejects_malformed_base64_public_key() {
        let id = UserIdentity::generate();
        let msg = b"test message";
        let sig = id.sign(msg);
        let sig_b64 = BASE64.encode(sig.to_bytes());
        assert!(!UserIdentity::verify(msg, &sig_b64, "!!!invalid-pubkey!!!"));
        assert!(!UserIdentity::verify(msg, &sig_b64, ""));
    }

    #[test]
    fn test_verify_rejects_wrong_length_public_key() {
        let id = UserIdentity::generate();
        let msg = b"test";
        let sig = id.sign(msg);
        let sig_b64 = BASE64.encode(sig.to_bytes());
        // 31 bytes instead of 32 — should fail
        let short_key = BASE64.encode(&[0u8; 31]);
        assert!(!UserIdentity::verify(msg, &sig_b64, &short_key));
        // 33 bytes
        let long_key = BASE64.encode(&[0u8; 33]);
        assert!(!UserIdentity::verify(msg, &sig_b64, &long_key));
    }

    #[test]
    fn test_verify_rejects_signature_from_different_key() {
        let id_a = UserIdentity::generate();
        let id_b = UserIdentity::generate();
        let msg = b"cross-signing test";
        let sig_a = id_a.sign(msg);
        let sig_a_b64 = BASE64.encode(sig_a.to_bytes());
        // Use key B's public key to verify key A's signature — must fail
        assert!(!UserIdentity::verify(msg, &sig_a_b64, &id_b.public_key_b64()));
    }

    #[test]
    fn test_generate_produces_unique_keys() {
        let ids: Vec<String> = (0..10).map(|_| UserIdentity::generate().public_key_b64()).collect();
        let unique: std::collections::HashSet<&String> = ids.iter().collect();
        assert_eq!(unique.len(), 10, "10 generated identities should all have unique public keys");
    }

    #[test]
    fn test_public_key_is_44_chars_base64() {
        // Ed25519 public key = 32 bytes → base64 = ceil(32/3)*4 = 44 chars (no padding variance)
        let id = UserIdentity::generate();
        assert_eq!(id.public_key_b64().len(), 44);
    }

    #[test]
    fn test_public_key_contains_no_pii_patterns() {
        for _ in 0..20 {
            let pk = UserIdentity::generate().public_key_b64();
            assert!(!pk.contains('@'),   "public key must not contain '@'");
            assert!(!pk.contains("http"), "public key must not contain 'http'");
            assert!(!pk.contains(' '),   "public key must not contain spaces");
        }
    }

    #[test]
    fn test_load_or_create_persists_identity() {
        let unique = format!("test_identity_{}.json", std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map(|d| d.as_nanos())
            .unwrap_or(0));
        let path = std::env::temp_dir().join(unique);

        // First call: creates new identity
        let id1 = UserIdentity::load_or_create(&path).expect("load_or_create failed");
        let pk1 = id1.public_key_b64();

        // Second call: loads the same identity
        let id2 = UserIdentity::load_or_create(&path).expect("load_or_create reload failed");
        let pk2 = id2.public_key_b64();

        // Clean up
        let _ = std::fs::remove_file(&path);

        assert_eq!(pk1, pk2, "Identity must be stable across calls on the same file");
    }
}
