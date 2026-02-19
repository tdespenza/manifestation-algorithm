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
    // If a question has sub-points, we score the sub-points instead
    // The parent container itself does not have a user rating
    if (q.hasSubPoints && q.subPoints && q.subPoints.length > 0) {
      q.subPoints.forEach(processQuestion);
    } else {
      // Direct question or sub-question leaf
      const rating = answers[q.id];

      // If unanswered, default to 1 as specified
      if (typeof rating === 'number' && rating >= 1 && rating <= 10) {
        totalScore += q.points * (rating / 10);
      } else {
        // Default: 1 point (min rating)
        totalScore += q.points * (1 / 10);
      }
    }
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
    if (q.hasSubPoints && q.subPoints) {
      q.subPoints.forEach(collectIds);
    } else {
      maxAnswers[q.id] = 10;
    }
  };

  questions.forEach(collectIds);
  return calculateScore(maxAnswers);
}
