<template>
  <div class="chart-actions no-print">
    <!-- Export select — choosing an option opens the Save modal -->
    <select
      class="export-select"
      :disabled="busy"
      aria-label="Export chart"
      @change="onSelectChange"
    >
      <option value="" disabled selected>⬇ Export / Print</option>
      <option value="print">🖨️ Print</option>
      <option value="excel">📊 Export Excel</option>
      <option value="csv">📄 Export CSV</option>
      <option value="pdf">📑 Export PDF</option>
      <option value="html">🌐 Export HTML</option>
      <option value="copy">📋 Copy Chart</option>
    </select>
  </div>

  <!-- Save modal — shown after selecting an export format -->
  <Teleport to="body">
    <div v-if="saveModal.visible" class="save-modal-overlay" @click.self="closeSaveModal">
      <div
        class="save-modal"
        role="dialog"
        aria-modal="true"
        :aria-label="`Save ${saveModal.label}`"
      >
        <div class="save-modal-header">
          <h3>{{ saveModal.label }}</h3>
          <button class="close-btn" aria-label="Close" :disabled="busy" @click="closeSaveModal">
            ✕
          </button>
        </div>

        <!-- Progress bar while saving -->
        <div v-if="busy" class="export-progress" aria-label="Exporting...">
          <div class="progress-bar-track">
            <div class="progress-bar-fill"></div>
          </div>
          <span class="progress-label">{{ busyLabel }}…</span>
        </div>

        <template v-else>
          <!-- Filename row (hidden for print/copy) -->
          <div v-if="saveModal.hasFile" class="save-modal-field">
            <label class="save-modal-label" for="save-filename">Filename</label>
            <input
              id="save-filename"
              v-model="saveModal.filename"
              class="save-filename-input"
              type="text"
              spellcheck="false"
            />
          </div>

          <!-- Directory row (hidden for print/copy) -->
          <div v-if="saveModal.hasFile" class="save-modal-field">
            <label class="save-modal-label">Save to</label>
            <div class="save-dir-row">
              <span class="save-directory-path">{{ saveModal.dirLabel }}</span>
              <button class="save-browse-btn" type="button" @click="chooseDirectory">
                Browse…
              </button>
            </div>
          </div>

          <div class="save-modal-actions">
            <button class="save-cancel-btn" type="button" @click="closeSaveModal">Cancel</button>
            <button class="save-confirm-btn" type="button" @click="confirmSave">
              {{ saveModal.confirmLabel }}
            </button>
          </div>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useChartExport } from '../../composables/useChartExport';
import { useToast } from '../../composables/useToast';

const props = defineProps<{
  targetId: string;
  title: string;
  data: Record<string, unknown>[];
  filename: string;
}>();

// ── Export composable ──────────────────────────────────────────────────────────
const { printChart, exportToExcel, exportToCSV, exportToPDF, exportToHTML, copyChart } =
  useChartExport();
const { addToast } = useToast();

// ── Busy state ─────────────────────────────────────────────────────────────────
const busy = ref(false);
const busyLabel = ref('Exporting');

// ── Save modal state ───────────────────────────────────────────────────────────
type ExportFormat = 'print' | 'excel' | 'csv' | 'pdf' | 'html' | 'copy' | '';

interface SaveModalState {
  visible: boolean;
  format: ExportFormat;
  label: string;
  confirmLabel: string;
  /** Whether this format produces a downloadable file (false for print/copy). */
  hasFile: boolean;
  filename: string;
  /** Human-readable directory label shown in the UI. */
  dirLabel: string;
  /** FileSystemDirectoryHandle when the user has picked a folder. */
  dirHandle: FileSystemDirectoryHandle | null;
}

const saveModal = reactive<SaveModalState>({
  visible: false,
  format: '',
  label: '',
  confirmLabel: 'Save',
  hasFile: true,
  filename: '',
  dirLabel: 'Downloads (default)',
  dirHandle: null
});

// ── Format metadata ────────────────────────────────────────────────────────────
const FORMAT_META: Record<
  string,
  { label: string; confirmLabel: string; hasFile: boolean; ext: string }
