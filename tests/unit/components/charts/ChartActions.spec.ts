import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';

// ── Mock useToast ────────────────────────────────────────────────────────────
const mockAddToast = vi.fn();
vi.mock('@/composables/useToast', () => ({
  useToast: () => ({ addToast: mockAddToast, toasts: { value: [] }, dismissToast: vi.fn() })
}));

// ── Mock useChartExport ──────────────────────────────────────────────────────
const mockExportToExcel = vi
  .fn()
  .mockResolvedValue({ success: true, message: 'Saved my_export.xlsx' });
const mockExportToCSV = vi
  .fn()
  .mockResolvedValue({ success: true, message: 'Saved my_export.csv' });
const mockExportToPDF = vi
  .fn()
  .mockResolvedValue({ success: true, message: 'My_PDF.pdf saved to Downloads' });
const mockExportToHTML = vi.fn().mockResolvedValue({ success: true, message: 'Saved chart.html' });
const mockCopyChart = vi.fn().mockResolvedValue(true);

/** Selects a format from the export dropdown — triggers export immediately. */
async function selectFormat(wrapper: ReturnType<typeof mount>, format: string) {
  const select = wrapper.find<HTMLSelectElement>('.export-select');
  select.element.value = format;
  await select.trigger('change');
  await flushPromises();
  await nextTick();
}

vi.mock('@/composables/useChartExport', () => ({
  useChartExport: () => ({
    isExporting: { value: false },
    exportToExcel: mockExportToExcel,
    exportToCSV: mockExportToCSV,
    exportToPDF: mockExportToPDF,
    exportToHTML: mockExportToHTML,
    copyChart: mockCopyChart
  })
}));

import ChartActions from '@/components/charts/ChartActions.vue';

