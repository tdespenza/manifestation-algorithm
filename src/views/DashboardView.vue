<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useHistoryStore } from '../stores/history';
import { useToast } from '../composables/useToast';
import { useDateFilter } from '../composables/useDateFilter';
import { useSessionSelection } from '../composables/useSessionSelection';
import { loadAllSessionCategoryScores, type SessionCategoryScore } from '../services/db';
import ProgressChart from '../components/charts/ProgressChart.vue';
import ChartActions from '../components/charts/ChartActions.vue';
import CategoryCard from '../components/dashboard/CategoryCard.vue';
import DateRangeSelector from '../components/dashboard/DateRangeSelector.vue';
import StatsPanel from '../components/dashboard/StatsPanel.vue';
import NetworkRanking from '../components/dashboard/NetworkRanking.vue';
import FocusAreas from '../components/dashboard/FocusAreas.vue';
import SessionList from '../components/dashboard/SessionList.vue';
import { useQuestionnaireStore } from '../stores/questionnaire';
import ConfirmDialog from '../components/ui/ConfirmDialog.vue';

const historyStore = useHistoryStore();
const questionnaireStore = useQuestionnaireStore();
const { addToast } = useToast();
const isLoading = computed(() => historyStore.isLoading);
const rawSessions = computed(() => historyStore.sessions);
const rawTrends = computed(() => historyStore.trends);
const hasMoreSessions = computed(() => historyStore.hasMore);
const isLoadingMore = computed(() => historyStore.isLoadingMore);

// ── Date filter ───────────────────────────────────────────────────────────────
const { selectedRange, customStart, customEnd, todayStr, ranges, selectPreset, sessions, trends } =
  useDateFilter(rawSessions, rawTrends);

// ── Selection / delete ────────────────────────────────────────────────────────
const {
  selectedIds,
  selectionMode,
  isDeleting,
  selectedCount,
  allSelected,
  confirmVisible,
  confirmTitle,
  confirmMessage,
  onConfirmed,
  onCancelled,
  enterSelectionMode,
  exitSelectionMode,
  toggleSelect,
  toggleSelectAll,
  handleDeleteSession,
  handleDeleteSelected
} = useSessionSelection(
  sessions,
  (id: string) => historyStore.deleteSession(id),
  (ids: string[]) => historyStore.deleteSessions(ids),
  addToast
);

const categories = computed(() => {
  return Object.keys(trends.value).sort();
});

// session_id → { category → avg_score }
const categoryScoresBySession = ref<Record<string, Record<string, number>>>({});

const exportData = computed(() => {
  // Collect every category that appears in the filtered sessions
  const filteredIds = new Set(sessions.value.map(s => s.id));
  const catSet = new Set<string>();
  for (const [sid, cats] of Object.entries(categoryScoresBySession.value)) {
    if (filteredIds.has(sid)) {
      Object.keys(cats).forEach(c => catSet.add(c));
    }
  }
  const sortedCats = [...catSet].sort();

  return [...sessions.value].reverse().map(s => {
    const dt = new Date(s.completed_at);
    const catScores = categoryScoresBySession.value[s.id] ?? {};
    const row: Record<string, string | number> = {
      Date: dt.toLocaleDateString(),
      Time: dt.toLocaleTimeString(),
      'Total Score': s.total_score,
      'Duration (min)': Math.round(s.duration_seconds / 60),
      Notes: s.notes ?? ''
    };
    for (const cat of sortedCats) {
      row[cat] = catScores[cat] ?? '';
    }
    return row;
  });
});

