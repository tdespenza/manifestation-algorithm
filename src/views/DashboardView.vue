<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useHistoryStore } from '../stores/history';
import { useToast } from '../composables/useToast';
import ProgressChart from '../components/charts/ProgressChart.vue';
import CategoryCard from '../components/dashboard/CategoryCard.vue';
import StatsPanel from '../components/dashboard/StatsPanel.vue';
import NetworkRanking from '../components/dashboard/NetworkRanking.vue';
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
const isDeleting = ref(false);

const selectedCount = computed(() => selectedIds.value.size);
const allSelected = computed(
  () => sessions.value.length > 0 && selectedIds.value.size === sessions.value.length
);
const someSelected = computed(
  () => selectedIds.value.size > 0 && selectedIds.value.size < sessions.value.length
);

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

async function handleDeleteSession(id: string) {
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

async function handleDeleteSelected() {
  if (selectedIds.value.size === 0) return;
  const ids = [...selectedIds.value];
  isDeleting.value = true;
  try {
    await historyStore.deleteSessions(ids);
    selectedIds.value = new Set();
    addToast(`Deleted ${ids.length} session${ids.length === 1 ? '' : 's'}`, 'success');
  } catch {
    addToast('Failed to delete sessions', 'error');
  } finally {
    isDeleting.value = false;
  }
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
        <button
          v-if="selectedCount > 0"
          class="delete-selected-btn"
          :disabled="isDeleting"
          @click="handleDeleteSelected"
        >
          {{ isDeleting ? 'Deleting…' : `🗑 Delete ${selectedCount} Selected` }}
        </button>
      </div>
    </div>

    <div class="dashboard-content">
      <div v-if="isLoading" class="loading">Loading history...</div>

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
            <label class="select-all-label">
              <input
                type="checkbox"
                :checked="allSelected"
                :indeterminate="someSelected"
                @change="toggleSelectAll"
              />
              Select All
            </label>
          </div>
          <div class="session-list">
            <div
              v-for="session in sessions"
              :key="session.id"
              class="session-card"
              :class="{ selected: selectedIds.has(session.id) }"
            >
              <div class="session-card-top">
                <input
                  type="checkbox"
                  class="session-checkbox"
                  :checked="selectedIds.has(session.id)"
                  @change="toggleSelect(session.id)"
                />
                <button
                  class="delete-btn-inline"
                  title="Delete session"
                  :disabled="isDeleting"
                  @click="handleDeleteSession(session.id)"
                >
                  ✕
                </button>
              </div>
              <div class="session-date">
                {{ new Date(session.completed_at).toLocaleDateString() }}
                <span class="session-time">{{
                  new Date(session.completed_at).toLocaleTimeString()
                }}</span>
              </div>
              <div class="session-score" :class="{ high: session.total_score > 5000 }">
                {{ Math.round(session.total_score).toLocaleString() }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <p>No historical sessions found yet. Complete a questionnaire to see results here.</p>
        <router-link to="/" class="cta-button">Start New Assessment</router-link>
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

.delete-selected-btn {
  padding: 8px 16px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9em;
  font-weight: 600;
  transition: background 0.2s;
}

.delete-selected-btn:hover:not(:disabled) {
  background: #b02a37;
}

.delete-selected-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

h1 {
  font-size: 2.5rem;
  color: var(--true-cobalt, #0047ab);
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
  transition: transform 0.2s;
  border-left: 4px solid var(--true-cobalt, #0047ab);
}

.session-card.selected {
  border-left-color: #dc3545;
  background: #fff8f8;
}

.session-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.recent-sessions-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.recent-sessions-header h2 {
  margin: 0;
}

.select-all-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9em;
  color: #555;
  cursor: pointer;
  user-select: none;
}

.session-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
}

.session-checkbox {
  width: 16px;
  height: 16px;
  cursor: pointer;
  accent-color: var(--true-cobalt, #0047ab);
}

.delete-btn-inline {
  background: none;
  border: none;
  color: #ccc;
  font-size: 0.85em;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  transition: color 0.2s, background 0.2s;
  line-height: 1;
}

.delete-btn-inline:hover:not(:disabled) {
  color: #dc3545;
  background: #fff0f0;
}

.delete-btn-inline:disabled {
  opacity: 0.4;
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

.empty-state {
  text-align: center;
  padding: 4rem;
  background: #f8f9fa;
  border-radius: 12px;
  color: #666;
}

.cta-button {
  display: inline-block;
  margin-top: 1rem;
  padding: 10px 20px;
  background: var(--true-cobalt, #0047ab);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: opacity 0.2s;
}

.cta-button:hover {
  opacity: 0.9;
}
</style>
