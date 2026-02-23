// src/services/export.ts
import { getDb } from './db';
import { save } from '@tauri-apps/plugin-dialog';
import { writeTextFile } from '@tauri-apps/plugin-fs';

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
      `"${(r.category || '').replaceAll('"', '""')}"`, // Handle quotes in category
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

  // Create filename with date range
  const dates = sessions.map(s => new Date(s.completed_at).getTime());
  const minDate = new Date(Math.min(...dates)).toISOString().split('T')[0];
  const maxDate = new Date(Math.max(...dates)).toISOString().split('T')[0];
  const defaultFilename = `manifestation_export_${minDate}_to_${maxDate}.csv`;

  // 4. Save file
  // Check if running in Tauri environment
  // @ts-expect-error - Tauri injects this
  const isTauri = typeof window !== 'undefined' && !!window.__TAURI_INTERNALS__;

  if (isTauri) {
    try {
      const filePath = await save({
        filters: [{ name: 'CSV', extensions: ['csv'] }],
        defaultPath: defaultFilename
      });

      if (filePath) {
        await writeTextFile(filePath, csvContent);
      }
    } catch (error) {
      console.error('Tauri export failed, falling back to browser download:', error);
      downloadBrowser(csvContent, defaultFilename);
    }
  } else {
    downloadBrowser(csvContent, defaultFilename);
  }
}

function downloadBrowser(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