onMounted(async () => {
  historyStore.fetchHistory();
  try {
    const rows: SessionCategoryScore[] = await loadAllSessionCategoryScores();
    const map: Record<string, Record<string, number>> = {};
    for (const row of rows) {
      if (!map[row.session_id]) map[row.session_id] = {};
      map[row.session_id][row.category] = row.avg_score;
    }
    categoryScoresBySession.value = map;
  } catch (e) {
    console.error('Failed to load category scores for export', e);
  }
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
      <h1>Manifestation Algorithm Tracking History</h1>
      <p class="subtitle">Track your progress over time</p>

      <div v-if="rawSessions.length > 0" class="controls-bar">
        <ChartActions
          target-id="dashboard-history-area"
          title="Manifestation Algorithm Tracking History"
          :data="exportData"
          :disabled="sessions.length === 0"
          filename="manifestation_history"
        />
        <DateRangeSelector
          :model-value="selectedRange"
          :ranges="ranges"
          :custom-start="customStart"
          :custom-end="customEnd"
          :today-str="todayStr"
          @update:model-value="selectPreset"
          @update:custom-start="customStart = $event"
          @update:custom-end="customEnd = $event"
        />
      </div>
    </div>

    <div class="dashboard-content">
      <div v-if="isLoading" class="loading">
        <div class="loading-spinner-icon">⏳</div>
        <p>Loading your history…</p>
      </div>

      <div v-else-if="sessions.length > 0" id="dashboard-history-area" class="history-content">
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

        <!-- Goal progress (only when a target is set and there are sessions) -->
        <div
          v-if="questionnaireStore.goalScore !== null && sessions.length > 0"
          class="goal-progress-panel"
          role="region"
          aria-label="Progress to goal"
        >
          <div class="goal-progress-header">
            <span class="goal-progress-label">Progress to Goal</span>
            <span class="goal-progress-values">
              {{ Math.round(sessions[0].total_score).toLocaleString() }}
              <span class="goal-progress-sep">/</span>
              {{ questionnaireStore.goalScore!.toLocaleString() }}
            </span>
          </div>
          <div
            class="goal-bar-track"
            role="progressbar"
            :aria-valuenow="
              Math.min(
                100,
                Math.round((sessions[0].total_score / questionnaireStore.goalScore!) * 100)
              )
            "
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              class="goal-bar-fill"
              :class="{ achieved: sessions[0].total_score >= questionnaireStore.goalScore! }"
              :style="{
                width:
                  Math.min(
                    100,
                    Math.round((sessions[0].total_score / questionnaireStore.goalScore!) * 100)
                  ) + '%'
              }"
            />
          </div>
          <p class="goal-bar-pct">
            {{
              Math.min(
                100,
                Math.round((sessions[0].total_score / questionnaireStore.goalScore!) * 100)
              )
            }}% of goal
            <span v-if="sessions[0].total_score >= questionnaireStore.goalScore!" class="goal-badge"
              >🎯 Goal Reached!</span
            >
          </p>
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

        <FocusAreas :trends="trends" class="focus-areas-section" />

        <SessionList
          :sessions="sessions"
          :is-deleting="isDeleting"
          :selection-mode="selectionMode"
          :selected-ids="selectedIds"
          :all-selected="allSelected"
          :selected-count="selectedCount"
          :has-more="hasMoreSessions"
          :is-loading-more="isLoadingMore"
          :remaining="historyStore.totalCount - rawSessions.length"
          @delete-session="handleDeleteSession"
          @delete-selected="handleDeleteSelected"
          @toggle-select="toggleSelect"
          @toggle-select-all="toggleSelectAll"
          @enter-selection="enterSelectionMode"
          @exit-selection="exitSelectionMode"
          @load-more="historyStore.loadMoreSessions()"
        />
      </div>

      <div v-else class="empty-state">
        <template v-if="rawSessions.length > 0">
          <div class="empty-icon">🔍</div>
          <h2 class="empty-title">No sessions in this range</h2>
          <p class="empty-desc">Try a wider range or select a different period.</p>
        </template>
        <template v-else>
          <div class="empty-icon">✨</div>
          <h2 class="empty-title">No sessions yet</h2>
          <p class="empty-desc">
            Complete your first assessment to see your progress and trends here.
          </p>
          <router-link to="/" class="cta-button">Start First Assessment</router-link>
        </template>
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

.dashboard-header h1 {
  color: var(--color-heading, #2c3e50);
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

.controls-bar :deep(.chart-actions) {
  margin-bottom: 0;
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
  color: var(--color-heading, #2c3e50);
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

.chart-section {
  min-width: 0;
}

.category-grid-section h2 {
  margin-bottom: 16px;
  margin-top: 0;
  color: var(--color-heading, #2c3e50);
}

.focus-areas-section {
  margin-top: 32px;
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
  color: #4b5563;
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

/* ── Goal progress panel ──────────────────────────────────────────────────── */

.goal-progress-panel {
  margin: 1.5rem 0;
  padding: 1.25rem 1.5rem;
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
}

.goal-progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.goal-progress-label {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--true-cobalt, #0a1f7d);
}

.goal-progress-values {
  font-size: 0.9rem;
  font-weight: 600;
  color: #374151;
}

.goal-progress-sep {
  color: #9ca3af;
  margin: 0 0.2em;
}

.goal-bar-track {
  height: 10px;
  background: #e5e7eb;
  border-radius: 99px;
  overflow: hidden;
}

.goal-bar-fill {
  height: 100%;
  background: var(--true-cobalt, #0a1f7d);
  border-radius: 99px;
  transition: width 0.5s ease;
}

.goal-bar-fill.achieved {
  background: #16a34a;
}

.goal-bar-pct {
  margin-top: 0.45rem;
  font-size: 0.82rem;
  color: #6b7280;
}

.goal-badge {
  margin-left: 0.5em;
  font-weight: 600;
  color: #16a34a;
}
</style>