> = {
  print: { label: 'Print Chart', confirmLabel: 'Print', hasFile: false, ext: '' },
  excel: { label: 'Export Excel', confirmLabel: 'Save', hasFile: true, ext: '.xlsx' },
  csv: { label: 'Export CSV', confirmLabel: 'Save', hasFile: true, ext: '.csv' },
  pdf: { label: 'Export PDF', confirmLabel: 'Save', hasFile: true, ext: '.pdf' },
  html: { label: 'Export HTML', confirmLabel: 'Save', hasFile: true, ext: '.html' },
  copy: { label: 'Copy to Clipboard', confirmLabel: 'Copy', hasFile: false, ext: '' }
};

// ── Select change → open modal ─────────────────────────────────────────────────
function onSelectChange(event: Event) {
  const select = event.target as HTMLSelectElement;
  const format = select.value as ExportFormat;
  // Reset the select back to the placeholder so it can be chosen again
  select.value = '';

  if (!format) return;
  const meta = FORMAT_META[format];

  const safeName = props.title.replace(/\s+/g, '_');
  saveModal.visible = true;
  saveModal.format = format;
  saveModal.label = meta.label;
  saveModal.confirmLabel = meta.confirmLabel;
  saveModal.hasFile = meta.hasFile;
  saveModal.filename = meta.hasFile
    ? (format === 'excel' || format === 'csv' ? props.filename : safeName) + meta.ext
    : '';
  saveModal.dirLabel = saveModal.dirHandle ? saveModal.dirHandle.name : 'Downloads (default)';
}

// ── Directory chooser ──────────────────────────────────────────────────────────
async function chooseDirectory() {
  type ShowDirPicker = (opts?: { mode?: string }) => Promise<FileSystemDirectoryHandle>;
  const picker = (window as Window & { showDirectoryPicker?: ShowDirPicker }).showDirectoryPicker;

  if (!picker) {
    addToast('Directory picker not supported in this environment', 'info');
    return;
  }
  try {
    const handle = await picker({ mode: 'readwrite' });
    saveModal.dirHandle = handle;
    saveModal.dirLabel = handle.name;
  } catch (err) {
    if ((err as Error).name !== 'AbortError') {
      addToast('Could not open directory picker', 'error');
    }
  }
}

// ── Close modal ────────────────────────────────────────────────────────────────
/** Close when idle (user-initiated cancel/✕). */
function closeSaveModal() {
  if (busy.value) return;
  saveModal.visible = false;
  saveModal.format = '';
}

/** Force-close regardless of busy state (called after export finishes). */
function finishAndClose() {
  saveModal.visible = false;
  saveModal.format = '';
}

// ── Confirm → run export ───────────────────────────────────────────────────────
async function confirmSave() {
  const format = saveModal.format;

  // Print and copy bypass the file-save path
  if (format === 'print') {
    const result = printChart(props.targetId, props.title);
    closeSaveModal();
    addToast(result.message, result.success ? 'info' : 'error');
    return;
  }

  if (format === 'copy') {
    busy.value = true;
    busyLabel.value = 'Copying';
    try {
      const success = await copyChart(props.targetId);
      finishAndClose();
      addToast(
        success ? 'Chart copied to clipboard' : 'Copy failed — clipboard not available',
        success ? 'success' : 'error'
      );
    } finally {
      busy.value = false;
    }
    return;
  }

  // File exports — strip the extension from saveModal.filename for the
  // composable calls that append it themselves, but keep it for PDF/HTML
  // which use the title-derived name.
  const runExport = async (
    label: string,
    fn: () => Promise<{ success: boolean; message: string }>
  ) => {
    busy.value = true;
    busyLabel.value = label;
    try {
      const result = await fn();
      finishAndClose();
      if (result.message !== 'Save cancelled') {
        addToast(result.message, result.success ? 'success' : 'error');
      }
    } catch {
      finishAndClose();
      addToast('Export failed unexpectedly', 'error');
    } finally {
      busy.value = false;
    }
  };

  // Derive a bare name (without extension) for composable calls
  const meta = FORMAT_META[format];
  const bareName = saveModal.filename.endsWith(meta.ext)
    ? saveModal.filename.slice(0, -meta.ext.length)
    : saveModal.filename;

  if (format === 'excel') {
    await runExport('Preparing Excel', () => exportToExcel(props.data, bareName));
  } else if (format === 'csv') {
    await runExport('Preparing CSV', () => exportToCSV(props.data, bareName));
  } else if (format === 'pdf') {
    await runExport('Preparing PDF', () =>
      exportToPDF(props.targetId, bareName.replace(/_/g, ' '))
    );
  } else {
    // html
    await runExport('Preparing HTML', () =>
      exportToHTML(props.targetId, bareName.replace(/_/g, ' '))
    );
  }
}
</script>

