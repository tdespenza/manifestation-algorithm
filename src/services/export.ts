// src/services/export.ts
import { getDb } from './db';

// Interfaces ensuring type safety
export interface ExportSession {
  id: string;
  completed_at: string;
  total_score: number;
  notes?: string;
}

export interface ExportResponse {
  session_id: string;
  question_id: string;
  category: string;
  answer_value: number;
}

/**
 * Pure function to generate CSV content from data arrays.
 * Testable without DB.
 */
export function generateCSV(sessions: ExportSession[], responses: ExportResponse[]): string {
  // Columns: SessionID, Date, TotalScore, Note, QuestionID, Category, ScaleValue
  const header = [
    'SessionID',
    'Date',
    'TotalScore',
    'Note',
    'QuestionID',
    'Category',
    'ScaleValue'
  ].join(',');
  const rows: string[] = [header];

  const sessionMap = new Map(sessions.map(s => [s.id, s]));

  for (const r of responses) {
    const s = sessionMap.get(r.session_id);
    if (!s) continue;

    // Sanitize note
    const note = s.notes ? `"${s.notes.replaceAll('"', '""')}"` : '';

    const row = [
      s.id,
      s.completed_at,
      s.total_score,
      note,
      r.question_id,
      `"${r.category.replaceAll('"', '""')}"`, // Handle quotes in category
      r.answer_value
    ].join(',');

    rows.push(row);
  }

  return rows.join('\n');
}

export async function exportToCSV(): Promise<void> {
  const db = await getDb();

  // 1. Fetch sessions
  const sessions = await db.select<ExportSession[]>(
    'SELECT id, completed_at, total_score, notes FROM historical_sessions ORDER BY completed_at DESC'
  );

  if (sessions.length === 0) {
    throw new Error('No data to export');
  }

  // 2. Fetch responses
  const responses = await db.select<ExportResponse[]>(
    'SELECT session_id, question_id, category, answer_value FROM historical_responses'
  );

  // 3. Generate content
  const csvContent = generateCSV(sessions, responses);

  // 4. Create Blob
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // 5. Download
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  // Create filename with date range
  const dates = sessions.map(s => new Date(s.completed_at).getTime());
  const minDate = new Date(Math.min(...dates)).toISOString().split('T')[0];
  const maxDate = new Date(Math.max(...dates)).toISOString().split('T')[0];

  link.setAttribute('href', url);
  link.setAttribute('download', `manifestation_export_${minDate}_to_${maxDate}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  link.remove();
}
