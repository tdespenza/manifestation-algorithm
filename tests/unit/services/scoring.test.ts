import { describe, it, expect } from 'vitest';
import { calculateScore, getMaxPossibleScore } from '@/services/scoring';
import { questions } from '@/data/questions';

function buildBaseline(rating: number): Record<string, number> {
  const answers: Record<string, number> = {};
  const fill = (q: any) => {
    if (q.subPoints) q.subPoints.forEach(fill);
    else answers[q.id] = rating;
  };
  questions.forEach(fill);
  return answers;
}

describe('Score Calculation Engine', () => {
  it('should calculate specific score for a single question', () => {
    const answers = buildBaseline(0);
    const baseline = calculateScore({ ...answers });
    answers['2'] = 5; // Q2 = 100 pts: (5-0)/10 * 100 = +50 pts over baseline
    expect(calculateScore(answers) - baseline).toBeCloseTo(50);
  });

  it('should calculate minimum score (0 everywhere)', () => {
    const result = calculateScore(buildBaseline(0));
    expect(result).toBe(0);
  });

  it('should calculate maximum score (10 everywhere)', () => {
    const result = calculateScore(buildBaseline(10));
    expect(result).toBe(10000);
  });

  it('should default missing answers to minimum rating (0)', () => {
    // No answers → all default to 0 → min score = 0
    const score = calculateScore({});
    expect(score).toBe(0);
  });

  it('should verify total max points is exactly 10,000', () => {
    const max = getMaxPossibleScore();
    expect(max).toBe(10000);
  });

  it('should process sub-questions correctly (Q1)', () => {
    const answers = buildBaseline(0);
    const baseline = calculateScore({ ...answers });
    answers['1a'] = 10; // 25 pts each
    answers['1b'] = 10;
    answers['1c'] = 10;
    answers['1d'] = 10;
    // Going from 0→10 for 4 questions of 25pts each: delta = 4 * 25 = 100
    expect(calculateScore(answers) - baseline).toBeCloseTo(100);
  });

  it('clamps ratings below 0 and above 10 to valid bounds', () => {
    const answers = buildBaseline(0);
    const baseline = calculateScore({ ...answers });

    // Q2 has 100 points
    answers['2'] = -1;
    expect(calculateScore(answers) - baseline).toBeCloseTo(0);

    answers['2'] = 999;
    // 0 -> 10 on a 100-point question gives +100
    expect(calculateScore(answers) - baseline).toBeCloseTo(100);
  });

  it('supports decimal ratings within range', () => {
    const answers = buildBaseline(0);
    const baseline = calculateScore({ ...answers });
    answers['2'] = 7.5;
    // Q2=100: 0 -> 7.5 gives +75
    expect(calculateScore(answers) - baseline).toBeCloseTo(75);
  });
});
