import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { ExportSession, ExportResponse } from '@/services/export';
import { generateCSV, exportToCSV } from '@/services/export';

vi.mock('@tauri-apps/plugin-dialog', () => ({
  save: vi.fn().mockResolvedValue('mock-path.csv')
}));

vi.mock('@tauri-apps/plugin-fs', () => ({
  writeTextFile: vi.fn().mockResolvedValue(undefined)
}));

// ── DB mock ──────────────────────────────────────────────────────────────────
const mocks = vi.hoisted(() => {
  const execute = vi.fn().mockResolvedValue([]);
  const select = vi.fn().mockResolvedValue([]);
  const load = vi.fn().mockResolvedValue({ execute, select });
  return { load, execute, select };
});

vi.mock('@tauri-apps/plugin-sql', () => ({
  default: { load: mocks.load }
}));

describe('Export Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.execute.mockResolvedValue([]);
    mocks.select.mockResolvedValue([]);
    // Simulate Tauri environment so exportToCSV uses save/writeTextFile path
    (window as unknown as Record<string, unknown>).__TAURI_INTERNALS__ = {};
  });

  afterEach(() => {
    delete (window as unknown as Record<string, unknown>).__TAURI_INTERNALS__;
  });

  // ── generateCSV ──────────────────────────────────────────────────────────

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

  it('generates header only when no matching responses', () => {
    const sessions: ExportSession[] = [{ id: 's1', completed_at: '2023-01-01', total_score: 100 }];
    const responses: ExportResponse[] = [
      { session_id: 'UNKNOWN', question_id: 'q1', category: 'Cat', answer_value: 1 }
    ];

    const csv = generateCSV(sessions, responses);
    const lines = csv.split('\n');
    expect(lines).toHaveLength(1); // Only header
  });

  it('generates CSV without note when notes is undefined', () => {
    const sessions: ExportSession[] = [{ id: 's1', completed_at: '2023-01-01', total_score: 200 }];
    const responses: ExportResponse[] = [
      { session_id: 's1', question_id: 'q2', category: 'Focus', answer_value: 9 }
    ];

    const csv = generateCSV(sessions, responses);
    const lines = csv.split('\n');
    // Note column should be empty
    expect(lines[1]).toContain('s1,2023-01-01,200,,q2,"Focus",9');
  });

  it('generateCSV handles empty/falsy category (covers || empty-string fallback)', () => {
    const sessions: ExportSession[] = [{ id: 's1', completed_at: '2023-01-01', total_score: 100 }];
    const responses: ExportResponse[] = [
      { session_id: 's1', question_id: 'q1', category: '' as any, answer_value: 3 }
    ];

    const csv = generateCSV(sessions, responses);
    const lines = csv.split('\n');
    // category is empty string, so the || '' fallback is used → generates `""`
    expect(lines[1]).toContain('"",3');
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

  it('exportToCSV does NOT call writeTextFile when dialog is cancelled (save returns null)', async () => {
    const { save } = await import('@tauri-apps/plugin-dialog');
    const { writeTextFile } = await import('@tauri-apps/plugin-fs');
    vi.mocked(save).mockResolvedValueOnce(null as any);

    const sessions = [{ id: 's1', completed_at: '2023-06-15T12:00:00.000Z', total_score: 5000 }];
    const responses = [
      { session_id: 's1', question_id: 'q1', category: 'Health', answer_value: 8 }
    ];
    mocks.select.mockImplementation((query: string) => {
      if (query.includes('_migrations')) return Promise.resolve([{ id: 1 }, { id: 2 }, { id: 3 }]);
      if (query.includes('historical_sessions')) return Promise.resolve(sessions);
      if (query.includes('historical_responses')) return Promise.resolve(responses);
      return Promise.resolve([]);
    });

    await exportToCSV();

    expect(save).toHaveBeenCalled();
    expect(writeTextFile).not.toHaveBeenCalled();
  });

  it('exportToCSV calls save and writeTextFile', async () => {
    const sessions: ExportSession[] = [
      { id: 's1', completed_at: '2023-06-15T12:00:00.000Z', total_score: 5000 }
    ];
    const responses: ExportResponse[] = [
      { session_id: 's1', question_id: 'q1', category: 'Health', answer_value: 8 }
    ];

    mocks.select.mockImplementation((query: string) => {
      if (query.includes('_migrations')) return Promise.resolve([{ id: 1 }, { id: 2 }, { id: 3 }]);
      if (query.includes('historical_sessions')) return Promise.resolve(sessions);
      if (query.includes('historical_responses')) return Promise.resolve(responses);
      return Promise.resolve([]);
    });

    const { save } = await import('@tauri-apps/plugin-dialog');
    const { writeTextFile } = await import('@tauri-apps/plugin-fs');

    await exportToCSV();

    expect(save).toHaveBeenCalled();
    expect(writeTextFile).toHaveBeenCalledWith('mock-path.csv', expect.any(String));
  });

  it('exportToCSV falls back to browser download when Tauri save() throws', async () => {
    const { save } = await import('@tauri-apps/plugin-dialog');
    vi.mocked(save).mockRejectedValueOnce(new Error('dialog crashed'));

    // Mock URL API for blob download fallback
    const mockCreateObjectURL = vi.fn().mockReturnValue('blob:fake-url');
    const mockRevokeObjectURL = vi.fn();
    vi.stubGlobal('URL', {
      createObjectURL: mockCreateObjectURL,
      revokeObjectURL: mockRevokeObjectURL
    });

    const origCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      const el = origCreateElement(tag);
      if (tag === 'a') vi.spyOn(el as HTMLAnchorElement, 'click').mockImplementation(() => {});
      return el;
    });

    const sessions: ExportSession[] = [
      { id: 's1', completed_at: '2023-06-15T12:00:00.000Z', total_score: 5000 }
    ];
    const responses: ExportResponse[] = [
      { session_id: 's1', question_id: 'q1', category: 'Health', answer_value: 8 }
    ];

    mocks.select.mockImplementation((query: string) => {
      if (query.includes('_migrations')) return Promise.resolve([{ id: 1 }, { id: 2 }, { id: 3 }]);
      if (query.includes('historical_sessions')) return Promise.resolve(sessions);
      if (query.includes('historical_responses')) return Promise.resolve(responses);
      return Promise.resolve([]);
    });

    await exportToCSV();

    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalled();

    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('exportToCSV uses browser download (downloadBrowser) when not in Tauri', async () => {
    // Remove Tauri flag so the non-Tauri path is taken
    delete (window as unknown as Record<string, unknown>).__TAURI_INTERNALS__;

    // Mock URL API for blob download
    const mockCreateObjectURL = vi.fn().mockReturnValue('blob:fake-url');
    const mockRevokeObjectURL = vi.fn();
    vi.stubGlobal('URL', {
      createObjectURL: mockCreateObjectURL,
      revokeObjectURL: mockRevokeObjectURL
    });

    // Intercept link.click to avoid jsdom navigation errors
    const origCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      const el = origCreateElement(tag);
      if (tag === 'a') vi.spyOn(el as HTMLAnchorElement, 'click').mockImplementation(() => {});
      return el;
    });

    const sessions: ExportSession[] = [
      { id: 's1', completed_at: '2023-06-15T12:00:00.000Z', total_score: 5000 }
    ];
    const responses: ExportResponse[] = [
      { session_id: 's1', question_id: 'q1', category: 'Health', answer_value: 8 }
    ];

    mocks.select.mockImplementation((query: string) => {
      if (query.includes('_migrations')) return Promise.resolve([{ id: 1 }, { id: 2 }, { id: 3 }]);
      if (query.includes('historical_sessions')) return Promise.resolve(sessions);
      if (query.includes('historical_responses')) return Promise.resolve(responses);
      return Promise.resolve([]);
    });

    await exportToCSV();

    expect(mockCreateObjectURL).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalled();

    // Restore Tauri state for subsequent tests
    (window as unknown as Record<string, unknown>).__TAURI_INTERNALS__ = {};
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });
});
