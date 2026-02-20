<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useHistoryStore } from '../stores/history';
import { useToast } from '../composables/useToast';
import ProgressChart from '../components/charts/ProgressChart.vue';
import CategoryCard from '../components/dashboard/CategoryCard.vue';
import StatsPanel from '../components/dashboard/StatsPanel.vue';
import NetworkRanking from '../components/dashboard/NetworkRanking.vue';
import ConfirmDialog from '../components/ui/ConfirmDialog.vue';
import { exportToCSV } from '../services/export';

const historyStore = useHistoryStore();
const { addToast } = useToast();
const isLoading = computed(() => historyStore.isLoading);
const rawSessions = computed(() => historyStore.sessions);
const rawTrends = computed(() => historyStore.trends);

const selectedRange = ref('30d'); // Default to 30 days
const ranges = [
  { label: '7 Days', value: '7d' },
  { label: '30 Days', value: '30d' },
  { label: '90 Days', value: '90d' },
  { label: '1 Year', value: '1y' },
  { label: 'All Time', value: 'all' }
];

// ── Selection state ──────────────────────────────────────────────────────────
const selectedIds = ref<Set<string>>(new Set());
const selectionMode = ref(false);
const isDeleting = ref(false);

const selectedCount = computed(() => selectedIds.value.size);
const allSelected = computed(
  () => sessions.value.length > 0 && selectedIds.value.size === sessions.value.length
);

// ── Confirmation dialog state ─────────────────────────────────────────────────
const confirmVisible = ref(false);
const confirmTitle = ref('');
const confirmMessage = ref('');
const confirmAction = ref<(() => Promise<void>) | null>(null);

function showConfirm(title: string, message: string, action: () => Promise<void>) {
  confirmTitle.value = title;
  confirmMessage.value = message;
  confirmAction.value = action;
  confirmVisible.value = true;
}

async function onConfirmed() {
  confirmVisible.value = false;
  if (confirmAction.value) await confirmAction.value();
}

function onCancelled() {
  confirmVisible.value = false;
  confirmAction.value = null;
}

function enterSelectionMode() {
  selectionMode.value = true;
}

function exitSelectionMode() {
  selectionMode.value = false;
  selectedIds.value = new Set();
}

function toggleSelect(id: string) {
  const updated = new Set(selectedIds.value);
  if (updated.has(id)) updated.delete(id);
  else updated.add(id);
  selectedIds.value = updated;
}

function toggleSelectAll() {
  if (allSelected.value) {
    selectedIds.value = new Set();
  } else {
    selectedIds.value = new Set(sessions.value.map(s => s.id));
  }
}

async function doDeleteSession(id: string) {
  isDeleting.value = true;
  try {
    await historyStore.deleteSession(id);
    const updated = new Set(selectedIds.value);
    updated.delete(id);
    selectedIds.value = updated;
    addToast('Session deleted', 'success');
  } catch {
    addToast('Failed to delete session', 'error');
  } finally {
    isDeleting.value = false;
  }
}

function handleDeleteSession(id: string) {
  showConfirm(
    'Delete Session',
    'Are you sure you want to permanently delete this session? This cannot be undone.',
    () => doDeleteSession(id)
  );
}

async function doDeleteSelected(ids: string[]) {
  isDeleting.value = true;
  try {
    await historyStore.deleteSessions(ids);
    exitSelectionMode();
    addToast(`Deleted ${ids.length} session${ids.length === 1 ? '' : 's'}`, 'success');
  } catch {
    addToast('Failed to delete sessions', 'error');
  } finally {
    isDeleting.value = false;
  }
}

function handleDeleteSelected() {
  if (selectedIds.value.size === 0) return;
  const ids = [...selectedIds.value];
  const count = ids.length;
  showConfirm(
    `Delete ${count} Session${count === 1 ? '' : 's'}`,
    `Are you sure you want to permanently delete ${count === 1 ? 'this session' : `these ${count} sessions`}? This cannot be undone.`,
    () => doDeleteSelected(ids)
  );
}

const getCutoffDate = () => {
  const now = new Date();
  if (selectedRange.value === '7d') now.setDate(now.getDate() - 7);
  else if (selectedRange.value === '30d') now.setDate(now.getDate() - 30);
  else if (selectedRange.value === '90d') now.setDate(now.getDate() - 90);
  else if (selectedRange.value === '1y') now.setFullYear(now.getFullYear() - 1);
  else return null; // All time
  return now;
};

const sessions = computed(() => {
  const cutoff = getCutoffDate();
  if (!cutoff) return rawSessions.value;
  return rawSessions.value.filter(s => new Date(s.completed_at) >= cutoff);
});

const trends = computed(() => {
  const cutoff = getCutoffDate();
  if (!cutoff) return rawTrends.value;

  const filtered: Record<string, (typeof rawTrends.value)[string]> = {};
  for (const [cat, points] of Object.entries(rawTrends.value)) {
    const p = points.filter(p => new Date(p.date) >= cutoff);
    if (p.length > 0) {
      filtered[cat] = p;
    }
  }
  return filtered;
});