describe('ChartActions.vue', () => {
  const defaultProps = {
    targetId: 'my-chart',
    title: 'My Chart Title',
    data: [{ Date: '1/1/2024', Score: 7 }],
    filename: 'my_export'
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
    Object.defineProperty(document, 'fullscreenElement', {
      value: null,
      writable: true,
      configurable: true
    });
    HTMLElement.prototype.requestFullscreen = vi.fn().mockResolvedValue(undefined);
    document.exitFullscreen = vi.fn().mockResolvedValue(undefined);
  });

  // ── Rendering ─────────────────────────────────────────────────────────────────

  it('renders the export select dropdown', () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    expect(wrapper.find('.export-select').exists()).toBe(true);
    wrapper.unmount();
  });

  it('renders the fullscreen button', () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    expect(wrapper.find('.action-btn[title="View full screen"]').exists()).toBe(true);
    wrapper.unmount();
  });

  it('export select has 5 options (placeholder + 4 formats)', () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    const options = wrapper.findAll('.export-select option');
    expect(options).toHaveLength(5);
    wrapper.unmount();
  });

  it('no modal is rendered initially', () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    expect(document.querySelector('.save-modal')).toBeNull();
    wrapper.unmount();
  });

  it('no modal is rendered after any format selection', async () => {
    for (const format of ['excel', 'csv', 'pdf', 'html']) {
      const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
      await selectFormat(wrapper, format);
      expect(document.querySelector('.save-modal')).toBeNull();
      wrapper.unmount();
    }
  });

  it('select resets to placeholder after change', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    const select = wrapper.find<HTMLSelectElement>('.export-select');
    select.element.value = 'csv';
    await select.trigger('change');
    await nextTick();
    expect(select.element.value).toBe('');
    wrapper.unmount();
  });

  it('no-op when select changes to empty value', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    const select = wrapper.find<HTMLSelectElement>('.export-select');
    select.element.value = '';
    await select.trigger('change');
    await nextTick();
    expect(mockCopyChart).not.toHaveBeenCalled();
    wrapper.unmount();
  });

  // ── Direct export calls ───────────────────────────────────────────────────────

  it('Copy button calls copyChart directly without modal', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await wrapper.find('.action-btn[title="Copy Chart"]').trigger('click');
    expect(mockCopyChart).toHaveBeenCalledWith('my-chart');
    expect(mockAddToast).toHaveBeenCalledWith('Chart copied to clipboard', 'success');
    wrapper.unmount();
  });

  it('Copy button shows error toast when copy fails', async () => {
    mockCopyChart.mockResolvedValueOnce(false);
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await wrapper.find('.action-btn[title="Copy Chart"]').trigger('click');
    expect(mockAddToast).toHaveBeenCalledWith(
      'Copy failed \u2014 clipboard not available',
      'error'
    );
    wrapper.unmount();
  });

  it('Excel selection calls exportToExcel with base filename', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await selectFormat(wrapper, 'excel');
    expect(mockExportToExcel).toHaveBeenCalledWith(defaultProps.data, 'my_export');
    wrapper.unmount();
  });

  it('Excel selection shows success toast', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await selectFormat(wrapper, 'excel');
    expect(mockAddToast).toHaveBeenCalledWith('Saved my_export.xlsx', 'success');
    wrapper.unmount();
  });

  it('CSV selection calls exportToCSV with base filename', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await selectFormat(wrapper, 'csv');
    expect(mockExportToCSV).toHaveBeenCalledWith(defaultProps.data, 'my_export');
    wrapper.unmount();
  });

  it('PDF selection calls exportToPDF with chart title', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await selectFormat(wrapper, 'pdf');
    expect(mockExportToPDF).toHaveBeenCalledWith('my-chart', 'My Chart Title');
    wrapper.unmount();
  });

  it('HTML selection calls exportToHTML with chart title', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await selectFormat(wrapper, 'html');
    expect(mockExportToHTML).toHaveBeenCalledWith('my-chart', 'My Chart Title');
    wrapper.unmount();
  });

  it('uses title as basename when filename prop is empty', async () => {
    const wrapper = mount(ChartActions, {
      props: { ...defaultProps, filename: '' },
      attachTo: document.body
    });
    await selectFormat(wrapper, 'excel');
    expect(mockExportToExcel).toHaveBeenCalledWith(defaultProps.data, 'My_Chart_Title');
    wrapper.unmount();
  });

  // ── Busy state ────────────────────────────────────────────────────────────────

  it('select is disabled while export is in progress', async () => {
    let resolveExport!: (val: { success: boolean; message: string }) => void;
    mockExportToExcel.mockReturnValueOnce(
      new Promise(res => {
        resolveExport = res;
      })
    );
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    const select = wrapper.find<HTMLSelectElement>('.export-select');
    select.element.value = 'excel';
    await select.trigger('change');
    await nextTick();
    expect(select.element.disabled).toBe(true);
    resolveExport({ success: true, message: 'done' });
    await flushPromises();
    wrapper.unmount();
  });

  it('select is re-enabled after export completes', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await selectFormat(wrapper, 'excel');
    const select = wrapper.find<HTMLSelectElement>('.export-select');
    expect(select.element.disabled).toBe(false);
    wrapper.unmount();
  });

  // ── Error handling ────────────────────────────────────────────────────────────

  it('shows "Export failed unexpectedly" toast when export throws', async () => {
    mockExportToExcel.mockRejectedValueOnce(new Error('network crash'));
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await selectFormat(wrapper, 'excel');
    expect(mockAddToast).toHaveBeenCalledWith('Export failed unexpectedly', 'error');
    wrapper.unmount();
  });

  it('shows error toast when export resolves with success: false', async () => {
    mockExportToCSV.mockResolvedValueOnce({ success: false, message: 'Permission denied' });
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await selectFormat(wrapper, 'csv');
    expect(mockAddToast).toHaveBeenCalledWith('Permission denied', 'error');
    wrapper.unmount();
  });

  it('suppresses toast when message is "Save cancelled"', async () => {
    mockExportToCSV.mockResolvedValueOnce({ success: false, message: 'Save cancelled' });
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await selectFormat(wrapper, 'csv');
    expect(mockAddToast).not.toHaveBeenCalled();
    wrapper.unmount();
  });

  it('shows error toast when exportToPDF returns success: false', async () => {
    mockExportToPDF.mockResolvedValueOnce({ success: false, message: 'PDF failed' });
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await selectFormat(wrapper, 'pdf');
    expect(mockAddToast).toHaveBeenCalledWith('PDF failed', 'error');
    wrapper.unmount();
  });

  // ── Fullscreen button ─────────────────────────────────────────────────────────

  it('fullscreen button calls requestFullscreen on the target element', async () => {
    const el = document.createElement('div');
    el.id = 'my-chart';
    document.body.appendChild(el);
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await wrapper.find('.action-btn[title="View full screen"]').trigger('click');
    expect(el.requestFullscreen).toHaveBeenCalled();
    document.body.removeChild(el);
    wrapper.unmount();
  });

  it('fullscreen button calls exitFullscreen when already fullscreen', async () => {
    const el = document.createElement('div');
    el.id = 'my-chart';
    document.body.appendChild(el);
    Object.defineProperty(document, 'fullscreenElement', {
      value: el,
      writable: true,
      configurable: true
    });
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });

    // Trigger the event so the component updates its isFullscreen ref
    document.dispatchEvent(new Event('fullscreenchange'));
    await nextTick();

    await wrapper.find('.action-btn[title="Exit full screen"]').trigger('click');
    expect(document.exitFullscreen).toHaveBeenCalled();
    document.body.removeChild(el);
    wrapper.unmount();
  });

  it('fullscreen button shows "View full screen" title when not fullscreen', () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    expect(wrapper.find('.action-btn[title="View full screen"]').attributes('title')).toBe(
      'View full screen'
    );
    wrapper.unmount();
  });

  it('exits CSS fallback fullscreen when isFullscreen is true but fullscreenElement is null', async () => {
    const el = document.createElement('div');
    el.id = 'my-chart';
    document.body.appendChild(el);

    // Simulate CSS-fallback entry: no native requestFullscreen
    const origRequestFullscreen = HTMLElement.prototype.requestFullscreen;
    (HTMLElement.prototype as any).requestFullscreen = undefined;

    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });

    // Enter fullscreen via CSS fallback (requestFullscreen is falsy)
    await wrapper.find('.action-btn[title="View full screen"]').trigger('click');
    await nextTick();
    expect((wrapper.vm as any).isFullscreen).toBe(true);

    // Ensure document.fullscreenElement is null (no native fullscreen)
    Object.defineProperty(document, 'fullscreenElement', {
      value: null,
      writable: true,
      configurable: true
    });

    // Exit fullscreen - should use CSS fallback exit path (lines 105-107)
    await wrapper.find('.action-btn[title="Exit full screen"]').trigger('click');
    await nextTick();
    expect((wrapper.vm as any).isFullscreen).toBe(false);
    expect(el.classList.contains('fullscreen-fallback')).toBe(false);

    HTMLElement.prototype.requestFullscreen = origRequestFullscreen;
    document.body.removeChild(el);
    wrapper.unmount();
  });

  it('Escape key triggers toggleFullscreen when fullscreen is active', async () => {
    const el = document.createElement('div');
    el.id = 'my-chart';
    document.body.appendChild(el);

    Object.defineProperty(document, 'fullscreenElement', {
      value: el,
      writable: true,
      configurable: true
    });

    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });

    // Simulate entering fullscreen via fullscreenchange event
    document.dispatchEvent(new Event('fullscreenchange'));
    await nextTick();
    expect((wrapper.vm as any).isFullscreen).toBe(true);

    // Press Escape key - should call toggleFullscreen (lines 117-118)
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await nextTick();
    expect(document.exitFullscreen).toHaveBeenCalled();

    document.body.removeChild(el);
    wrapper.unmount();
  });

  it('Escape key is ignored when not in fullscreen', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    expect((wrapper.vm as any).isFullscreen).toBe(false);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await nextTick();
    // exitFullscreen should not be called since not in fullscreen
    expect(document.exitFullscreen).not.toHaveBeenCalled();
    wrapper.unmount();
  });

  it('uses CSS fallback when requestFullscreen rejects (covers catch callback)', async () => {
    const el = document.createElement('div');
    el.id = 'my-chart';
    document.body.appendChild(el);

    // Make requestFullscreen reject to trigger the .catch() callback (lines 94-96)
    HTMLElement.prototype.requestFullscreen = vi
      .fn()
      .mockRejectedValueOnce(new Error('fullscreen denied'));

    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await wrapper.find('.action-btn[title="View full screen"]').trigger('click');
    await flushPromises();
    await nextTick();

    // Catch block: el.classList gets 'fullscreen-fallback' and isFullscreen becomes true
    expect((wrapper.vm as any).isFullscreen).toBe(true);
    expect(el.classList.contains('fullscreen-fallback')).toBe(true);

    document.body.removeChild(el);
    wrapper.unmount();
  });

  it('toggleFullscreen is a no-op when target element does not exist in DOM', async () => {
    // Use a targetId that doesn't exist in the DOM (covers the if (!el) return branch)
    const wrapper = mount(ChartActions, {
      props: { ...defaultProps, targetId: 'nonexistent-element-id' },
      attachTo: document.body
    });
    await wrapper.find('.action-btn[title="View full screen"]').trigger('click');
    await flushPromises();
    // No fullscreen should have been activated since el is null
    expect((wrapper.vm as any).isFullscreen).toBe(false);
    expect(document.exitFullscreen).not.toHaveBeenCalled();
    wrapper.unmount();
  });
});
