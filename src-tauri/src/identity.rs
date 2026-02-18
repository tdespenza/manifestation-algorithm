use ed25519_dalek::{SigningKey, VerifyingKey, Signer, Signature, Verifier};
use rand::rngs::OsRng;
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
        use std::io::Write;
        let id = UserIdentity::generate();
        let pk = id.public_key_b64();

        // Serialize to a temp buffer, deserialize, and confirm same key
        let json = serde_json::to_string(&id).unwrap();
        let id2: UserIdentity = serde_json::from_str(&json).unwrap();
        assert_eq!(pk, id2.public_key_b64());
    }
}
