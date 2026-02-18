export interface Question {
  id: string; // e.g., '1', '1a'
  points: number;
  description: string;
  hasSubPoints: boolean;
  subPoints?: Question[];
}

export interface AnswerSheet {
  [questionId: string]: number; // 1-10
}
