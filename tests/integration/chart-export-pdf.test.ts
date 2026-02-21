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

vi.mock('jspdf', () => {
  class jsPDF {
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

  it('sets the title text via jsPDF.text', async () => {
    const { exportToPDF } = useChartExport();
    await exportToPDF('pdf-test-chart', 'My Report');
    expect(mockJsPDFInstance.text).toHaveBeenCalledWith(
      'My Report',
      expect.any(Number),
      expect.any(Number)
    );
  });

  it('calls jsPDF.output("arraybuffer") to get the binary data', async () => {
    const { exportToPDF } = useChartExport();
    await exportToPDF('pdf-test-chart', 'Chart Title');
    expect(mockJsPDFInstance.output).toHaveBeenCalledWith('arraybuffer');
  });

  it('falls back to anchor download and returns success when no showSaveFilePicker', async () => {
    const { exportToPDF } = useChartExport();
    const result = await exportToPDF('pdf-test-chart', 'My PDF');
    expect(result.success).toBe(true);
    expect(URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob));
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:pdf-url');
  });

  it('uses showSaveFilePicker when available and returns success', async () => {
    const mockWritable = {
      write: vi.fn().mockResolvedValue(undefined),
      close: vi.fn().mockResolvedValue(undefined)
    };
    const mockHandle = { createWritable: vi.fn().mockResolvedValue(mockWritable) };
    vi.stubGlobal('showSaveFilePicker', vi.fn().mockResolvedValue(mockHandle));

    const { exportToPDF } = useChartExport();
    const result = await exportToPDF('pdf-test-chart', 'Picker PDF');
    expect(result.success).toBe(true);
    expect(result.message).toContain('Saved as');
    const pickerArg = (window as unknown as Record<string, ReturnType<typeof vi.fn>>)
      .showSaveFilePicker.mock.calls[0][0] as { suggestedName: string; types: unknown[] };
    expect(pickerArg.suggestedName).toMatch(/\.pdf$/);
  });

  it('returns cancelled when the save picker is aborted by user', async () => {
    const abortErr = Object.assign(new Error('cancelled'), { name: 'AbortError' });
    vi.stubGlobal('showSaveFilePicker', vi.fn().mockRejectedValue(abortErr));

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
    const mockWritable = {
      write: vi.fn().mockResolvedValue(undefined),
      close: vi.fn().mockResolvedValue(undefined)
    };
    const mockHandle = { createWritable: vi.fn().mockResolvedValue(mockWritable) };
    const pickerFn = vi.fn().mockResolvedValue(mockHandle);
    vi.stubGlobal('showSaveFilePicker', pickerFn);

    const { exportToPDF } = useChartExport();
    await exportToPDF('pdf-test-chart', 'Health Trend 2024');
    const opts = pickerFn.mock.calls[0][0] as { suggestedName: string };
    expect(opts.suggestedName).toBe('Health_Trend_2024.pdf');
  });
});

// ── ChartActions component integration ───────────────────────────────────────

describe('ChartActions – Export PDF button (component integration)', () => {
  /** Open the save modal for PDF via the select element. */
  async function openPDFModal(wrapper: ReturnType<typeof mount>) {
    const select = wrapper.find<HTMLSelectElement>('.export-select');
    select.element.value = 'pdf';
    await select.trigger('change');
    await nextTick();
  }

  /** Click the confirm button in the save modal. */
  async function confirmModal() {
    const btn = document.querySelector('.save-confirm-btn') as HTMLButtonElement;
    btn.click();
    await flushPromises();
    await nextTick();
  }

  it('clicking Export PDF shows progress bar while exporting', async () => {
    // Use a never-resolving promise to freeze the busy state so we can assert
    const neverResolves = new Promise<{ success: boolean; message: string }>(() => {});
    const mod = await import('@/composables/useChartExport');
    const origUse = mod.useChartExport;
    vi.spyOn(mod, 'useChartExport').mockImplementation(() => ({
      ...origUse(),
      exportToPDF: vi.fn().mockReturnValue(neverResolves)
    }));

    const wrapper = mount(ChartActions, { props: DEFAULT_PROPS, attachTo: document.body });
    await openPDFModal(wrapper);
    const confirmBtn = document.querySelector('.save-confirm-btn') as HTMLButtonElement;
    confirmBtn.click();
    await nextTick();

    expect(document.querySelector('.export-progress')).not.toBeNull();
    wrapper.unmount();
  });

  it('successful PDF export closes dialog and shows success toast', async () => {
    const wrapper = mount(ChartActions, { props: DEFAULT_PROPS, attachTo: document.body });
    await openPDFModal(wrapper);
    await confirmModal();

    expect(document.querySelector('.save-modal')).toBeNull();
    expect(mockAddToast).toHaveBeenCalledWith(expect.stringMatching(/saved|pdf/i), 'success');
    wrapper.unmount();
  });

  it('cancelling save picker (AbortError) closes dialog without showing a toast', async () => {
    const abortErr = Object.assign(new Error('cancelled'), { name: 'AbortError' });
    vi.stubGlobal('showSaveFilePicker', vi.fn().mockRejectedValue(abortErr));

    const wrapper = mount(ChartActions, { props: DEFAULT_PROPS, attachTo: document.body });
    await openPDFModal(wrapper);
    await confirmModal();

    expect(document.querySelector('.save-modal')).toBeNull();
    expect(mockAddToast).not.toHaveBeenCalled();
    wrapper.unmount();
  });
});
