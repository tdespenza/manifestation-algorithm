import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ── Mock jspdf before importing composable ───────────────────────────────────
vi.mock('jspdf', () => {
  class jsPDF {
    setFontSize = vi.fn();
    text = vi.fn();
    addImage = vi.fn();
    output = vi.fn().mockReturnValue(new ArrayBuffer(8));
  }
  return { jsPDF };
});

// ── Mock xlsx before importing composable ─────────────────────────────────────
const xlsxMocks = vi.hoisted(() => ({
  json_to_sheet: vi.fn().mockReturnValue({ fakeSheet: true }),
  book_new: vi.fn().mockReturnValue({ fakeBook: true }),
  book_append_sheet: vi.fn(),
  write: vi.fn().mockReturnValue(new ArrayBuffer(8))
}));

vi.mock('xlsx', () => ({
  utils: {
    json_to_sheet: xlsxMocks.json_to_sheet,
    book_new: xlsxMocks.book_new,
    book_append_sheet: xlsxMocks.book_append_sheet
  },
  write: xlsxMocks.write
}));

// ── Mock Tauri APIs ───────────────────────────────────────────────────────────
const tauriMocks = vi.hoisted(() => ({
  save: vi.fn().mockResolvedValue('/fake/path/file.ext'),
  writeFile: vi.fn().mockResolvedValue(undefined),
  isTauri: vi.fn().mockReturnValue(false)
}));

vi.mock('@tauri-apps/plugin-dialog', () => ({
  save: tauriMocks.save
}));

vi.mock('@tauri-apps/plugin-fs', () => ({
  writeFile: tauriMocks.writeFile
}));

vi.mock('@tauri-apps/api/core', () => ({
  isTauri: tauriMocks.isTauri
}));

import { useChartExport } from '@/composables/useChartExport';

