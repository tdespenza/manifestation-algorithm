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

import { useChartExport } from '@/composables/useChartExport';

describe('useChartExport', () => {
  let originalTitle: string;
  let printSpy: ReturnType<typeof vi.fn>;
  let mockEl: HTMLDivElement;
  let mockCanvas: HTMLCanvasElement;

  beforeEach(() => {
    originalTitle = document.title;
    printSpy = vi.fn();
    vi.stubGlobal('print', printSpy);

    // Mock URL API
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn().mockReturnValue('blob:fake-url'),
      revokeObjectURL: vi.fn()
    });

    // Mock anchor click
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
        data: unknown;
        constructor(d: unknown) {
          this.data = d;
        }
      }
    );
    Object.defineProperty(navigator, 'clipboard', {
      value: { write: vi.fn().mockResolvedValue(undefined) },
      configurable: true,
      writable: true
    });

    vi.clearAllMocks();
  });

  afterEach(() => {
    document.title = originalTitle;
    if (mockEl.parentNode) mockEl.parentNode.removeChild(mockEl);
    document.body.classList.remove('printing-chart');
    mockEl.classList.remove('print-target');
    vi.restoreAllMocks();
  });

  // ── printChart ───────────────────────────────────────────────────────────────
  describe('printChart', () => {
    it('returns failure result when element is not found', () => {
      const { printChart } = useChartExport();
      const result = printChart('non-existent-id', 'My Chart');
      expect(result.success).toBe(false);
      expect(printSpy).not.toHaveBeenCalled();
    });

    it('adds classes, sets title, calls window.print, then restores everything', () => {
      document.title = 'Original Title';
      const { printChart } = useChartExport();
      const result = printChart('test-chart-element', 'Progress Trend');
      expect(result.success).toBe(true);
      expect(printSpy).toHaveBeenCalledOnce();
      expect(document.title).toBe('Original Title');
      expect(document.body.classList.contains('printing-chart')).toBe(false);
      expect(mockEl.classList.contains('print-target')).toBe(false);
    });

    it('sets document.title to the chart title before printing', () => {
      const { printChart } = useChartExport();
      let titleDuringPrint = '';
      printSpy.mockImplementation(() => {
        titleDuringPrint = document.title;
      });
      printChart('test-chart-element', 'Category Trend');
      expect(titleDuringPrint).toBe('Category Trend');
    });

    it('adds printing-chart class to body and print-target class to element during print', () => {
      const { printChart } = useChartExport();
      let bodyHasClass = false;
      let elHasClass = false;
      printSpy.mockImplementation(() => {
        bodyHasClass = document.body.classList.contains('printing-chart');
        elHasClass = mockEl.classList.contains('print-target');
      });
      printChart('test-chart-element', 'Test');
      expect(bodyHasClass).toBe(true);
      expect(elHasClass).toBe(true);
    });
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
      expect(blobContent[0]).toContain(',');
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

    it('does not call window.print', async () => {
      const { exportToPDF } = useChartExport();
      await exportToPDF('test-chart-element', 'My PDF');
      expect(printSpy).not.toHaveBeenCalled();
    });
  });

  // ── exportToHTML ─────────────────────────────────────────────────────────────
  describe('exportToHTML', () => {
    it('returns failure result when element is not found', async () => {
      const { exportToHTML } = useChartExport();
      const result = await exportToHTML('non-existent-id', 'Missing');
      expect(result.success).toBe(false);
      expect(URL.createObjectURL).not.toHaveBeenCalled();
    });

    it('generates an HTML blob with canvas image and triggers download', async () => {
      const { exportToHTML } = useChartExport();
      const result = await exportToHTML('test-chart-element', 'My Chart');
      expect(result.success).toBe(true);
      expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/png');
      expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:fake-url');
    });

    it('falls back when no canvas is present', async () => {
      mockEl.removeChild(mockCanvas);
      const { exportToHTML } = useChartExport();
      const result = await exportToHTML('test-chart-element', 'No Canvas');
      expect(result.success).toBe(true);
      expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(URL.revokeObjectURL).toHaveBeenCalled();
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
      const { copyChart } = useChartExport();
      const result = await copyChart('test-chart-element');
      expect(result).toBe(false);
    });

    it('writes canvas blob to clipboard and returns true', async () => {
      const { copyChart } = useChartExport();
      const result = await copyChart('test-chart-element');
      expect(navigator.clipboard.write).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('returns false when clipboard.write rejects', async () => {
      (navigator.clipboard.write as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
        new Error('Clipboard denied')
      );
      const { copyChart } = useChartExport();
      const result = await copyChart('test-chart-element');
      expect(result).toBe(false);
    });

    it('returns false when toBlob yields null', async () => {
      vi.spyOn(mockCanvas, 'toBlob').mockImplementation(cb => {
        cb(null);
      });
      const { copyChart } = useChartExport();
      const result = await copyChart('test-chart-element');
      expect(result).toBe(false);
    });
  });

  // ── isPrinting / isExporting refs ────────────────────────────────────────────
  describe('state refs', () => {
    it('exposes isPrinting reactive ref initialised to false', () => {
      const { isPrinting } = useChartExport();
      expect(isPrinting.value).toBe(false);
    });

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

    it('uses showSaveFilePicker when available and returns success', async () => {
      const mockWritable = {
        write: vi.fn().mockResolvedValue(undefined),
        close: vi.fn().mockResolvedValue(undefined)
      };
      const mockHandle = { createWritable: vi.fn().mockResolvedValue(mockWritable) };
      vi.stubGlobal('showSaveFilePicker', vi.fn().mockResolvedValue(mockHandle));

      const { exportToCSV } = useChartExport();
      const result = await exportToCSV([{ A: 1 }], 'picker_test');
      expect(result.success).toBe(true);
      expect(result.message).toContain('Saved as');
      expect(mockWritable.write).toHaveBeenCalled();
      expect(mockWritable.close).toHaveBeenCalled();
    });

    it('returns cancelled when picker throws AbortError', async () => {
      const abortError = Object.assign(new Error('User cancelled'), { name: 'AbortError' });
      vi.stubGlobal('showSaveFilePicker', vi.fn().mockRejectedValue(abortError));

      const { exportToCSV } = useChartExport();
      const result = await exportToCSV([{ A: 1 }], 'abort_test');
      expect(result.success).toBe(false);
      expect(result.message).toBe('Save cancelled');
    });

    it('falls back to anchor download when picker throws non-abort error', async () => {
      const networkError = new Error('Permission denied');
      vi.stubGlobal('showSaveFilePicker', vi.fn().mockRejectedValue(networkError));

      const { exportToCSV } = useChartExport();
      const result = await exportToCSV([{ A: 1 }], 'fallback_test');
      // Falls back to legacy anchor download, which succeeds
      expect(result.success).toBe(true);
      expect(URL.createObjectURL).toHaveBeenCalled();
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
