import { describe, it, expect } from 'vitest';
import { generateCSV, ExportSession, ExportResponse } from './export';

describe('Export Service', () => {
  it('should generate correct CSV format', () => {
    const sessions: ExportSession[] = [
      { id: 's1', completed_at: '2023-01-01', total_score: 100, notes: 'Simple note' }
    ];
    const responses: ExportResponse[] = [
      { session_id: 's1', question_id: 'q1', category: 'Health', answer_value: 5 }
    ];

    const csv = generateCSV(sessions, responses);
    const lines = csv.split('\n');

    expect(lines[0]).toBe('SessionID,Date,TotalScore,Note,QuestionID,Category,ScaleValue');
    // s1,2023-01-01,100,"Simple note",q1,"Health",5
    expect(lines[1]).toContain('s1,2023-01-01,100,"Simple note",q1,"Health",5');
  });

  it('should handle commas and quotes in notes', () => {
    const sessions: ExportSession[] = [
      { id: 's2', completed_at: '2023-01-02', total_score: 50, notes: 'Hello, "World"' }
    ];
    const responses: ExportResponse[] = [
      { session_id: 's2', question_id: 'q1', category: 'Cat', answer_value: 1 }
    ];

    const csv = generateCSV(sessions, responses);
    const lines = csv.split('\n');
    
    // "Hello, ""World"""
    // Expected: s2,2023-01-02,50,"Hello, ""World""",q1,"Cat",1
    const expectedLine = 's2,2023-01-02,50,"Hello, ""World""",q1,"Cat",1';
    expect(lines[1]).toBe(expectedLine);
  });
});
