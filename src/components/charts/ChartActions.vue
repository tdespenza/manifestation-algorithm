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
    <div v-if="showDialog" class="export-dialog-overlay" @click.self="showDialog = false">
      <div class="export-dialog" role="dialog" aria-modal="true" aria-label="Export options">
        <div class="export-dialog-header">
          <h3>Export Options</h3>
          <button class="close-btn" aria-label="Close" @click="showDialog = false">✕</button>
        </div>

        <div class="export-options">
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
            <span class="export-label">{{ copyLabel }}</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useChartExport } from '../../composables/useChartExport';

const props = defineProps<{
  targetId: string;
  title: string;
  data: Record<string, unknown>[];
  filename: string;
}>();

const showDialog = ref(false);
const copyLabel = ref('Copy Chart');

const { printChart, exportToExcel, exportToCSV, exportToPDF, exportToHTML, copyChart } =
  useChartExport();

const handlePrint = () => {
  showDialog.value = false;
  printChart(props.targetId, props.title);
};

const handleExcelExport = () => {
  showDialog.value = false;
  exportToExcel(props.data, props.filename);
};

const handleCSVExport = () => {
  showDialog.value = false;
  exportToCSV(props.data, props.filename);
};

const handlePDFExport = () => {
  showDialog.value = false;
  exportToPDF(props.targetId, props.title);
};

const handleHTMLExport = () => {
  showDialog.value = false;
  exportToHTML(props.targetId, props.title);
};

const handleCopyChart = async () => {
  showDialog.value = false;
  const success = await copyChart(props.targetId);
  copyLabel.value = success ? 'Copied!' : 'Copy failed';
  setTimeout(() => {
    copyLabel.value = 'Copy Chart';
  }, 2000);
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
