<template>
  <div class="chart-actions">
    <button
      class="action-btn"
      :title="isFullscreen ? 'Exit full screen' : 'View full screen'"
      :aria-label="isFullscreen ? 'Exit full screen' : 'View full screen'"
      :disabled="props.disabled"
      @click="toggleFullscreen"
    >
      <svg
        v-if="!isFullscreen"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="15 3 21 3 21 9" />
        <polyline points="9 21 3 21 3 15" />
        <line x1="21" y1="3" x2="14" y2="10" />
        <line x1="3" y1="21" x2="10" y2="14" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="4 14 10 14 10 20" />
        <polyline points="20 10 14 10 14 4" />
        <line x1="10" y1="14" x2="3" y2="21" />
        <line x1="21" y1="3" x2="14" y2="10" />
      </svg>
    </button>

    <button
      class="action-btn"
      title="Copy Chart"
      aria-label="Copy Chart"
      :disabled="busy || props.disabled"
      @click="onCopyChart"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    </button>

    <select
      class="export-select"
      :disabled="busy || props.disabled"
      aria-label="Export chart"
      @change="onSelectChange"
    >
      <option value="" disabled selected>⬇ Export</option>
      <option value="excel">📊 Export Excel</option>
      <option value="csv">📄 Export CSV</option>
      <option value="pdf">📑 Export PDF</option>
      <option value="html">🌐 Export HTML</option>
    </select>

    <Teleport v-if="isFullscreen" :to="'#' + targetId">
      <button
        class="exit-fullscreen-btn"
        title="Exit full screen"
        aria-label="Exit full screen"
        @click="toggleFullscreen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="4 14 10 14 10 20" />
          <polyline points="20 10 14 10 14 4" />
          <line x1="10" y1="14" x2="3" y2="21" />
          <line x1="21" y1="3" x2="14" y2="10" />
        </svg>
      </button>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useChartExport } from '../../composables/useChartExport';
import { useToast } from '../../composables/useToast';

const props = defineProps<{
  targetId: string;
  title: string;
  data: Record<string, unknown>[];
  filename: string;
  disabled?: boolean;
}>();

const { exportToExcel, exportToCSV, exportToPDF, exportToHTML, copyChart } = useChartExport();
const { addToast } = useToast();

const busy = ref(false);
const isFullscreen = ref(false);

// ── Full screen ────────────────────────────────────────────────────────────────
function getChartContainer(): HTMLElement | null {
  return document.getElementById(props.targetId);
}

function toggleFullscreen() {
  const el = getChartContainer();
  if (!el) return;

  if (!isFullscreen.value) {
    if (el.requestFullscreen) {
      el.requestFullscreen().catch(err => {
        console.error('Fullscreen API failed, using CSS fallback', err);
        el.classList.add('fullscreen-fallback');
        isFullscreen.value = true;
      });
    } else {
      el.classList.add('fullscreen-fallback');
      isFullscreen.value = true;
    }
  } else {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(console.error);
    } else {
      el.classList.remove('fullscreen-fallback');
      isFullscreen.value = false;
    }
  }
}

function onFullscreenChange() {
  isFullscreen.value = !!document.fullscreenElement;
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isFullscreen.value) {
    toggleFullscreen();
  }
}

onMounted(() => {
  document.addEventListener('fullscreenchange', onFullscreenChange);
  document.addEventListener('keydown', onKeyDown);
});
onUnmounted(() => {
  document.removeEventListener('fullscreenchange', onFullscreenChange);
  document.removeEventListener('keydown', onKeyDown);
});

// ── Copy Chart ─────────────────────────────────────────────────────────────────
async function onCopyChart() {
  busy.value = true;
  try {
    const success = await copyChart(props.targetId);
    addToast(
      success ? 'Chart copied to clipboard' : 'Copy failed — clipboard not available',
      success ? 'success' : 'error'
    );
  } finally {
    busy.value = false;
  }
}

// ── Export select ──────────────────────────────────────────────────────────────
type ExportFormat = 'excel' | 'csv' | 'pdf' | 'html';

async function onSelectChange(event: Event) {
  const select = event.target as HTMLSelectElement;
  const format = select.value as ExportFormat;
  select.value = '';

  if (!format) return;

  // File exports — saveWithPicker opens the OS save dialog directly
  const safeName = props.title.replace(/\s+/g, ' ');
  const baseName = props.filename || props.title.replace(/\s+/g, '_');

  busy.value = true;
  try {
    let result: { success: boolean; message: string };

    if (format === 'excel') {
      result = await exportToExcel(props.data, baseName);
    } else if (format === 'csv') {
      result = await exportToCSV(props.data, baseName);
    } else if (format === 'pdf') {
      result = await exportToPDF(props.targetId, safeName);
    } else {
      result = await exportToHTML(props.targetId, safeName);
    }

    if (result.message !== 'Save cancelled') {
      addToast(result.message, result.success ? 'success' : 'error');
    }
  } catch (err) {
    console.error(err);
    addToast('Export failed unexpectedly', 'error');
  } finally {
    busy.value = false;
  }
}
</script>

<style scoped>
.chart-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 10px;
}

/* ── Action buttons ─────────────────────────────────────────────────────── */
.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  background: var(--white, #fff);
  border: 1px solid var(--dusty-grape, #8c6b9e);
  border-radius: 6px;
  color: var(--deep-twilight, #0f0758);
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  flex-shrink: 0;
}

.action-btn:hover:not(:disabled) {
  border-color: var(--deep-twilight, #0f0758);
  box-shadow: 0 0 0 2px rgba(15, 7, 88, 0.1);
}

.action-btn:focus {
  outline: none;
  border-color: var(--true-cobalt, #0a1f7d);
  box-shadow: 0 0 0 3px rgba(10, 31, 125, 0.18);
}

.action-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ── Exit Fullscreen Button (Teleported) ────────────────────────────────── */
.exit-fullscreen-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 10000;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  background: var(--white, #fff);
  border: 1px solid var(--dusty-grape, #8c6b9e);
  border-radius: 50%;
  color: var(--deep-twilight, #0f0758);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.exit-fullscreen-btn:hover {
  background: var(--bg-gradient, #f5f7fa);
  transform: scale(1.05);
}

.exit-fullscreen-btn:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(10, 31, 125, 0.3);
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
</style>
