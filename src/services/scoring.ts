import type { Question, AnswerSheet } from '../types';
import { questions } from '../data/questions';

/**
 * Calculates the total manifestation score based on user answers.
 * Formula: Sum of (QuestionPoints * (UserRating / 10))
 *
 * @param answers Map of question ID to user rating (1-10)
 * @returns Total calculated score (float)
 */
export function calculateScore(answers: AnswerSheet): number {
  let totalScore = 0;

  const processQuestion = (q: Question) => {
    const subPoints = Array.isArray(q.subPoints) ? q.subPoints : [];
    if (subPoints.length > 0) {
      subPoints.forEach(processQuestion);
      return;
    }

    const rawRating = answers[q.id];
    const numericRating = typeof rawRating === 'number' ? rawRating : 1;
    const rating = Math.min(10, Math.max(1, numericRating));
    totalScore += q.points * (rating / 10);
  };

  questions.forEach(processQuestion);

  // Return with 2 decimal precision logic if needed, but keeping raw number is better for precision.
  // The PRD asks for "Decimal precision: 2 places (e.g., 7,234.56)" in display.
  // We'll return the raw number here.
  return totalScore;
}

/**
 * Validates the answer sheet and returns missing required questions?
 * Or just helper to get max possible score.
 */
export function getMaxPossibleScore(): number {
  // Should be 10,000 (or slightly less due to Q23 mismatch)
  // Let's implement it to verify
  const maxAnswers: AnswerSheet = {};

  const collectIds = (q: Question) => {
    const subPoints = Array.isArray(q.subPoints) ? q.subPoints : [];
    if (subPoints.length > 0) {
      subPoints.forEach(collectIds);
      return;
    }

    maxAnswers[q.id] = 10;
  };

  questions.forEach(collectIds);
  return calculateScore(maxAnswers);
}
