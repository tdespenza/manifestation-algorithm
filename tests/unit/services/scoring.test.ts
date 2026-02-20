import { describe, it, expect } from 'vitest';
import { calculateScore, getMaxPossibleScore } from '@/services/scoring';
import { questions } from '@/data/questions';

describe('Score Calculation Engine', () => {
  it('should calculate specific score for a single question', () => {
    // Fill all questions to baseline 1, then override Q2 to 5
    const answers: Record<string, number> = {};
    const fill = (q: any) => {
      if (q.subPoints) q.subPoints.forEach(fill);
      else answers[q.id] = 1;
    };
    questions.forEach(fill);
    const baseline = calculateScore({ ...answers });
    answers['2'] = 5; // Q2 = 100 pts: (5-1)/10 * 100 = +40 pts over baseline
    expect(calculateScore(answers) - baseline).toBeCloseTo(40);
  });

  it('should calculate minimum score (1 everywhere)', () => {
    // rating=1 everywhere → 10% of total points = 1,000
    const answers: Record<string, number> = {};
    const fillAnswers = (q: any) => {
      if (q.subPoints) {
        q.subPoints.forEach(fillAnswers);
      } else {
        answers[q.id] = 1;
      }
    };
    questions.forEach(fillAnswers);

    const result = calculateScore(answers);
    expect(result).toBe(1000);
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
    expect(result).toBe(10000);
  });

  it('should default missing answers to minimum rating (1)', () => {
    // No answers → all default to 1 → min score = 1,000
    const score = calculateScore({});
    expect(score).toBe(1000);
  });

  it('should verify total max points is exactly 10,000', () => {
    const max = getMaxPossibleScore();
    expect(max).toBe(10000);
  });

  it('should process sub-questions correctly (Q1)', () => {
    // Fill all answers to 1, then set Q1 sub-questions to 10
    const answers: Record<string, number> = {};
    const fill = (q: any) => {
      if (q.subPoints) q.subPoints.forEach(fill);
      else answers[q.id] = 1;
    };
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
