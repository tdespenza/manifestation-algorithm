export interface Question {
  id: string; // e.g., '1', '1a'
  points: number;
  description: string;
  hasSubPoints: boolean;
  subPoints?: Question[];
  category?: string; // e.g. "Core Vibration"
}

export interface AnswerSheet {
  [questionId: string]: number; // 1-10
}

export interface HistoricalSession {
  id: string; // UUID
  completed_at: string; // ISO string
  total_score: number;
  duration_seconds: number;
  notes?: string;
}

export interface HistoricalResponse {
  id: number;
  session_id: string; // UUID from HistoricalSession
  question_id: string;
  category: string;
  answer_value: number;
}
