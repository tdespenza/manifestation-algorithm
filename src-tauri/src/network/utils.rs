/// Calculate the given percentile from an unsorted slice of f64 scores.
/// Returns `None` if the slice is empty.
pub fn calculate_percentile(scores: &[f64], percentile: f64) -> Option<f64> {
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

    #[test]
    fn test_percentile_calculation() {
        let scores = vec![10.0, 20.0, 30.0, 40.0, 50.0, 60.0, 70.0, 80.0, 90.0, 100.0];
        assert_eq!(calculate_percentile(&scores, 0.9), Some(100.0));

        let scores2 = vec![1.0, 2.0, 3.0, 4.0, 5.0];
        assert_eq!(calculate_percentile(&scores2, 0.9), Some(5.0));

        let scores3 = vec![1.0, 3.0, 5.0];
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
        assert_eq!(calculate_percentile(&scores, 0.9), Some(50.0));
    }

    #[test]
    fn test_ordering_resilience() {
        let ordered  = vec![10.0, 20.0, 30.0, 40.0, 50.0];
        let reversed = vec![50.0, 40.0, 30.0, 20.0, 10.0];
        let shuffled = vec![30.0, 10.0, 50.0, 40.0, 20.0];

        let p50_ord = calculate_percentile(&ordered,  0.5);
        let p50_rev = calculate_percentile(&reversed, 0.5);
        let p50_shu = calculate_percentile(&shuffled, 0.5);

        assert_eq!(p50_ord, p50_rev);
        assert_eq!(p50_ord, p50_shu);
    }
}
