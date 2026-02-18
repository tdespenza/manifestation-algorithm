import { describe, it, expect } from 'vitest';
import { calculateScore, getMaxPossibleScore } from './scoring';
import { questions } from '../data/questions';

describe('Score Calculation Engine', () => {
  it('should calculate specific score for a single question', () => {
    // Q2 is 100 points
    const answers = { '2': 5 }; // 50% score
    const score = calculateScore(answers);
    expect(score).toBe(50);
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

  it('should handle missing answers as 0 points', () => {
    // Only answer Q2 (100 pts) with 10 -> 100 pts
    // Leave Q3 (250 pts) blank
    const answers = { '2': 10 };
    const score = calculateScore(answers);
    expect(score).toBe(100);
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
    const answers = {
      '1a': 10, // 25
      '1b': 10, // 25
      '1c': 10, // 25
      '1d': 10, // 25
    };
    // Total should be 100
    expect(calculateScore(answers)).toBe(100);
  });
});