describe('useChartExport', () => {
  let originalTitle: string;
  let mockEl: HTMLDivElement;
  let mockCanvas: HTMLCanvasElement;

  beforeEach(() => {
    originalTitle = document.title;

    // Stub window.print so calling it doesn't throw in jsdom
    vi.stubGlobal('print', vi.fn());

    // Mock URL API
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn().mockReturnValue('blob:fake-url'),
      revokeObjectURL: vi.fn()
    });

    // Intercept createElement only to mock anchor clicks for file downloads.
    const originalCreateElement = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      const el = originalCreateElement(tag);
      if (tag === 'a') {
        vi.spyOn(el as HTMLAnchorElement, 'click').mockImplementation(() => {});
      }
      return el;
    });

    // Set up DOM element with canvas child
    mockEl = document.createElement('div');
    mockEl.id = 'test-chart-element';
    mockCanvas = document.createElement('canvas');
    vi.spyOn(mockCanvas, 'toDataURL').mockReturnValue('data:image/png;base64,abc');
    vi.spyOn(mockCanvas, 'toBlob').mockImplementation(cb => {
      cb(new Blob(['fake'], { type: 'image/png' }));
    });
    mockEl.appendChild(mockCanvas);
    document.body.appendChild(mockEl);

    // Mock clipboard
    vi.stubGlobal(
      'ClipboardItem',
      class MockClipboardItem {
        data: Record<string, any>;
        constructor(d: Record<string, any>) {
          this.data = d;
        }
      }
    );
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        write: vi.fn().mockImplementation(async (items: any[]) => {
          for (const item of items) {
            for (const key in item.data) {
              await item.data[key];
            }
          }
        })
      },
      configurable: true,
      writable: true
    });

    vi.clearAllMocks();
  });

  afterEach(() => {
    document.title = originalTitle;
    if (mockEl.parentNode) mockEl.parentNode.removeChild(mockEl);
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  // ── exportToExcel ────────────────────────────────────────────────────────────
  describe('exportToExcel', () => {
    it('creates a sheet from the data and writes an .xlsx blob', async () => {
      const { exportToExcel } = useChartExport();
      const data = [{ Date: '1/1/2024', Score: 7 }];
      const result = await exportToExcel(data, 'my_export');
      expect(xlsxMocks.json_to_sheet).toHaveBeenCalledWith(data);
      expect(xlsxMocks.book_new).toHaveBeenCalled();
      expect(xlsxMocks.book_append_sheet).toHaveBeenCalledWith(
        { fakeBook: true },
        { fakeSheet: true },
        'Data'
      );
      expect(xlsxMocks.write).toHaveBeenCalledWith(
        { fakeBook: true },
        { bookType: 'xlsx', type: 'array' }
      );
      expect(result.success).toBe(true);
    });

    it('uses a custom sheetName when provided', async () => {
      const { exportToExcel } = useChartExport();
      const result = await exportToExcel([], 'report', 'Progress');
      expect(xlsxMocks.book_append_sheet).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        'Progress'
      );
      expect(result.success).toBe(true);
    });

    it('includes filename in result message', async () => {
      const { exportToExcel } = useChartExport();
      const result = await exportToExcel([], 'health_trend');
      expect(result.message).toContain('health_trend.xlsx');
    });

    it('uses xlsx tauri filter metadata when saving', async () => {
      tauriMocks.isTauri.mockReturnValueOnce(true);
      tauriMocks.save.mockResolvedValueOnce('/fake/path/export.xlsx');

      const { exportToExcel } = useChartExport();
      const result = await exportToExcel([{ A: 1 }], 'excel_file');

      expect(result.success).toBe(true);
      expect(tauriMocks.save).toHaveBeenCalledWith(
        expect.objectContaining({
          defaultPath: 'excel_file.xlsx',
          filters: [{ name: 'Excel Spreadsheet', extensions: ['xlsx'] }]
        })
      );
      expect(tauriMocks.writeFile).toHaveBeenCalledWith(
        '/fake/path/export.xlsx',
        expect.any(Uint8Array)
      );
    });

    it('creates excel blob with expected xlsx mime type', async () => {
      tauriMocks.isTauri.mockReturnValueOnce(false);
      const blobSpy = vi.spyOn(globalThis, 'Blob');

      const { exportToExcel } = useChartExport();
      await exportToExcel([{ A: 1 }], 'excel_mime');

      expect(blobSpy).toHaveBeenCalledWith([expect.any(ArrayBuffer)], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
    });

    it('sets isExporting true during excel export and resets in finally', async () => {
      tauriMocks.isTauri.mockReturnValueOnce(true);
      let resolveSave: ((value: string | null) => void) | undefined;
      tauriMocks.save.mockImplementationOnce(
        () =>
          new Promise<string | null>(resolve => {
            resolveSave = resolve;
          })
      );

      const { exportToExcel, isExporting } = useChartExport();
      const pending = exportToExcel([{ A: 1 }], 'busy_excel');
      expect(isExporting.value).toBe(true);

      resolveSave?.('/fake/path/busy_excel.xlsx');
      await pending;
      expect(isExporting.value).toBe(false);
    });
  });

  // ── exportToCSV ──────────────────────────────────────────────────────────────
  describe('exportToCSV', () => {
    it('returns failure result when data is empty', async () => {
      const { exportToCSV } = useChartExport();
      const result = await exportToCSV([], 'empty');
      expect(result.success).toBe(false);
      expect(result.message).toContain('No data');
      expect(URL.createObjectURL).not.toHaveBeenCalled();
    });

    it('generates a CSV blob and triggers download', async () => {
      const { exportToCSV } = useChartExport();
      const result = await exportToCSV([{ Date: '1/1/2024', Score: 9 }], 'test_csv');
      expect(result.success).toBe(true);
      expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:fake-url');
    });

    it('wraps values containing commas in double quotes', async () => {
      const { exportToCSV } = useChartExport();
      const BlobSpy = vi.spyOn(globalThis, 'Blob');
      await exportToCSV([{ Name: 'Smith, John', Score: 7 }], 'quoted');
      const blobContent = BlobSpy.mock.calls[0][0] as string[];
      expect(blobContent[0]).toContain('"Smith, John"');
    });

    it('escapes double quotes within values', async () => {
      const { exportToCSV } = useChartExport();
      const BlobSpy = vi.spyOn(globalThis, 'Blob');
      await exportToCSV([{ Name: 'He said "hi"', Score: 7 }], 'quoted2');
      const blobContent = BlobSpy.mock.calls[0][0] as string[];
      expect(blobContent[0]).toContain('"He said ""hi"""');
    });

    it('wraps values containing newlines in double quotes', async () => {
      const { exportToCSV } = useChartExport();
      const BlobSpy = vi.spyOn(globalThis, 'Blob');
      await exportToCSV([{ Name: 'line1\nline2', Score: 5 }], 'newline');
      const blobContent = BlobSpy.mock.calls[0][0] as string[];
      expect(blobContent[0]).toContain('"line1\nline2"');
    });

    it('converts null and undefined values to empty string', async () => {
      const { exportToCSV } = useChartExport();
      const BlobSpy = vi.spyOn(globalThis, 'Blob');
      await exportToCSV(
        [{ A: null, B: undefined }] as unknown as Record<string, unknown>[],
        'nulls'
      );
      const blobContent = BlobSpy.mock.calls[0][0] as string[];
      expect(blobContent[0]).toBe('A,B\n,');
    });

    it('builds exact csv content with comma-separated header and newline row', async () => {
      const { exportToCSV } = useChartExport();
      const BlobSpy = vi.spyOn(globalThis, 'Blob');

      await exportToCSV([{ Name: 'Alice', Score: 9 }], 'plain');
      const blobContent = BlobSpy.mock.calls[0][0] as string[];
      expect(blobContent[0]).toBe('Name,Score\nAlice,9');
      expect(BlobSpy).toHaveBeenCalledWith(['Name,Score\nAlice,9'], {
        type: 'text/csv;charset=utf-8;'
      });
    });

    it('uses csv tauri save metadata and writes non-empty bytes', async () => {
      tauriMocks.isTauri.mockReturnValueOnce(true);
      tauriMocks.save.mockResolvedValueOnce('/fake/path/report.csv');

      const { exportToCSV } = useChartExport();
      const result = await exportToCSV([{ Name: 'A', Score: 1 }], 'report');

      expect(result.success).toBe(true);
      expect(tauriMocks.save).toHaveBeenCalledWith(
        expect.objectContaining({
          defaultPath: 'report.csv',
          filters: [{ name: 'CSV File', extensions: ['csv'] }]
        })
      );
      const writeArg = tauriMocks.writeFile.mock.calls[0][1] as Uint8Array;
      expect(writeArg).toBeInstanceOf(Uint8Array);
      expect(writeArg.byteLength).toBeGreaterThan(0);
    });

    it('sets isExporting true during csv export and resets in finally', async () => {
      tauriMocks.isTauri.mockReturnValueOnce(true);
      let resolveSave: ((value: string | null) => void) | undefined;
      tauriMocks.save.mockImplementationOnce(
        () =>
          new Promise<string | null>(resolve => {
            resolveSave = resolve;
          })
      );

      const { exportToCSV, isExporting } = useChartExport();
      const pending = exportToCSV([{ A: 1 }], 'busy_csv');
      expect(isExporting.value).toBe(true);

      resolveSave?.('/fake/path/busy_csv.csv');
      await pending;
      expect(isExporting.value).toBe(false);
    });
  });

  // ── exportToPDF ──────────────────────────────────────────────────────────────
  describe('exportToPDF', () => {
    it('returns failure result when element is not found', async () => {
      const { exportToPDF } = useChartExport();
      const result = await exportToPDF('non-existent-id', 'My PDF');
      expect(result.success).toBe(false);
      expect(result.message).toContain('not found');
    });

    it('returns failure when no canvas is present', async () => {
      mockEl.removeChild(mockCanvas);
      const { exportToPDF } = useChartExport();
      const result = await exportToPDF('test-chart-element', 'My PDF');
      expect(result.success).toBe(false);
      expect(result.message).toContain('canvas');
    });

    it('generates a PDF and triggers download when element has a canvas', async () => {
      const { exportToPDF } = useChartExport();
      const result = await exportToPDF('test-chart-element', 'My PDF');
      expect(result.success).toBe(true);
      expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/png');
      expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    });

    it('sanitizes all whitespace in PDF filename in Tauri mode', async () => {
      tauriMocks.isTauri.mockReturnValueOnce(true);
      tauriMocks.save.mockResolvedValueOnce('/fake/path/report.pdf');

      const { exportToPDF } = useChartExport();
      await exportToPDF('test-chart-element', 'Quarterly\tReport\n2026  Final');

      expect(tauriMocks.save).toHaveBeenCalledWith(
        expect.objectContaining({
          defaultPath: 'Quarterly_Report_2026_Final.pdf',
          filters: [{ name: 'PDF Document', extensions: ['pdf'] }]
        })
      );
    });

    it('sets isExporting true during pdf export and resets in finally', async () => {
      tauriMocks.isTauri.mockReturnValueOnce(true);
      let resolveSave: ((value: string | null) => void) | undefined;
      tauriMocks.save.mockImplementationOnce(
        () =>
          new Promise<string | null>(resolve => {
            resolveSave = resolve;
          })
      );

      const { exportToPDF, isExporting } = useChartExport();
      const pending = exportToPDF('test-chart-element', 'Busy PDF');
      expect(isExporting.value).toBe(true);

      resolveSave?.('/fake/path/busy.pdf');
      await pending;
      expect(isExporting.value).toBe(false);
    });

    it('does not inject print DOM elements', async () => {
      const { exportToPDF } = useChartExport();
      await exportToPDF('test-chart-element', 'My PDF');
      expect(document.getElementById('__chart-print-style__')).toBeNull();
      expect(document.getElementById('__chart-print-root__')).toBeNull();
    });
  });

  // ── exportToHTML ─────────────────────────────────────────────────────────────
  describe('exportToHTML', () => {
    it('returns failure result when element is not found', async () => {
      const { exportToHTML } = useChartExport();
      const result = await exportToHTML('non-existent-id', 'Missing');
      expect(result.success).toBe(false);
      expect(result.message).toBe('Chart element not found');
      expect(URL.createObjectURL).not.toHaveBeenCalled();
    });

    it('generates an HTML blob with canvas image and triggers download', async () => {
      const blobSpy = vi.spyOn(globalThis, 'Blob');
      const { exportToHTML, isExporting } = useChartExport();
      const result = await exportToHTML('test-chart-element', 'My Chart');
      expect(result.success).toBe(true);
      expect(isExporting.value).toBe(false);
      expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/png');
      expect(blobSpy).toHaveBeenCalledWith([expect.stringContaining('<h1>My Chart</h1>')], {
        type: 'text/html;charset=utf-8;'
      });
      expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:fake-url');
    });

    it('includes expected HTML template style and image alt text', async () => {
      const blobSpy = vi.spyOn(globalThis, 'Blob');
      const { exportToHTML } = useChartExport();
      await exportToHTML('test-chart-element', 'Styled Chart');

      const html = (blobSpy.mock.calls[0][0] as string[])[0];
      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('background: #fff;');
      expect(html).toContain('h1 { color: #0a1f7d; }');
      expect(html).toContain('alt="Styled Chart"');
      expect(html).toContain('max-width: 100%');
    });

    it('falls back when no canvas is present', async () => {
      mockEl.removeChild(mockCanvas);
      const blobSpy = vi.spyOn(globalThis, 'Blob');
      const { exportToHTML, isExporting } = useChartExport();
      const result = await exportToHTML('test-chart-element', 'No Canvas');
      expect(result.success).toBe(true);
      expect(isExporting.value).toBe(false);
      expect(blobSpy).toHaveBeenCalledWith(
        [expect.stringContaining('<p>No chart image available.</p>')],
        { type: 'text/html;charset=utf-8;' }
      );
      expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(URL.revokeObjectURL).toHaveBeenCalled();
    });

    it('sets isExporting true during html export and resets in finally', async () => {
      tauriMocks.isTauri.mockReturnValueOnce(true);
      let resolveSave: ((value: string | null) => void) | undefined;
      tauriMocks.save.mockImplementationOnce(
        () =>
          new Promise<string | null>(resolve => {
            resolveSave = resolve;
          })
      );

      const { exportToHTML, isExporting } = useChartExport();
      const pending = exportToHTML('test-chart-element', 'Busy HTML');
      expect(isExporting.value).toBe(true);

      resolveSave?.('/fake/path/busy.html');
      await pending;
      expect(isExporting.value).toBe(false);
    });
  });

  // ── copyChart ────────────────────────────────────────────────────────────────
  describe('copyChart', () => {
    it('returns false when element is not found', async () => {
      const { copyChart } = useChartExport();
      const result = await copyChart('non-existent-id');
      expect(result).toBe(false);
    });

    it('returns false when no canvas is found inside element', async () => {
      mockEl.removeChild(mockCanvas);
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const { copyChart } = useChartExport();
      const result = await copyChart('test-chart-element');
      expect(result).toBe(false);
      expect(navigator.clipboard.write).not.toHaveBeenCalled();
      expect(consoleSpy).not.toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('writes canvas blob to clipboard and returns true', async () => {
      const { copyChart } = useChartExport();
      const result = await copyChart('test-chart-element');
      expect(mockCanvas.toBlob).toHaveBeenCalledWith(expect.any(Function), 'image/png');
      expect(navigator.clipboard.write).toHaveBeenCalledTimes(1);
      const callArg = (navigator.clipboard.write as ReturnType<typeof vi.fn>).mock.calls[0][0];
      expect(Array.isArray(callArg)).toBe(true);
      expect(callArg).toHaveLength(1);
      expect(callArg[0]).toHaveProperty('data');
      expect(callArg[0].data).toHaveProperty('image/png');
      expect(result).toBe(true);
    });

    it('returns false when clipboard.write rejects', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      (navigator.clipboard.write as ReturnType<typeof vi.fn>).mockRejectedValue(
        new Error('Clipboard denied')
      );
      const { copyChart } = useChartExport();
      const result = await copyChart('test-chart-element');
      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith('Clipboard write failed:', expect.any(Error));
      consoleSpy.mockRestore();
    });

    it('returns false when toBlob yields null', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      vi.spyOn(mockCanvas, 'toBlob').mockImplementation(cb => {
        cb(null);
      });
      const { copyChart } = useChartExport();
      const result = await copyChart('test-chart-element');
      expect(result).toBe(false);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Clipboard write failed:',
        expect.objectContaining({ message: 'Canvas toBlob failed' })
      );
      consoleSpy.mockRestore();
    });

    it('uses direct Blob fallback when Promise<Blob> clipboard write fails', async () => {
      // Simulate a browser that throws when ClipboardItem gets a Promise value
      // (older Chrome path — the inner try throws, the catch uses blob directly)
      let callCount = 0;
      (navigator.clipboard.write as ReturnType<typeof vi.fn>).mockImplementation(async () => {
        callCount++;
        if (callCount === 1) throw new Error('Promise not supported in ClipboardItem');
        // second call succeeds
      });
      const { copyChart } = useChartExport();
      const result = await copyChart('test-chart-element');
      expect(result).toBe(true);
      expect(callCount).toBe(2);
      const calls = (navigator.clipboard.write as ReturnType<typeof vi.fn>).mock.calls;
      expect(calls[0][0]).toHaveLength(1);
      expect(calls[1][0]).toHaveLength(1);
      expect(calls[1][0][0].data).toHaveProperty('image/png');
    });
  });

  // ── isExporting ref ────────────────────────────────────────────
  describe('state refs', () => {
    it('exposes isExporting reactive ref initialised to false', () => {
      const { isExporting } = useChartExport();
      expect(isExporting.value).toBe(false);
    });
  });

  // ── showSaveFilePicker path ───────────────────────────────────────────────────
  describe('saveWithPicker (via exportToCSV)', () => {
    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it('uses Tauri save when available and returns success', async () => {
      tauriMocks.isTauri.mockReturnValueOnce(true);
      tauriMocks.save.mockResolvedValueOnce('/fake/path/picker_test.csv');

      const { exportToCSV } = useChartExport();
      const result = await exportToCSV([{ A: 1 }], 'picker_test');
      expect(result.success).toBe(true);
      expect(result.message).toContain('Saved as');
      expect(tauriMocks.writeFile).toHaveBeenCalled();
    });

    it('returns cancelled when picker returns null', async () => {
      tauriMocks.isTauri.mockReturnValueOnce(true);
      tauriMocks.save.mockResolvedValueOnce(null);

      const { exportToCSV } = useChartExport();
      const result = await exportToCSV([{ A: 1 }], 'abort_test');
      expect(result.success).toBe(false);
      expect(result.message).toBe('Save cancelled');
    });

    it('returns failure when picker throws error', async () => {
      tauriMocks.isTauri.mockReturnValueOnce(true);
      const networkError = new Error('Permission denied');
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      tauriMocks.save.mockRejectedValueOnce(networkError);

      const { exportToCSV } = useChartExport();
      const result = await exportToCSV([{ A: 1 }], 'fallback_test');
      expect(result.success).toBe(false);
      expect(result.message).toContain('Save failed: Permission denied');
      expect(consoleSpy).toHaveBeenCalledWith('Tauri save failed:', networkError);
      consoleSpy.mockRestore();
    });

    it('returns failure when picker throws a non-Error value (String(err) branch)', async () => {
      tauriMocks.isTauri.mockReturnValueOnce(true);
      tauriMocks.save.mockRejectedValueOnce('disk-full'); // non-Error string

      const { exportToCSV } = useChartExport();
      const result = await exportToCSV([{ A: 1 }], 'fallback_test');
      expect(result.success).toBe(false);
      expect(result.message).toContain('disk-full');
    });

    it('passes HTML extension filters in Tauri mode via exportToHTML', async () => {
      tauriMocks.isTauri.mockReturnValueOnce(true);
      tauriMocks.save.mockResolvedValueOnce('/fake/path/chart.html');

      const { exportToHTML } = useChartExport();
      const result = await exportToHTML('test-chart-element', 'Tauri   Chart 2026');

      expect(result.success).toBe(true);
      expect(tauriMocks.save).toHaveBeenCalledWith(
        expect.objectContaining({
          defaultPath: 'Tauri_Chart_2026.html',
          filters: [{ name: 'HTML File', extensions: ['html', 'htm'] }]
        })
      );
      expect(tauriMocks.writeFile).toHaveBeenCalledWith(
        '/fake/path/chart.html',
        expect.any(Uint8Array)
      );
    });
  });

  // ── export error catch blocks ─────────────────────────────────────────────────
  describe('export error catch blocks', () => {
    it('exportToPDF returns failure when toDataURL throws', async () => {
      vi.spyOn(mockCanvas, 'toDataURL').mockImplementationOnce(() => {
        throw new Error('Canvas render error');
      });
      const { exportToPDF } = useChartExport();
      const result = await exportToPDF('test-chart-element', 'Bad PDF');
      expect(result.success).toBe(false);
      expect(result.message).toBe('PDF export failed');
    });

    it('exportToExcel returns failure when XLSX.write throws', async () => {
      xlsxMocks.write.mockImplementationOnce(() => {
        throw new Error('XLSX write failure');
      });
      const { exportToExcel } = useChartExport();
      const result = await exportToExcel([{ A: 1 }], 'bad_excel');
      expect(result.success).toBe(false);
      expect(result.message).toBe('Excel export failed');
    });

    it('exportToCSV returns failure when Blob constructor throws', async () => {
      vi.spyOn(globalThis, 'Blob').mockImplementationOnce(() => {
        throw new Error('Blob error');
      });
      const { exportToCSV } = useChartExport();
      const result = await exportToCSV([{ Name: 'Test' }], 'bad_csv');
      expect(result.success).toBe(false);
      expect(result.message).toBe('CSV export failed');
    });

    it('exportToHTML returns failure when toDataURL throws', async () => {
      vi.spyOn(mockCanvas, 'toDataURL').mockImplementationOnce(() => {
        throw new Error('Canvas error');
      });
      const { exportToHTML } = useChartExport();
      const result = await exportToHTML('test-chart-element', 'Bad Chart');
      expect(result.success).toBe(false);
      expect(result.message).toBe('HTML export failed');
    });
  });
});
