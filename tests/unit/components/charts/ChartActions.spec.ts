import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { nextTick } from 'vue';

// ── Mock useToast ────────────────────────────────────────────────────────────
const mockAddToast = vi.fn();
vi.mock('@/composables/useToast', () => ({
  useToast: () => ({ addToast: mockAddToast, toasts: { value: [] }, dismissToast: vi.fn() })
}));

// ── Mock useChartExport ──────────────────────────────────────────────────────
const mockPrintChart = vi.fn().mockReturnValue({ success: true, message: 'Print dialog opened' });
const mockExportToExcel = vi.fn().mockResolvedValue({ success: true, message: 'Saved my_export.xlsx' });
const mockExportToCSV = vi.fn().mockResolvedValue({ success: true, message: 'Saved my_export.csv' });
const mockExportToPDF = vi.fn().mockReturnValue({ success: true, message: 'Print-to-PDF dialog opened' });
const mockExportToHTML = vi.fn().mockResolvedValue({ success: true, message: 'Saved chart.html' });
const mockCopyChart = vi.fn().mockResolvedValue(true);

vi.mock('@/composables/useChartExport', () => ({
  useChartExport: () => ({
    isPrinting: { value: false },
    isExporting: { value: false },
    printChart: mockPrintChart,
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
  });

  it('renders the Export / Print trigger button', () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    expect(wrapper.find('.export-trigger-btn').exists()).toBe(true);
    expect(wrapper.find('.export-trigger-btn').text()).toContain('Export');
    wrapper.unmount();
  });

  it('has no-print class on the container', () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    expect(wrapper.find('.chart-actions').classes()).toContain('no-print');
    wrapper.unmount();
  });

  it('dialog is hidden initially', () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    expect(document.querySelector('.export-dialog')).toBeNull();
    wrapper.unmount();
  });

  it('clicking the trigger button opens the dialog', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await wrapper.find('.export-trigger-btn').trigger('click');
    await nextTick();
    expect(document.querySelector('.export-dialog')).not.toBeNull();
    wrapper.unmount();
  });

  it('dialog shows 6 export option buttons', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await wrapper.find('.export-trigger-btn').trigger('click');
    await nextTick();
    const options = document.querySelectorAll('.export-option-btn');
    expect(options).toHaveLength(6);
    wrapper.unmount();
  });

  it('close button hides the dialog', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await wrapper.find('.export-trigger-btn').trigger('click');
    await nextTick();
    const closeBtn = document.querySelector('.close-btn') as HTMLButtonElement;
    closeBtn.click();
    await nextTick();
    expect(document.querySelector('.export-dialog')).toBeNull();
    wrapper.unmount();
  });

  it('Print option calls printChart and closes dialog', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await wrapper.find('.export-trigger-btn').trigger('click');
    await nextTick();
    const buttons = document.querySelectorAll('.export-option-btn');
    (buttons[0] as HTMLButtonElement).click();
    await nextTick();
    expect(mockPrintChart).toHaveBeenCalledWith('my-chart', 'My Chart Title');
    expect(document.querySelector('.export-dialog')).toBeNull();
    wrapper.unmount();
  });

  it('Export Excel option calls exportToExcel and closes dialog', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await wrapper.find('.export-trigger-btn').trigger('click');
    await nextTick();
    const buttons = document.querySelectorAll('.export-option-btn');
    (buttons[1] as HTMLButtonElement).click();
    await flushPromises();
    await nextTick();
    expect(mockExportToExcel).toHaveBeenCalledWith(defaultProps.data, 'my_export');
    expect(document.querySelector('.export-dialog')).toBeNull();
    wrapper.unmount();
  });

  it('Export CSV option calls exportToCSV and closes dialog', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await wrapper.find('.export-trigger-btn').trigger('click');
    await nextTick();
    const buttons = document.querySelectorAll('.export-option-btn');
    (buttons[2] as HTMLButtonElement).click();
    await flushPromises();
    await nextTick();
    expect(mockExportToCSV).toHaveBeenCalledWith(defaultProps.data, 'my_export');
    expect(document.querySelector('.export-dialog')).toBeNull();
    wrapper.unmount();
  });

  it('Export PDF option calls exportToPDF and closes dialog', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await wrapper.find('.export-trigger-btn').trigger('click');
    await nextTick();
    const buttons = document.querySelectorAll('.export-option-btn');
    (buttons[3] as HTMLButtonElement).click();
    await nextTick();
    expect(mockExportToPDF).toHaveBeenCalledWith('my-chart', 'My Chart Title');
    expect(document.querySelector('.export-dialog')).toBeNull();
    wrapper.unmount();
  });

  it('Export HTML option calls exportToHTML and closes dialog', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await wrapper.find('.export-trigger-btn').trigger('click');
    await nextTick();
    const buttons = document.querySelectorAll('.export-option-btn');
    (buttons[4] as HTMLButtonElement).click();
    await flushPromises();
    await nextTick();
    expect(mockExportToHTML).toHaveBeenCalledWith('my-chart', 'My Chart Title');
    expect(document.querySelector('.export-dialog')).toBeNull();
    wrapper.unmount();
  });

  it('Copy Chart option calls copyChart and shows success toast', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await wrapper.find('.export-trigger-btn').trigger('click');
    await nextTick();
    const buttons = document.querySelectorAll('.export-option-btn');
    (buttons[5] as HTMLButtonElement).click();
    await flushPromises();
    await nextTick();
    expect(mockCopyChart).toHaveBeenCalledWith('my-chart');
    expect(mockAddToast).toHaveBeenCalledWith(
      'Chart copied to clipboard',
      'success'
    );
    wrapper.unmount();
  });

  it('Copy Chart shows error toast when copy fails', async () => {
    mockCopyChart.mockResolvedValueOnce(false);
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await wrapper.find('.export-trigger-btn').trigger('click');
    await nextTick();
    const buttons = document.querySelectorAll('.export-option-btn');
    (buttons[5] as HTMLButtonElement).click();
    await flushPromises();
    await nextTick();
    expect(mockAddToast).toHaveBeenCalledWith(
      'Copy failed — clipboard not available',
      'error'
    );
    wrapper.unmount();
  });

  it('overlay click closes the dialog', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await wrapper.find('.export-trigger-btn').trigger('click');
    await nextTick();
    const overlay = document.querySelector('.export-dialog-overlay') as HTMLElement;
    overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();
    expect(document.querySelector('.export-dialog')).toBeNull();
    wrapper.unmount();
  });

  it('print calls addToast with info type after printing', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await wrapper.find('.export-trigger-btn').trigger('click');
    await nextTick();
    const buttons = document.querySelectorAll('.export-option-btn');
    (buttons[0] as HTMLButtonElement).click();
    await nextTick();
    expect(mockAddToast).toHaveBeenCalledWith('Print dialog opened', 'info');
    wrapper.unmount();
  });

  it('close button is disabled while busy', async () => {
    // Use a never-resolving promise to hold the busy state
    mockExportToExcel.mockReturnValueOnce(new Promise(() => {}));
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await wrapper.find('.export-trigger-btn').trigger('click');
    await nextTick();
    const buttons = document.querySelectorAll('.export-option-btn');
    (buttons[1] as HTMLButtonElement).click();
    await nextTick();
    const closeBtn = document.querySelector('.close-btn') as HTMLButtonElement;
    expect(closeBtn.disabled).toBe(true);
    wrapper.unmount();
  });
});
