pub mod node;
pub mod types;
pub mod utils;

pub use node::PeerNode;
pub use types::{Command, ManifestationResult, SignedManifestation};

#[cfg(test)]
mod tests {
    use super::types::ManifestationResult;
    use super::types::SignedManifestation;
    use super::utils::calculate_percentile;

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

    // ── Validation ────────────────────────────────────────────────────────────

    #[test]
    fn test_validate_accepts_valid_result() {
        let r = make_result(7500.0, vec![("focus", 8.0), ("gratitude", 6.0)]);
        assert!(r.validate().is_ok());
    }

    #[test]
    fn test_validate_rejects_score_above_range() {
        let r = make_result(10_001.0, vec![]);
        assert!(r.validate().is_err());
    }

    #[test]
    fn test_validate_rejects_negative_score() {
        let r = make_result(-1.0, vec![]);
        assert!(r.validate().is_err());
    }

    #[test]
    fn test_validate_rejects_category_score_above_10() {
        let r = make_result(5000.0, vec![("focus", 11.0)]);
        assert!(r.validate().is_err());
    }

    // ── PII / Anonymity validation ────────────────────────────────────────────

    #[test]
    fn test_validate_rejects_email_in_category_key() {
        let r = make_result(50.0, vec![("user@example.com", 7.5)]);
        let err = r.validate().unwrap_err();
        assert!(err.contains("PII"), "Expected PII error, got: {}", err);
    }

    #[test]
    fn test_validate_rejects_url_in_category_key() {
        let r = make_result(50.0, vec![("http://profile.example.com", 7.5)]);
        let err = r.validate().unwrap_err();
        assert!(err.contains("PII"), "Expected PII error, got: {}", err);
    }

    #[test]
    fn test_validate_rejects_https_in_category_key() {
        let r = make_result(50.0, vec![("https://user-profile.net", 6.0)]);
        let err = r.validate().unwrap_err();
        assert!(err.contains("PII"), "Expected PII error, got: {}", err);
    }

    #[test]
    fn test_validate_accepts_normal_category_keys() {
        let r = make_result(5000.0, vec![
            ("meditation", 8.0),
            ("gratitude_practice", 7.0),
            ("focus-level", 9.0),
        ]);
        assert!(r.validate().is_ok());
    }

    // ── Signature / anonymity ─────────────────────────────────────────────────

    #[test]
    fn test_signed_manifestation_verifies_correctly() {
        let identity = crate::identity::UserIdentity::generate();
        let payload = make_result(6000.0, vec![("clarity", 5.5)]);
        let signed = SignedManifestation::new(payload, &identity)
            .expect("signing should succeed");
        assert!(signed.verify(), "Signature should verify with matching key");
    }

    #[test]
    fn test_signed_manifestation_rejects_tampered_payload() {
        let identity = crate::identity::UserIdentity::generate();
        let payload = make_result(6000.0, vec![("clarity", 5.5)]);
        let mut signed = SignedManifestation::new(payload, &identity)
            .expect("signing should succeed");
        signed.payload.score = 9999.9;
        assert!(!signed.verify(), "Signature should NOT verify after tampering");
    }

    #[test]
    fn test_signed_manifestation_public_key_format() {
        let identity = crate::identity::UserIdentity::generate();
        let payload = make_result(50.0, vec![]);
        let signed = SignedManifestation::new(payload, &identity).unwrap();

        assert!(!signed.public_key.contains('@'));
        assert!(!signed.public_key.contains("http"));
        assert!(!signed.public_key.contains(' '));
        assert_eq!(signed.public_key.len(), 44,
            "Ed25519 public key b64 should be 44 chars, got {}", signed.public_key.len());
    }

    // ── CID generation ────────────────────────────────────────────────────────

    #[test]
    fn test_cid_generation_is_deterministic() {
        let r = make_result(7500.0, vec![("focus", 8.0)]);
        let cid1 = r.get_cid().expect("CID generation failed");
        let cid2 = r.get_cid().expect("CID generation failed");
        assert_eq!(cid1, cid2);
    }

    #[test]
    fn test_cid_changes_when_payload_changes() {
        let r1 = make_result(7500.0, vec![("focus", 8.0)]);
        let r2 = make_result(7600.0, vec![("focus", 8.0)]);
        assert_ne!(r1.get_cid().unwrap(), r2.get_cid().unwrap());
    }

    // ── Percentile (integration — also tested in utils module) ───────────────

    #[test]
    fn test_percentile_empty() {
        assert_eq!(calculate_percentile(&[], 0.9), None);
    }

    #[test]
    fn test_percentile_single_element() {
        assert_eq!(calculate_percentile(&[42.0], 0.9), Some(42.0));
    }
}
