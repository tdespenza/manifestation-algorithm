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

/** Trigger the change event on the export select to open the save modal. */
async function openModal(wrapper: ReturnType<typeof mount>, format: string) {
  const select = wrapper.find<HTMLSelectElement>('.export-select');
  select.element.value = format;
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

/** Click the cancel button in the save modal. */
async function cancelModal() {
  const btn = document.querySelector('.save-cancel-btn') as HTMLButtonElement;
  btn.click();
  await nextTick();
}

/** Click the browse button in the save modal. */
async function clickBrowse() {
  const btn = document.querySelector('.save-browse-btn') as HTMLButtonElement;
  btn.click();
  await nextTick();
}

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
    vi.unstubAllGlobals();
  });

  // ── Rendering ─────────────────────────────────────────────────────────────────

  it('renders the export select dropdown', () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    expect(wrapper.find('.export-select').exists()).toBe(true);
    wrapper.unmount();
  });

  it('has no-print class on the container', () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    expect(wrapper.find('.chart-actions').classes()).toContain('no-print');
    wrapper.unmount();
  });

  it('export select has 7 options (placeholder + 6 formats)', () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    const options = wrapper.findAll('.export-select option');
    expect(options).toHaveLength(7);
    wrapper.unmount();
  });

  it('save modal is hidden initially', () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    expect(document.querySelector('.save-modal')).toBeNull();
    wrapper.unmount();
  });

  // ── Opening / closing the modal ───────────────────────────────────────────────

  it('selecting a format opens the save modal', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'pdf');
    expect(document.querySelector('.save-modal')).not.toBeNull();
    wrapper.unmount();
  });

  it('cancel button hides the save modal', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'pdf');
    await cancelModal();
    expect(document.querySelector('.save-modal')).toBeNull();
    wrapper.unmount();
  });

  it('✕ close button hides the save modal', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'pdf');
    const closeBtn = document.querySelector('.close-btn') as HTMLButtonElement;
    closeBtn.click();
    await nextTick();
    expect(document.querySelector('.save-modal')).toBeNull();
    wrapper.unmount();
  });

  it('overlay click closes the modal', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'pdf');
    const overlay = document.querySelector('.save-modal-overlay') as HTMLElement;
    overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();
    expect(document.querySelector('.save-modal')).toBeNull();
    wrapper.unmount();
  });

  it('filename input v-model: editing filename updates saveModal.filename', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'pdf');
    const input = document.querySelector('.save-filename-input') as HTMLInputElement;
    // Simulate the user typing a new filename — triggers the v-model onUpdate:modelValue handler
    input.value = 'My_Custom_Name.pdf';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await nextTick();
    expect(input.value).toBe('My_Custom_Name.pdf');
    wrapper.unmount();
  });

  it('no-op when select changes to empty value', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    const select = wrapper.find<HTMLSelectElement>('.export-select');
    select.element.value = '';
    await select.trigger('change');
    await nextTick();
    expect(document.querySelector('.save-modal')).toBeNull();
    wrapper.unmount();
  });

  it('directory label shows handle.name when modal reopened after a browse pick', async () => {
    const mockHandle = { name: 'MyDocs' } as FileSystemDirectoryHandle;
    vi.stubGlobal('showDirectoryPicker', vi.fn().mockResolvedValue(mockHandle));
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    // First open: pick a directory
    await openModal(wrapper, 'pdf');
    await clickBrowse();
    await flushPromises();
    await nextTick();
    // Close the modal
    await cancelModal();
    // Reopen: dirHandle is now set — covers the `saveModal.dirHandle ? dirHandle.name : ...` truthy branch
    await openModal(wrapper, 'pdf');
    const dirPath = document.querySelector('.save-directory-path') as HTMLElement;
    expect(dirPath.textContent).toContain('MyDocs');
    wrapper.unmount();
  });

  it('bareName falls back to full filename when it lacks the expected extension', async () => {
    // Covers the `: saveModal.filename` else branch in the bareName ternary
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'csv');
    // Change the filename to one without the extension
    const input = document.querySelector('.save-filename-input') as HTMLInputElement;
    input.value = 'custom_no_ext';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    await nextTick();
    await confirmModal();
    // exportToCSV should be called with 'custom_no_ext' (no slice, since it doesn't end with .csv)
    expect(mockExportToCSV).toHaveBeenCalledWith(defaultProps.data, 'custom_no_ext');
    wrapper.unmount();
  });

  it('opens modal again after re-selecting same format', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'csv');
    await cancelModal();
    expect(document.querySelector('.save-modal')).toBeNull();
    await openModal(wrapper, 'csv');
    expect(document.querySelector('.save-modal')).not.toBeNull();
    wrapper.unmount();
  });

  // ── File fields visibility ────────────────────────────────────────────────────

  it('file export (pdf) shows filename input and directory field', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'pdf');
    expect(document.querySelector('.save-filename-input')).not.toBeNull();
    expect(document.querySelector('.save-directory-path')).not.toBeNull();
    wrapper.unmount();
  });

  it('print format hides filename and directory fields', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'print');
    expect(document.querySelector('.save-filename-input')).toBeNull();
    expect(document.querySelector('.save-directory-path')).toBeNull();
    wrapper.unmount();
  });

  it('copy format hides filename and directory fields', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'copy');
    expect(document.querySelector('.save-filename-input')).toBeNull();
    expect(document.querySelector('.save-directory-path')).toBeNull();
    wrapper.unmount();
  });

  it('filename input is pre-populated with title-based name for PDF', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'pdf');
    const input = document.querySelector('.save-filename-input') as HTMLInputElement;
    expect(input.value).toBe('My_Chart_Title.pdf');
    wrapper.unmount();
  });

  it('filename input is pre-populated with props.filename for Excel', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'excel');
    const input = document.querySelector('.save-filename-input') as HTMLInputElement;
    expect(input.value).toBe('my_export.xlsx');
    wrapper.unmount();
  });

  // ── Export actions ────────────────────────────────────────────────────────────

  it('Print option calls printChart and closes modal', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'print');
    await confirmModal();
    expect(mockPrintChart).toHaveBeenCalledWith('my-chart', 'My Chart Title');
    expect(document.querySelector('.save-modal')).toBeNull();
    wrapper.unmount();
  });

  it('print calls addToast with info type on success', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'print');
    await confirmModal();
    expect(mockAddToast).toHaveBeenCalledWith('Print dialog opened', 'info');
    wrapper.unmount();
  });

  it('handlePrint shows error toast when printChart returns success: false', async () => {
    mockPrintChart.mockReturnValueOnce({ success: false, message: 'Print failed' });
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'print');
    await confirmModal();
    expect(mockAddToast).toHaveBeenCalledWith('Print failed', 'error');
    wrapper.unmount();
  });

  it('Export Excel calls exportToExcel and closes modal', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'excel');
    await confirmModal();
    expect(mockExportToExcel).toHaveBeenCalledWith(defaultProps.data, 'my_export');
    expect(document.querySelector('.save-modal')).toBeNull();
    wrapper.unmount();
  });

  it('Export CSV calls exportToCSV and closes modal', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'csv');
    await confirmModal();
    expect(mockExportToCSV).toHaveBeenCalledWith(defaultProps.data, 'my_export');
    expect(document.querySelector('.save-modal')).toBeNull();
    wrapper.unmount();
  });

  it('Export PDF calls exportToPDF and closes modal', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'pdf');
    await confirmModal();
    expect(mockExportToPDF).toHaveBeenCalledWith('my-chart', 'My Chart Title');
    expect(document.querySelector('.save-modal')).toBeNull();
    wrapper.unmount();
  });

  it('Export HTML calls exportToHTML and closes modal', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'html');
    await confirmModal();
    expect(mockExportToHTML).toHaveBeenCalledWith('my-chart', 'My Chart Title');
    expect(document.querySelector('.save-modal')).toBeNull();
    wrapper.unmount();
  });

  it('Copy Chart calls copyChart and shows success toast', async () => {
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'copy');
    await confirmModal();
    expect(mockCopyChart).toHaveBeenCalledWith('my-chart');
    expect(mockAddToast).toHaveBeenCalledWith('Chart copied to clipboard', 'success');
    wrapper.unmount();
  });

  it('Copy Chart shows error toast when copy fails', async () => {
    mockCopyChart.mockResolvedValueOnce(false);
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'copy');
    await confirmModal();
    expect(mockAddToast).toHaveBeenCalledWith('Copy failed — clipboard not available', 'error');
    wrapper.unmount();
  });

  // ── Busy state ────────────────────────────────────────────────────────────────

  it('close button is disabled while export is in progress', async () => {
    mockExportToExcel.mockReturnValueOnce(new Promise(() => {}));
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'excel');
    const confirmBtn = document.querySelector('.save-confirm-btn') as HTMLButtonElement;
    confirmBtn.click();
    await nextTick();
    const closeBtn = document.querySelector('.close-btn') as HTMLButtonElement;
    expect(closeBtn.disabled).toBe(true);
    wrapper.unmount();
  });

  it('progress bar is shown while export is in progress', async () => {
    mockExportToPDF.mockReturnValueOnce(new Promise(() => {}));
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'pdf');
    const confirmBtn = document.querySelector('.save-confirm-btn') as HTMLButtonElement;
    confirmBtn.click();
    await nextTick();
    expect(document.querySelector('.export-progress')).not.toBeNull();
    wrapper.unmount();
  });

  it('closeSaveModal while busy does not close the modal', async () => {
    mockExportToExcel.mockReturnValueOnce(new Promise(() => {}));
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'excel');
    const confirmBtn = document.querySelector('.save-confirm-btn') as HTMLButtonElement;
    confirmBtn.click();
    await nextTick();
    const overlay = document.querySelector('.save-modal-overlay') as HTMLElement;
    overlay?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();
    expect(document.querySelector('.save-modal')).not.toBeNull();
    wrapper.unmount();
  });

  // ── Error handling ────────────────────────────────────────────────────────────

  it('runExport catch block: shows "Export failed unexpectedly" toast when export throws', async () => {
    mockExportToExcel.mockRejectedValueOnce(new Error('network crash'));
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'excel');
    await confirmModal();
    expect(mockAddToast).toHaveBeenCalledWith('Export failed unexpectedly', 'error');
    wrapper.unmount();
  });

  it('runExport shows error toast when export resolves with success: false', async () => {
    mockExportToCSV.mockResolvedValueOnce({ success: false, message: 'Permission denied' });
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'csv');
    await confirmModal();
    expect(mockAddToast).toHaveBeenCalledWith('Permission denied', 'error');
    wrapper.unmount();
  });

  it('runExport suppresses toast when message is "Save cancelled"', async () => {
    mockExportToCSV.mockResolvedValueOnce({ success: false, message: 'Save cancelled' });
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'csv');
    await confirmModal();
    expect(mockAddToast).not.toHaveBeenCalled();
    wrapper.unmount();
  });

  it('handlePDFExport shows error toast when exportToPDF returns success: false', async () => {
    mockExportToPDF.mockResolvedValueOnce({ success: false, message: 'PDF failed' });
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'pdf');
    await confirmModal();
    expect(mockAddToast).toHaveBeenCalledWith('PDF failed', 'error');
    wrapper.unmount();
  });

  // ── chooseDirectory (Browse button) ──────────────────────────────────────────

  it('Browse: shows info toast when showDirectoryPicker is not supported', async () => {
    vi.stubGlobal('showDirectoryPicker', undefined);
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'pdf');
    await clickBrowse();
    expect(mockAddToast).toHaveBeenCalledWith(
      'Directory picker not supported in this environment',
      'info'
    );
    wrapper.unmount();
  });

  it('Browse: updates directory label on successful pick', async () => {
    const mockHandle = { name: 'Documents' } as FileSystemDirectoryHandle;
    vi.stubGlobal('showDirectoryPicker', vi.fn().mockResolvedValue(mockHandle));
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'pdf');
    await clickBrowse();
    await flushPromises();
    await nextTick();
    const dirPath = document.querySelector('.save-directory-path') as HTMLElement;
    expect(dirPath.textContent).toContain('Documents');
    wrapper.unmount();
  });

  it('Browse: AbortError is ignored silently', async () => {
    const abortErr = Object.assign(new Error('cancelled'), { name: 'AbortError' });
    vi.stubGlobal('showDirectoryPicker', vi.fn().mockRejectedValue(abortErr));
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'pdf');
    await clickBrowse();
    await flushPromises();
    await nextTick();
    expect(mockAddToast).not.toHaveBeenCalled();
    wrapper.unmount();
  });

  it('Browse: other error shows error toast', async () => {
    const otherErr = new Error('permission denied');
    vi.stubGlobal('showDirectoryPicker', vi.fn().mockRejectedValue(otherErr));
    const wrapper = mount(ChartActions, { props: defaultProps, attachTo: document.body });
    await openModal(wrapper, 'pdf');
    await clickBrowse();
    await flushPromises();
    await nextTick();
    expect(mockAddToast).toHaveBeenCalledWith('Could not open directory picker', 'error');
    wrapper.unmount();
  });
});
