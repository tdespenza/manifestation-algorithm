import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { ExportSession, ExportResponse } from '@/services/export';
import { generateCSV, exportToCSV } from '@/services/export';

// ── DB mock ──────────────────────────────────────────────────────────────────
const mocks = vi.hoisted(() => {
  const execute = vi.fn().mockResolvedValue([]);
  const select = vi.fn().mockResolvedValue([]);
  const load = vi.fn().mockResolvedValue({ execute, select });
  return { load, execute, select };
});

vi.mock('@tauri-apps/plugin-sql', () => ({
  default: { load: mocks.load },
}));

describe('Export Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.execute.mockResolvedValue([]);
    mocks.select.mockResolvedValue([]);
  });

  // ── generateCSV ──────────────────────────────────────────────────────────

  it('should generate correct CSV format', () => {
    const sessions: ExportSession[] = [
      { id: 's1', completed_at: '2023-01-01', total_score: 100, notes: 'Simple note' },
    ];
    const responses: ExportResponse[] = [
      { session_id: 's1', question_id: 'q1', category: 'Health', answer_value: 5 },
    ];

    const csv = generateCSV(sessions, responses);
    const lines = csv.split('\n');

    expect(lines[0]).toBe('SessionID,Date,TotalScore,Note,QuestionID,Category,ScaleValue');
    // s1,2023-01-01,100,"Simple note",q1,"Health",5
    expect(lines[1]).toContain('s1,2023-01-01,100,"Simple note",q1,"Health",5');
  });

  it('should handle commas and quotes in notes', () => {
    const sessions: ExportSession[] = [
      { id: 's2', completed_at: '2023-01-02', total_score: 50, notes: 'Hello, "World"' },
    ];
    const responses: ExportResponse[] = [
      { session_id: 's2', question_id: 'q1', category: 'Cat', answer_value: 1 },
    ];

    const csv = generateCSV(sessions, responses);
    const lines = csv.split('\n');

    // "Hello, ""World"""
    // Expected: s2,2023-01-02,50,"Hello, ""World""",q1,"Cat",1
    const expectedLine = 's2,2023-01-02,50,"Hello, ""World""",q1,"Cat",1';
    expect(lines[1]).toBe(expectedLine);
  });

  it('generates header only when no matching responses', () => {
    const sessions: ExportSession[] = [{ id: 's1', completed_at: '2023-01-01', total_score: 100 }];
    const responses: ExportResponse[] = [
      { session_id: 'UNKNOWN', question_id: 'q1', category: 'Cat', answer_value: 1 },
    ];

    const csv = generateCSV(sessions, responses);
    const lines = csv.split('\n');
    expect(lines).toHaveLength(1); // Only header
  });

  it('generates CSV without note when notes is undefined', () => {
    const sessions: ExportSession[] = [{ id: 's1', completed_at: '2023-01-01', total_score: 200 }];
    const responses: ExportResponse[] = [
      { session_id: 's1', question_id: 'q2', category: 'Focus', answer_value: 9 },
    ];

    const csv = generateCSV(sessions, responses);
    const lines = csv.split('\n');
    // Note column should be empty
    expect(lines[1]).toContain('s1,2023-01-01,200,,q2,"Focus",9');
  });

  // ── exportToCSV ──────────────────────────────────────────────────────────

  it('exportToCSV throws when no sessions exist', async () => {
    mocks.select.mockImplementation((query: string) => {
      if (query.includes('_migrations')) return Promise.resolve([{ id: 1 }, { id: 2 }, { id: 3 }]);
      // No sessions
      return Promise.resolve([]);
    });

    await expect(exportToCSV()).rejects.toThrow('No data to export');
  });

  it('exportToCSV creates download link and triggers click', async () => {
    const sessions: ExportSession[] = [
      { id: 's1', completed_at: '2023-06-15T12:00:00.000Z', total_score: 5000 },
    ];
    const responses: ExportResponse[] = [
      { session_id: 's1', question_id: 'q1', category: 'Health', answer_value: 8 },
    ];

    mocks.select.mockImplementation((query: string) => {
      if (query.includes('_migrations')) return Promise.resolve([{ id: 1 }, { id: 2 }, { id: 3 }]);
      if (query.includes('historical_sessions')) return Promise.resolve(sessions);
      if (query.includes('historical_responses')) return Promise.resolve(responses);
      return Promise.resolve([]);
    });

    // Mock DOM APIs
    const mockClick = vi.fn();
    const mockAppend = vi.spyOn(document.body, 'appendChild').mockImplementation(el => el);
    const mockRemove = vi.spyOn(document.body, 'removeChild').mockImplementation(el => el);
    const mockCreateObjectURL = vi.fn().mockReturnValue('blob:test');
    const mockCreateElement = vi.spyOn(document, 'createElement').mockReturnValue({
      setAttribute: vi.fn(),
      style: {},
      click: mockClick,
    } as unknown as HTMLElement);
    global.URL.createObjectURL = mockCreateObjectURL;

    await exportToCSV();

    expect(mockClick).toHaveBeenCalled();
    expect(mockAppend).toHaveBeenCalled();
    expect(mockRemove).toHaveBeenCalled();

    mockAppend.mockRestore();
    mockRemove.mockRestore();
    mockCreateElement.mockRestore();
  });
});
