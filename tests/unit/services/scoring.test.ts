import { describe, it, expect } from 'vitest';
import { calculateScore, getMaxPossibleScore } from '@/services/scoring';
import { questions } from '@/data/questions';

describe('Score Calculation Engine', () => {
  it('should calculate specific score for a single question', () => {
    // Fill all questions to baseline 1, then override Q2 to 5
    const answers: Record<string, number> = {};
    const fill = (q: any) => { if (q.subPoints) q.subPoints.forEach(fill); else answers[q.id] = 1; };
    questions.forEach(fill);
    const baseline = calculateScore({ ...answers });
    answers['2'] = 5; // Q2 = 100 pts: (5-1)/10 * 100 = +40 pts over baseline
    expect(calculateScore(answers) - baseline).toBeCloseTo(40);
  });

  it('should calculate minimum score (1 everywhere)', () => {
    // 1 everywhere means 10% of total points
    // If total points is roughly 10,000, score should be ~1,000
    const answers: Record<string, number> = {};
    const fillAnswers = (q: any) => {
      if (q.subPoints) {
        q.subPoints.forEach(fillAnswers);
      } else {
        answers[q.id] = 1;
      }
    };
    questions.forEach(fillAnswers);
    
    // We expect 10% of max score
    const max = getMaxPossibleScore();
    const result = calculateScore(answers);
    
    expect(result).toBeCloseTo(max * 0.1);
  });

  it('should calculate maximum score (10 everywhere)', () => {
    const answers: Record<string, number> = {};
    const fillAnswers = (q: any) => {
      if (q.subPoints) {
        q.subPoints.forEach(fillAnswers);
      } else {
        answers[q.id] = 10;
      }
    };
    questions.forEach(fillAnswers);
    
    const result = calculateScore(answers);
    const max = getMaxPossibleScore();
    
    expect(result).toBe(max);
  });

  it('should default missing answers to minimum rating (1)', () => {
    // No answers → all default to 1 → 10% of max score
    const max = getMaxPossibleScore();
    const score = calculateScore({});
    expect(score).toBeCloseTo(max * 0.1);
  });

  it('should verify total max points matches expectation (approx 10,000)', () => {
    const max = getMaxPossibleScore();
    console.log('Total Max Score:', max);
    // Due to the Q23 50 point discrepancy, we expect 9950 or close to 10000
    // If we used my manual sum calculation (1350 for Q23), let's see.
    expect(max).toBeGreaterThan(9900);
    expect(max).toBeLessThanOrEqual(10200);
  });
  
  it('should process sub-questions correctly (Q1)', () => {
    // Fill all answers to 1, then set Q1 sub-questions to 10
    const answers: Record<string, number> = {};
    const fill = (q: any) => { if (q.subPoints) q.subPoints.forEach(fill); else answers[q.id] = 1; };
    questions.forEach(fill);
    const baseline = calculateScore({ ...answers });
    answers['1a'] = 10; // 25 pts each
    answers['1b'] = 10;
    answers['1c'] = 10;
    answers['1d'] = 10;
    // Going from 1→10 for 4 questions of 25pts each: delta = 4 * 25 * (9/10) = 90
    expect(calculateScore(answers) - baseline).toBeCloseTo(90);
  });
});