<style scoped>
.chart-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-bottom: 10px;
}

/* ── Export select ─────────────────────────────────────────────────────────── */
.export-select {
  appearance: none;
  -webkit-appearance: none;
  background: var(--white, #fff)
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%230f0758' stroke-width='1.8' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")
    no-repeat right 10px center;
  border: 1px solid var(--dusty-grape, #8c6b9e);
  color: var(--deep-twilight, #0f0758);
  padding: 6px 32px 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  font-family: inherit;
  font-weight: 500;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  min-width: 158px;
}

.export-select:hover:not(:disabled) {
  border-color: var(--deep-twilight, #0f0758);
  box-shadow: 0 0 0 2px rgba(15, 7, 88, 0.1);
}

.export-select:focus {
  outline: none;
  border-color: var(--true-cobalt, #0a1f7d);
  box-shadow: 0 0 0 3px rgba(10, 31, 125, 0.18);
}

.export-select:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

/* ── Save modal ────────────────────────────────────────────────────────────── */
.save-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.15s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.save-modal {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  padding: 28px 32px;
  min-width: 340px;
  max-width: 460px;
  width: 90vw;
  animation: slideUp 0.18s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.save-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
}

.save-modal-header h3 {
  margin: 0;
  font-size: 1.15rem;
  color: var(--deep-twilight, #0f0758);
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  color: #888;
  padding: 2px 6px;
  border-radius: 4px;
  line-height: 1;
  transition: color 0.15s;
}

.close-btn:hover {
  color: var(--deep-twilight, #0f0758);
}

/* ── Fields ───────────────────────────────────────────────────────────────── */
.save-modal-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.save-modal-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.save-filename-input {
  border: 1.5px solid #d0d5ea;
  border-radius: 7px;
  padding: 8px 12px;
  font-size: 0.9rem;
  font-family: monospace;
  color: var(--deep-twilight, #0f0758);
  transition: border-color 0.18s;
  background: #fafbff;
}

.save-filename-input:focus {
  outline: none;
  border-color: var(--true-cobalt, #0a1f7d);
  box-shadow: 0 0 0 3px rgba(10, 31, 125, 0.12);
}

.save-dir-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.save-directory-path {
  flex: 1;
  font-size: 0.88rem;
  color: #555;
  background: #f4f5fb;
  border: 1.5px solid #e0e4f5;
  border-radius: 7px;
  padding: 7px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.save-browse-btn {
  background: #f4f5fb;
  border: 1.5px solid #d0d5ea;
  color: var(--deep-twilight, #0f0758);
  padding: 7px 14px;
  border-radius: 7px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  transition: all 0.18s;
}

.save-browse-btn:hover {
  background: var(--dusty-grape, #8c6b9e);
  border-color: var(--dusty-grape, #8c6b9e);
  color: #fff;
}

/* ── Action row ───────────────────────────────────────────────────────────── */
.save-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
}

.save-cancel-btn {
  background: #f4f5fb;
  border: 1.5px solid #d0d5ea;
  color: #555;
  padding: 9px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.18s;
}

.save-cancel-btn:hover {
  background: #e8eaf4;
}

.save-confirm-btn {
  background: var(--true-cobalt, #0a1f7d);
  border: none;
  color: #fff;
  padding: 9px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background 0.18s;
}

.save-confirm-btn:hover {
  background: var(--deep-twilight, #0f0758);
}

/* ── Progress (reused) ────────────────────────────────────────────────────── */
.export-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 16px 0 8px;
}

.progress-bar-track {
  width: 100%;
  height: 6px;
  background: #e8eaf4;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: var(--true-cobalt, #0a1f7d);
  border-radius: 3px;
  animation: indeterminate 1.4s ease infinite;
  width: 40%;
}

@keyframes indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(350%);
  }
}

.progress-label {
  font-size: 0.88rem;
  color: #666;
}
</style>
