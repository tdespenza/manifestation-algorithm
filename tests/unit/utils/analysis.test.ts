import { describe, it, expect } from 'vitest';
import { detectTrend } from '@/utils/analysis';

describe('detectTrend', () => {
  it('returns "insufficient" when array has fewer than 3 items', () => {
    expect(detectTrend([])).toBe('insufficient');
    expect(detectTrend([5])).toBe('insufficient');
    expect(detectTrend([5, 6])).toBe('insufficient');
  });

  it('returns "improving" when slope > 0.05 (consistently rising data)', () => {
    const improving = [1, 2, 3, 4, 5, 6, 7];
    expect(detectTrend(improving)).toBe('improving');
  });

  it('returns "declining" when slope < -0.05 (consistently falling data)', () => {
    const declining = [7, 6, 5, 4, 3, 2, 1];
    expect(detectTrend(declining)).toBe('declining');
  });

  it('returns "stable" when slope is near zero (flat data)', () => {
    const stable = [5, 5, 5, 5, 5, 5, 5];
    expect(detectTrend(stable)).toBe('stable');
  });

  it('returns "stable" for very small positive slope below threshold', () => {
    // Values oscillate very slightly – slope well within ±0.05
    const nearFlat = [5.01, 5.00, 5.02, 5.01, 5.00, 5.01];
    expect(detectTrend(nearFlat)).toBe('stable');
  });

  it('uses only the last 7 points for long arrays', () => {
    // First part is declining, last 7 are sharply improving
    const data = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 2, 3, 4, 5, 6, 7, 8];
    expect(detectTrend(data)).toBe('improving');
  });

  it('returns "improving" for exactly 3 items with upward trend', () => {
    expect(detectTrend([1, 5, 10])).toBe('improving');
  });

  it('returns "declining" for exactly 3 items with downward trend', () => {
    expect(detectTrend([10, 5, 1])).toBe('declining');
  });
});
