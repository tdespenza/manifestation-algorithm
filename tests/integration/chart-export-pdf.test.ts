/**
 * Integration tests for the PDF export flow.
 *
 * Tests that the `useChartExport` composable's `exportToPDF` works end-to-end:
 *   – element / canvas presence guards
 *   – jsPDF is invoked with the chart canvas data and title
 *   – the resulting PDF blob is handed to `saveWithPicker`
 *   – the `showSaveFilePicker` path saves the file
 *   – the anchor-fallback path (no picker) downloads via anchor click
 *   – error paths surface meaningful failure messages
 *   – `ChartActions.vue` wires the button click through `runExport` correctly,
 *     showing the progress bar and closing the dialog on success/cancel
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';

// ── Mock jspdf ────────────────────────────────────────────────────────────────
const mockJsPDFInstance = {
  setFontSize: vi.fn(),
  text: vi.fn(),
  addImage: vi.fn(),
  output: vi.fn().mockReturnValue(new ArrayBuffer(16))
};

let lastJsPdfCtorArg: unknown;

vi.mock('jspdf', () => {
  class jsPDF {
    constructor(arg?: unknown) {
      lastJsPdfCtorArg = arg;
    }
    setFontSize = mockJsPDFInstance.setFontSize;
    text = mockJsPDFInstance.text;
    addImage = mockJsPDFInstance.addImage;
    output = mockJsPDFInstance.output;
  }
  return { jsPDF };
});

// ── Mock xlsx (required by useChartExport) ─────────────────────────────────
vi.mock('xlsx', () => ({
  utils: {
    json_to_sheet: vi.fn().mockReturnValue({}),
    book_new: vi.fn().mockReturnValue({}),
    book_append_sheet: vi.fn()
  },
  write: vi.fn().mockReturnValue(new ArrayBuffer(8))
}));

// ── Mock useToast ─────────────────────────────────────────────────────────────
const mockAddToast = vi.fn();
vi.mock('@/composables/useToast', () => ({
  useToast: () => ({ addToast: mockAddToast, toasts: { value: [] }, dismissToast: vi.fn() })
}));

// ── Mock Tauri APIs ───────────────────────────────────────────────────────────
const tauriMocks = vi.hoisted(() => ({
  save: vi.fn().mockResolvedValue('/fake/path/file.ext'),
  writeFile: vi.fn().mockResolvedValue(undefined),
  isTauri: vi.fn().mockReturnValue(true)
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
import ChartActions from '@/components/charts/ChartActions.vue';

// ── DOM helpers ───────────────────────────────────────────────────────────────

let mockEl: HTMLDivElement;
let mockCanvas: HTMLCanvasElement;

// Capture the real createElement ONCE before any spy is installed to avoid
// infinite recursion when vi.spyOn is stacked across multiple beforeEach runs.
const realCreateElement = document.createElement.bind(document);

function buildDOM() {
  mockEl = realCreateElement('div') as HTMLDivElement;
  mockEl.id = 'pdf-test-chart';
  mockCanvas = realCreateElement('canvas') as HTMLCanvasElement;
  mockCanvas.width = 800;
  mockCanvas.height = 400;
  vi.spyOn(mockCanvas, 'toDataURL').mockReturnValue('data:image/png;base64,abc123');
  mockEl.appendChild(mockCanvas);
  document.body.appendChild(mockEl);
}

function teardownDOM() {
  if (mockEl && document.body.contains(mockEl)) {
    document.body.removeChild(mockEl);
  }
}

const DEFAULT_PROPS = {
  targetId: 'pdf-test-chart',
  title: 'PDF Integration Test',
  data: [{ Date: '2024-01-01', Score: 8 }],
  filename: 'pdf_integration'
};

// ── beforeEach / afterEach ────────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
  lastJsPdfCtorArg = undefined;
  buildDOM();

  vi.stubGlobal('URL', {
    createObjectURL: vi.fn().mockReturnValue('blob:pdf-url'),
    revokeObjectURL: vi.fn()
  });

  // Default: no showSaveFilePicker → anchor fallback
  vi.stubGlobal('showSaveFilePicker', undefined);

  // Suppress jsdom's "not implemented" anchor click without touching createElement.
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
});

afterEach(() => {
  teardownDOM();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

// ── useChartExport.exportToPDF ────────────────────────────────────────────────

describe('useChartExport.exportToPDF integration', () => {
  it('returns success:false when element does not exist', async () => {
    const { exportToPDF } = useChartExport();
    const result = await exportToPDF('nonexistent-element', 'Missing');
    expect(result.success).toBe(false);
    expect(result.message).toMatch(/not found/i);
  });

  it('returns success:false when element has no canvas', async () => {
    mockEl.removeChild(mockCanvas);
    const { exportToPDF } = useChartExport();
    const result = await exportToPDF('pdf-test-chart', 'No Canvas');
    expect(result.success).toBe(false);
    expect(result.message).toMatch(/canvas/i);
  });

  it('calls toDataURL on the canvas with "image/png"', async () => {
    const { exportToPDF } = useChartExport();
    await exportToPDF('pdf-test-chart', 'Chart Title');
    expect(mockCanvas.toDataURL).toHaveBeenCalledWith('image/png');
  });

  it('invokes jsPDF.addImage with the canvas data URL', async () => {
    const { exportToPDF } = useChartExport();
    await exportToPDF('pdf-test-chart', 'Chart Title');
    expect(mockJsPDFInstance.addImage).toHaveBeenCalledWith(
      'data:image/png;base64,abc123',
      'PNG',
      expect.any(Number),
      expect.any(Number),
      expect.any(Number),
      expect.any(Number)
    );
  });

  it('computes expected A4 draw rectangle for 800x400 canvas', async () => {
    const { exportToPDF } = useChartExport();
    await exportToPDF('pdf-test-chart', 'Geometry Report');

    expect(mockJsPDFInstance.addImage).toHaveBeenCalledWith(
      'data:image/png;base64,abc123',
      'PNG',
      40,
      60,
      515,
      257.5
    );
  });

  it('uses height-limited scaling for very tall canvases', async () => {
    mockCanvas.width = 400;
    mockCanvas.height = 2000;

    const { exportToPDF } = useChartExport();
    await exportToPDF('pdf-test-chart', 'Tall Chart');

    expect(mockJsPDFInstance.addImage).toHaveBeenCalledWith(
      'data:image/png;base64,abc123',
      'PNG',
      40,
      60,
      146.4,
      732
    );
  });

  it('clamps scale to 1 for small canvases (no upscaling)', async () => {
    mockCanvas.width = 100;
    mockCanvas.height = 100;

    const { exportToPDF } = useChartExport();
    await exportToPDF('pdf-test-chart', 'Small Chart');

    expect(mockJsPDFInstance.addImage).toHaveBeenCalledWith(
      'data:image/png;base64,abc123',
      'PNG',
      40,
      60,
      100,
      100
    );
  });

  it('sets the title text via jsPDF.text', async () => {
    const { exportToPDF } = useChartExport();
    await exportToPDF('pdf-test-chart', 'My Report');
    expect(mockJsPDFInstance.text).toHaveBeenCalledWith('My Report', 40, 40);
  });

  it('calls jsPDF.output("arraybuffer") to get the binary data', async () => {
    const { exportToPDF } = useChartExport();
    await exportToPDF('pdf-test-chart', 'Chart Title');
    expect(mockJsPDFInstance.output).toHaveBeenCalledWith('arraybuffer');
  });

  it('creates jsPDF with pt units and a4 format', async () => {
    const { exportToPDF } = useChartExport();
    await exportToPDF('pdf-test-chart', 'Ctor Check');
    expect(lastJsPdfCtorArg).toEqual({ unit: 'pt', format: 'a4' });
  });

  it('falls back to anchor download and returns success when not in Tauri', async () => {
    tauriMocks.isTauri.mockReturnValueOnce(false);
    const { exportToPDF } = useChartExport();
    const result = await exportToPDF('pdf-test-chart', 'My PDF');
    expect(result.success).toBe(true);
    const blobArg = (URL.createObjectURL as ReturnType<typeof vi.fn>).mock.calls[0][0] as Blob;
    expect(blobArg.size).toBeGreaterThan(0);
    expect(blobArg.type).toBe('application/pdf');
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:pdf-url');
  });

  it('uses Tauri save when available and returns success', async () => {
    tauriMocks.isTauri.mockReturnValueOnce(true);
    tauriMocks.save.mockResolvedValueOnce('/fake/path/Picker_PDF.pdf');

    const { exportToPDF } = useChartExport();
    const result = await exportToPDF('pdf-test-chart', 'Picker PDF');
    expect(result.success).toBe(true);
    expect(result.message).toContain('Saved as');

    const saveArg = tauriMocks.save.mock.calls[0][0] as { defaultPath: string; filters: unknown[] };
    expect(saveArg.defaultPath).toMatch(/\.pdf$/);
    expect(saveArg.filters).toEqual([{ name: 'PDF Document', extensions: ['pdf'] }]);
    expect(tauriMocks.writeFile).toHaveBeenCalled();
  });

  it('returns cancelled when the save picker is aborted by user', async () => {
    tauriMocks.isTauri.mockReturnValueOnce(true);
    tauriMocks.save.mockResolvedValueOnce(null);

    const { exportToPDF } = useChartExport();
    const result = await exportToPDF('pdf-test-chart', 'Aborted PDF');
    expect(result.success).toBe(false);
    expect(result.message).toBe('Save cancelled');
  });

  it('returns failure when jsPDF throws internally', async () => {
    mockJsPDFInstance.output.mockImplementationOnce(() => {
      throw new Error('jsPDF internal error');
    });
    const { exportToPDF } = useChartExport();
    const result = await exportToPDF('pdf-test-chart', 'Error PDF');
    expect(result.success).toBe(false);
    expect(result.message).toBe('PDF export failed');
  });

  it('produces a blob with application/pdf MIME type', async () => {
    const blobSpy = vi.spyOn(globalThis, 'Blob');
    const { exportToPDF } = useChartExport();
    await exportToPDF('pdf-test-chart', 'MIME Test');
    const callArgs = blobSpy.mock.calls.find(
      args => (args[1] as { type?: string })?.type === 'application/pdf'
    );
    expect(callArgs).toBeDefined();
  });

  it('sanitises the title for the filename (spaces → underscores)', async () => {
    tauriMocks.isTauri.mockReturnValueOnce(true);
    tauriMocks.save.mockResolvedValueOnce('/fake/path/Health_Trend_2024.pdf');

    const { exportToPDF } = useChartExport();
    await exportToPDF('pdf-test-chart', 'Health Trend 2024');
    const opts = tauriMocks.save.mock.calls[0][0] as { defaultPath: string };
    expect(opts.defaultPath).toBe('Health_Trend_2024.pdf');
  });

  it('collapses repeated and mixed whitespace in pdf filename', async () => {
    tauriMocks.isTauri.mockReturnValueOnce(true);
    tauriMocks.save.mockResolvedValueOnce('/fake/path/Annual_Summary_2026.pdf');

    const { exportToPDF } = useChartExport();
    await exportToPDF('pdf-test-chart', 'Annual   Summary\t2026');
    const opts = tauriMocks.save.mock.calls[0][0] as { defaultPath: string };
    expect(opts.defaultPath).toBe('Annual_Summary_2026.pdf');
  });
});

// ── ChartActions component integration ───────────────────────────────────────

describe('ChartActions – Export PDF button (component integration)', () => {
  it('selecting PDF disables the select (busy) while exporting', async () => {
    // Use a never-resolving promise to freeze the busy state so we can assert
    const neverResolves = new Promise<{ success: boolean; message: string }>(() => {});
    const mod = await import('@/composables/useChartExport');
    const origUse = mod.useChartExport;
    vi.spyOn(mod, 'useChartExport').mockImplementation(() => ({
      ...origUse(),
      exportToPDF: vi.fn().mockReturnValue(neverResolves)
    }));

    const wrapper = mount(ChartActions, { props: DEFAULT_PROPS, attachTo: document.body });
    const select = wrapper.find<HTMLSelectElement>('.export-select');
    select.element.value = 'pdf';
    await select.trigger('change');
    await nextTick();

    expect(select.element.disabled).toBe(true);
    wrapper.unmount();
  });

  it('successful PDF export shows success toast', async () => {
    const wrapper = mount(ChartActions, { props: DEFAULT_PROPS, attachTo: document.body });
    const select = wrapper.find<HTMLSelectElement>('.export-select');
    select.element.value = 'pdf';
    await select.trigger('change');
    await flushPromises();
    await nextTick();

    expect(mockAddToast).toHaveBeenCalledWith(expect.stringMatching(/saved|pdf/i), 'success');
    wrapper.unmount();
  });

  it('cancelling save picker does not show a toast', async () => {
    tauriMocks.isTauri.mockReturnValueOnce(true);
    tauriMocks.save.mockResolvedValueOnce(null);

    const wrapper = mount(ChartActions, { props: DEFAULT_PROPS, attachTo: document.body });
    const select = wrapper.find<HTMLSelectElement>('.export-select');
    select.element.value = 'pdf';
    await select.trigger('change');
    await flushPromises();
    await nextTick();

    expect(mockAddToast).not.toHaveBeenCalled();
    wrapper.unmount();
  });
});
