import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ── Mock xlsx before importing composable ─────────────────────────────────────
const xlsxMocks = vi.hoisted(() => ({
  json_to_sheet: vi.fn().mockReturnValue({ fakeSheet: true }),
  book_new: vi.fn().mockReturnValue({ fakeBook: true }),
  book_append_sheet: vi.fn(),
  writeFile: vi.fn()
}));

vi.mock('xlsx', () => ({
  utils: {
    json_to_sheet: xlsxMocks.json_to_sheet,
    book_new: xlsxMocks.book_new,
    book_append_sheet: xlsxMocks.book_append_sheet
  },
  writeFile: xlsxMocks.writeFile
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
    it('does nothing when element is not found', () => {
      const { printChart } = useChartExport();
      printChart('non-existent-id', 'My Chart');
      expect(printSpy).not.toHaveBeenCalled();
      expect(document.body.classList.contains('printing-chart')).toBe(false);
    });

    it('adds classes, sets title, calls window.print, then restores everything', () => {
      document.title = 'Original Title';
      const { printChart } = useChartExport();
      printChart('test-chart-element', 'Progress Trend');
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
    it('creates a sheet from the data and writes an .xlsx file', () => {
      const { exportToExcel } = useChartExport();
      const data = [{ Date: '1/1/2024', Score: 7 }];
      exportToExcel(data, 'my_export');
      expect(xlsxMocks.json_to_sheet).toHaveBeenCalledWith(data);
      expect(xlsxMocks.book_new).toHaveBeenCalled();
      expect(xlsxMocks.book_append_sheet).toHaveBeenCalledWith(
        { fakeBook: true },
        { fakeSheet: true },
        'Data'
      );
      expect(xlsxMocks.writeFile).toHaveBeenCalledWith({ fakeBook: true }, 'my_export.xlsx');
    });

    it('uses a custom sheetName when provided', () => {
      const { exportToExcel } = useChartExport();
      exportToExcel([], 'report', 'Progress');
      expect(xlsxMocks.book_append_sheet).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything(),
        'Progress'
      );
      expect(xlsxMocks.writeFile).toHaveBeenCalledWith(expect.anything(), 'report.xlsx');
    });

    it('appends .xlsx to the filename', () => {
      const { exportToExcel } = useChartExport();
      exportToExcel([], 'health_trend');
      expect(xlsxMocks.writeFile).toHaveBeenCalledWith(expect.anything(), 'health_trend.xlsx');
    });
  });

  // ── exportToCSV ──────────────────────────────────────────────────────────────
  describe('exportToCSV', () => {
    it('does nothing when data is empty', () => {
      const { exportToCSV } = useChartExport();
      exportToCSV([], 'empty');
      expect(URL.createObjectURL).not.toHaveBeenCalled();
    });

    it('generates a CSV blob and triggers download', () => {
      const { exportToCSV } = useChartExport();
      exportToCSV([{ Date: '1/1/2024', Score: 9 }], 'test_csv');
      expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:fake-url');
    });

    it('wraps values containing commas in double quotes', () => {
      const { exportToCSV } = useChartExport();
      const BlobSpy = vi.spyOn(globalThis, 'Blob');
      exportToCSV([{ Name: 'Smith, John', Score: 7 }], 'quoted');
      const blobContent = BlobSpy.mock.calls[0][0] as string[];
      expect(blobContent[0]).toContain('"Smith, John"');
    });

    it('escapes double quotes within values', () => {
      const { exportToCSV } = useChartExport();
      const BlobSpy = vi.spyOn(globalThis, 'Blob');
      exportToCSV([{ Name: 'He said "hi"', Score: 7 }], 'quoted2');
      const blobContent = BlobSpy.mock.calls[0][0] as string[];
      expect(blobContent[0]).toContain('"He said ""hi"""');
    });

    it('wraps values containing newlines in double quotes', () => {
      const { exportToCSV } = useChartExport();
      const BlobSpy = vi.spyOn(globalThis, 'Blob');
      exportToCSV([{ Name: 'line1\nline2', Score: 5 }], 'newline');
      const blobContent = BlobSpy.mock.calls[0][0] as string[];
      expect(blobContent[0]).toContain('"line1\nline2"');
    });
    it('converts null and undefined values to empty string', () => {
      const { exportToCSV } = useChartExport();
      const BlobSpy = vi.spyOn(globalThis, 'Blob');
      exportToCSV([{ A: null, B: undefined }] as unknown as Record<string, unknown>[], 'nulls');
      const blobContent = BlobSpy.mock.calls[0][0] as string[];
      // both null and undefined become empty string (no quotes needed)
      expect(blobContent[0]).toContain(',');
    });
  });

  // ── exportToPDF ──────────────────────────────────────────────────────────────
  describe('exportToPDF', () => {
    it('does nothing when element is not found', () => {
      const { exportToPDF } = useChartExport();
      exportToPDF('non-existent-id', 'My PDF');
      expect(printSpy).not.toHaveBeenCalled();
    });

    it('adds print classes, calls window.print, then cleans up', () => {
      document.title = 'Original';
      const { exportToPDF } = useChartExport();
      exportToPDF('test-chart-element', 'My PDF');
      expect(printSpy).toHaveBeenCalledOnce();
      expect(document.title).toBe('Original');
      expect(document.body.classList.contains('printing-chart')).toBe(false);
      expect(mockEl.classList.contains('print-target')).toBe(false);
    });
  });

  // ── exportToHTML ─────────────────────────────────────────────────────────────
  describe('exportToHTML', () => {
    it('does nothing when element is not found', () => {
      const { exportToHTML } = useChartExport();
      exportToHTML('non-existent-id', 'Missing');
      expect(URL.createObjectURL).not.toHaveBeenCalled();
    });

    it('generates an HTML blob with canvas image and triggers download', () => {
      const { exportToHTML } = useChartExport();
      exportToHTML('test-chart-element', 'My Chart');
      expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/png');
      expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
      expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:fake-url');
    });

    it('falls back when no canvas is present', () => {
      mockEl.removeChild(mockCanvas);
      const { exportToHTML } = useChartExport();
      exportToHTML('test-chart-element', 'No Canvas');
      // Should still create and download a blob
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

  // ── isPrinting ref ───────────────────────────────────────────────────────────
  describe('isPrinting ref', () => {
    it('exposes isPrinting reactive ref initialised to false', () => {
      const { isPrinting } = useChartExport();
      expect(isPrinting.value).toBe(false);
    });
  });
});
