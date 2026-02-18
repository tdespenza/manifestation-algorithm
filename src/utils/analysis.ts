export type TrendDirection = 'improving' | 'stable' | 'declining' | 'insufficient';

/**
 * Detects the trend of a series of numbers.
 * Uses a simple linear regression slope or comparison of averages.
 * @param data Array of numbers (chronological order)
 * @returns 'improving' | 'stable' | 'declining' | 'insufficient'
 */
export function detectTrend(data: number[]): TrendDirection {
  if (data.length < 3) return 'insufficient';

  // Use the last 7 points or less
  const recentData = data.slice(-7);
  
  if (recentData.length < 2) return 'insufficient';

  // Simple linear regression to find slope
  const n = recentData.length;
  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  for (let i = 0; i < n; i++) {
    sumX += i;
    sumY += recentData[i];
    sumXY += i * recentData[i];
    sumXX += i * i;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);

  // Threshold for stability (e.g., slope very close to 0)
  const threshold = 0.05;

  if (slope > threshold) return 'improving';
  if (slope < -threshold) return 'declining';
  return 'stable';
}