const categories = computed(() => {
  return Object.keys(trends.value).sort();
});

const exportData = async () => {
  try {
    await exportToCSV();
  } catch (e) {
    alert('Export failed: ' + e);
  }
};

onMounted(() => {
  historyStore.fetchHistory();
});
</script>

<template>
  <div class="dashboard-view">
    <ConfirmDialog
      v-if="confirmVisible"
      :title="confirmTitle"
      :message="confirmMessage"
      uid="delete-session"
      @confirm="onConfirmed"
      @cancel="onCancelled"
    />
    <div class="dashboard-header">
      <h1>Manifestation History</h1>
      <p class="subtitle">Track your progress over time</p>

      <div v-if="sessions.length > 0" class="controls-bar">
        <div class="range-selector">
          <label for="range-select">Range:</label>
          <select id="range-select" v-model="selectedRange">
            <option v-for="range in ranges" :key="range.value" :value="range.value">
              {{ range.label }}
            </option>
          </select>
        </div>
        <button class="export-btn" @click="exportData">📥 Export CSV</button>
      </div>
    </div>

    <div class="dashboard-content">
      <div v-if="isLoading" class="loading">
        <div class="loading-spinner-icon">⏳</div>
        <p>Loading your history…</p>
      </div>

      <div v-else-if="sessions.length > 0" class="history-content">
        <div class="top-row">
          <div class="stats-overview">
            <StatsPanel :sessions="sessions" />
            <NetworkRanking />
          </div>

          <div class="chart-section">
            <h2>Progress Trend</h2>
            <ProgressChart :sessions="sessions" />
          </div>
        </div>

        <div class="category-grid-section">
          <h2>Category Breakdown</h2>
          <div class="category-grid">
            <CategoryCard
              v-for="cat in categories"
              :key="cat"
              :category="cat"
              :trend-data="trends[cat].map(t => t.value)"
              :dates="trends[cat].map(t => new Date(t.date).toLocaleDateString())"
              :current-score="trends[cat][trends[cat].length - 1]?.value"
            />
          </div>
        </div>

        <div class="recent-sessions">
          <div class="recent-sessions-header">
            <h2>Recent Sessions</h2>
            <div class="sessions-header-actions">
              <template v-if="selectionMode">
                <button class="select-all-pill" @click="toggleSelectAll">
                  {{ allSelected ? 'Deselect All' : 'Select All' }}
                </button>
                <button
                  v-if="selectedCount > 0"
                  class="delete-selected-btn-sm"
                  :disabled="isDeleting"
                  @click="handleDeleteSelected"
                >
                  {{ isDeleting ? 'Deleting…' : `Delete ${selectedCount}` }}
                </button>
                <button class="cancel-select-btn" @click="exitSelectionMode">Cancel</button>
              </template>
              <button v-else class="select-mode-btn" @click="enterSelectionMode">Select</button>
            </div>
          </div>
          <div class="session-list">
            <div
              v-for="session in sessions"
              :key="session.id"
              class="session-card"
              :class="{
                selected: selectedIds.has(session.id),
                'selection-mode': selectionMode
              }"
              @click="selectionMode ? toggleSelect(session.id) : undefined"
            >
              <!-- Check badge (selection mode only) -->
              <div
                v-if="selectionMode"
                class="session-check"
                :class="{ checked: selectedIds.has(session.id) }"
              >
                <span v-if="selectedIds.has(session.id)" class="check-symbol">✓</span>
              </div>

              <!-- Individual delete (normal mode, hover only) -->
              <button
                v-else
                class="delete-btn-inline"
                title="Delete session"
                :disabled="isDeleting"
                @click.stop="handleDeleteSession(session.id)"
              >
                ✕
              </button>

              <div class="session-date">
                {{ new Date(session.completed_at).toLocaleDateString() }}
                <span class="session-time">{{
                  new Date(session.completed_at).toLocaleTimeString()
                }}</span>
              </div>
              <div class="session-score" :class="{ high: session.total_score > 5000 }">
                {{ Math.round(session.total_score).toLocaleString() }}
              </div>
              <div
                class="session-score-label"
                :class="{
                  'label-high': session.total_score > 7000,
                  'label-mid': session.total_score >= 4000 && session.total_score <= 7000,
                  'label-low': session.total_score < 4000
                }"
              >
                {{
                  session.total_score > 7000
                    ? 'Excellent'
                    : session.total_score >= 4000
                      ? 'Good'
                      : 'Needs Work'
                }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <div class="empty-icon">✨</div>
        <h3 class="empty-title">No sessions yet</h3>
        <p class="empty-desc">
          Complete your first assessment to see your progress and trends here.
        </p>
        <router-link to="/" class="cta-button">Start First Assessment</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-view {
  padding: 24px 0;
  max-width: 100%;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 2rem;
  text-align: center;
  padding: 0 24px;
}

.dashboard-content {
  width: 100%;
  padding: 0 24px;
  box-sizing: border-box;
}

.controls-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.range-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.range-selector select {
  border: none;
  background: transparent;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
}

.export-btn {
  padding: 8px 16px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  color: #555;
  transition: all 0.2s;
}

.export-btn:hover {
  background: #f8f9fa;
  border-color: #ccc;
}

/* ── Recent sessions header ── */
.recent-sessions-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.recent-sessions-header h2 {
  margin: 0;
}

.sessions-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.select-mode-btn {
  padding: 6px 16px;
  background: transparent;
  border: 1.5px solid #bbb;
  border-radius: 20px;
  color: #555;
  font-size: 0.85em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  letter-spacing: 0.03em;
}

.select-mode-btn:hover {
  border-color: var(--true-cobalt, #0a1f7d);
  color: var(--true-cobalt, #0a1f7d);
}

.select-all-pill {
  padding: 5px 12px;
  background: rgba(0, 71, 171, 0.08);
  border: none;
  border-radius: 20px;
  color: var(--true-cobalt, #0a1f7d);
  font-size: 0.82em;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.select-all-pill:hover {
  background: rgba(0, 71, 171, 0.16);
}

.delete-selected-btn-sm {
  padding: 5px 14px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 0.82em;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
}

.delete-selected-btn-sm:hover:not(:disabled) {
  background: #b02a37;
}

.delete-selected-btn-sm:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.cancel-select-btn {
  padding: 5px 12px;
  background: transparent;
  border: none;
  color: #888;
  font-size: 0.82em;
  font-weight: 600;
  cursor: pointer;
  border-radius: 20px;
  transition:
    background 0.15s,
    color 0.15s;
}

.cancel-select-btn:hover {
  background: #f0f0f0;
  color: #333;
}

/* ── Session card redesign ── */

h1 {
  font-size: 2.5rem;
  color: var(--true-cobalt, #0a1f7d);
  margin-bottom: 0.5rem;
}

h2 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #2c3e50;
  font-size: 1.3rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

/* ── Responsive layout ── */
.history-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.stats-overview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  align-items: start;
}

/* Large screens: stats + chart share a row */
@media (min-width: 1200px) {
  .top-row {
    display: grid;
    grid-template-columns: 380px 1fr;
    gap: 1.5rem;
    align-items: start;
  }

  .stats-overview {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 1000px) {
  .stats-overview {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 900px) {
  .stats-overview {
    grid-template-columns: 1fr;
  }
}

.category-grid-section h2 {
  margin-bottom: 16px;
  margin-top: 0;
  color: #2c3e50;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

@media (min-width: 1400px) {
  .category-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (min-width: 1800px) {
  .category-grid {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
}

.chart-section {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

@media (min-width: 1200px) {
  .chart-section {
    padding: 28px 32px;
  }
}

.recent-sessions {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.session-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

@media (min-width: 1400px) {
  .session-list {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

.session-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    border-color 0.2s;
  border-left: 4px solid var(--true-cobalt, #0a1f7d);
  position: relative;
}

.session-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.session-card.selection-mode {
  cursor: pointer;
}

.session-card.selection-mode:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
}

.session-card.selected {
  border-left-color: #43a047;
  background: #f6fff7;
}

/* Circular check badge */
.session-check {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #ccc;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    border-color 0.15s,
    background 0.15s;
  flex-shrink: 0;
}

.session-check.checked {
  border-color: #43a047;
  background: #43a047;
}

.check-symbol {
  color: white;
  font-size: 0.75rem;
  font-weight: 800;
  line-height: 1;
}

/* Inline delete (hover-reveal, normal mode) */
.delete-btn-inline {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: #d0d0d0;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 4px;
  opacity: 0;
  transition:
    opacity 0.15s,
    color 0.15s,
    background 0.15s;
  line-height: 1;
}

.session-card:hover .delete-btn-inline {
  opacity: 1;
}

.delete-btn-inline:hover:not(:disabled) {
  color: #dc3545;
  background: #fff0f0;
}

.delete-btn-inline:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.session-date {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 8px;
  font-weight: 600;
  margin-bottom: 8px;
}

.session-time {
  font-size: 0.8em;
  color: #888;
}

.session-score {
  font-weight: 800;
  font-size: 1.5em;
  color: #555;
}

.session-score.high {
  color: #4caf50;
}

.session-score-label {
  font-size: 0.72em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 2px;
  padding: 2px 8px;
  border-radius: 10px;
  display: inline-block;
}

.label-high {
  background: #e8f5e9;
  color: #2e7d32;
}

.label-mid {
  background: #fff3e0;
  color: #e65100;
}

.label-low {
  background: #ffebee;
  color: #c62828;
}

.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.empty-icon {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  line-height: 1;
}

.empty-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--true-cobalt, #0a1f7d);
  margin-bottom: 0.5rem;
}

.empty-desc {
  color: #888;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  max-width: 380px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.5;
}

.cta-button {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 12px 28px;
  background: var(--true-cobalt, #0a1f7d);
  color: white;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.95rem;
  transition:
    opacity 0.2s,
    transform 0.2s;
  box-shadow: 0 4px 14px rgba(10, 31, 125, 0.3);
}

.cta-button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 4rem;
  color: #999;
  font-size: 0.95rem;
}

.loading-spinner-icon {
  font-size: 2rem;
  animation: spin 1.8s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
