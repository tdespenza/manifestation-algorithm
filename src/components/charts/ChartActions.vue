<template>
  <div class="chart-actions no-print">
    <button
      class="action-btn export-trigger-btn"
      title="Export / Print Chart"
      @click="showDialog = true"
    >
      ⬇ Export / Print
    </button>
  </div>

  <!-- Export dialog -->
  <Teleport to="body">
    <div v-if="showDialog" class="export-dialog-overlay" @click.self="closeDialog">
      <div class="export-dialog" role="dialog" aria-modal="true" aria-label="Export options">
        <div class="export-dialog-header">
          <h3>Export Options</h3>
          <button class="close-btn" aria-label="Close" :disabled="busy" @click="closeDialog">
            ✕
          </button>
        </div>

        <!-- Progress bar shown while an export is in progress -->
        <div v-if="busy" class="export-progress" aria-label="Exporting...">
          <div class="progress-bar-track">
            <div class="progress-bar-fill"></div>
          </div>
          <span class="progress-label">{{ busyLabel }}…</span>
        </div>

        <div v-else class="export-options">
          <button class="export-option-btn" @click="handlePrint">
            <span class="export-icon">🖨️</span>
            <span class="export-label">Print</span>
          </button>
          <button class="export-option-btn" @click="handleExcelExport">
            <span class="export-icon">📊</span>
            <span class="export-label">Export Excel</span>
          </button>
          <button class="export-option-btn" @click="handleCSVExport">
            <span class="export-icon">📄</span>
            <span class="export-label">Export CSV</span>
          </button>
          <button class="export-option-btn" @click="handlePDFExport">
            <span class="export-icon">📑</span>
            <span class="export-label">Export PDF</span>
          </button>
          <button class="export-option-btn" @click="handleHTMLExport">
            <span class="export-icon">🌐</span>
            <span class="export-label">Export HTML</span>
          </button>
          <button class="export-option-btn" @click="handleCopyChart">
            <span class="export-icon">📋</span>
            <span class="export-label">Copy Chart</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useChartExport } from '../../composables/useChartExport';
import { useToast } from '../../composables/useToast';

const props = defineProps<{
  targetId: string;
  title: string;
  data: Record<string, unknown>[];
  filename: string;
}>();

const showDialog = ref(false);
const busy = ref(false);
const busyLabel = ref('Exporting');

const { printChart, exportToExcel, exportToCSV, exportToPDF, exportToHTML, copyChart } =
  useChartExport();
const { addToast } = useToast();

function closeDialog() {
  if (!busy.value) showDialog.value = false;
}

async function runExport(label: string, fn: () => Promise<{ success: boolean; message: string }>) {
  busy.value = true;
  busyLabel.value = label;
  try {
    const result = await fn();
    showDialog.value = false;
    if (result.message !== 'Save cancelled') {
      addToast(result.message, result.success ? 'success' : 'error');
    }
  } catch {
    showDialog.value = false;
    addToast('Export failed unexpectedly', 'error');
  } finally {
    busy.value = false;
  }
}

const handlePrint = () => {
  const result = printChart(props.targetId, props.title);
  showDialog.value = false;
  addToast(result.message, result.success ? 'info' : 'error');
};

const handleExcelExport = () =>
  runExport('Preparing Excel', () => exportToExcel(props.data, props.filename));

const handleCSVExport = () =>
  runExport('Preparing CSV', () => exportToCSV(props.data, props.filename));

const handlePDFExport = () =>
  runExport('Preparing PDF', () => exportToPDF(props.targetId, props.title));

const handleHTMLExport = () =>
  runExport('Preparing HTML', () => exportToHTML(props.targetId, props.title));

const handleCopyChart = async () => {
  busy.value = true;
  busyLabel.value = 'Copying';
  try {
    const success = await copyChart(props.targetId);
    showDialog.value = false;
    addToast(
      success ? 'Chart copied to clipboard' : 'Copy failed — clipboard not available',
      success ? 'success' : 'error'
    );
  } finally {
    busy.value = false;
  }
};
</script>

<style scoped>
.chart-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.action-btn {
  background: var(--white);
  border: 1px solid var(--dusty-grape);
  color: var(--deep-twilight);
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--dusty-grape);
  color: var(--white);
}

/* Dialog overlay */
.export-dialog-overlay {
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

.export-dialog {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  padding: 28px 32px;
  min-width: 320px;
  max-width: 420px;
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

.export-dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.export-dialog-header h3 {
  margin: 0;
  font-size: 1.2rem;
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

.close-btn:hover:not(:disabled) {
  color: var(--deep-twilight, #0f0758);
}

.close-btn:disabled {
  opacity: 0.3;
  cursor: default;
}

/* ── Progress indicator ── */
.export-progress {
  padding: 24px 0 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.progress-bar-track {
  width: 100%;
  height: 6px;
  background: #e8eaf0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  width: 40%;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--true-cobalt, #0a1f7d), var(--dusty-grape, #6061a4));
  animation: progressSlide 1.2s ease-in-out infinite;
}

@keyframes progressSlide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(350%);
  }
}

.progress-label {
  font-size: 0.85rem;
  color: #6b7a99;
  font-weight: 500;
}

/* ── Export option grid ── */
.export-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.export-option-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  background: #f8f9ff;
  border: 1.5px solid #e0e4f5;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.18s ease;
  color: var(--deep-twilight, #0f0758);
}

.export-option-btn:hover {
  background: var(--true-cobalt, #0a1f7d);
  border-color: var(--true-cobalt, #0a1f7d);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(10, 31, 125, 0.2);
}

.export-icon {
  font-size: 1.6rem;
  line-height: 1;
}

.export-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
}
</style>

<style scoped>
.chart-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.action-btn {
  background: var(--white);
  border: 1px solid var(--dusty-grape);
  color: var(--deep-twilight);
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: var(--dusty-grape);
  color: var(--white);
}

/* Dialog overlay */
.export-dialog-overlay {
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

.export-dialog {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  padding: 28px 32px;
  min-width: 320px;
  max-width: 420px;
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

.export-dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.export-dialog-header h3 {
  margin: 0;
  font-size: 1.2rem;
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

.export-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.export-option-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  background: #f8f9ff;
  border: 1.5px solid #e0e4f5;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.18s ease;
  color: var(--deep-twilight, #0f0758);
}

.export-option-btn:hover {
  background: var(--true-cobalt, #0a1f7d);
  border-color: var(--true-cobalt, #0a1f7d);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(10, 31, 125, 0.2);
}

.export-icon {
  font-size: 1.6rem;
  line-height: 1;
}

.export-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
}
</style>
