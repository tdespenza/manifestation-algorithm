<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useHistoryStore } from '../stores/history';
import ProgressChart from '../components/charts/ProgressChart.vue';
import CategoryCard from '../components/dashboard/CategoryCard.vue';
import StatsPanel from '../components/dashboard/StatsPanel.vue';
import NetworkRanking from '../components/dashboard/NetworkRanking.vue';
import { exportToCSV } from '../services/export';

const historyStore = useHistoryStore();
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
  
  const filtered: Record<string, typeof rawTrends.value[string]> = {};
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
      
      <div class="controls-bar" v-if="sessions.length > 0">
        <div class="range-selector">
          <label>Range:</label>
          <select v-model="selectedRange">
            <option v-for="range in ranges" :key="range.value" :value="range.value">{{ range.label }}</option>
          </select>
        </div>
        <button @click="exportData" class="export-btn">
          📥 Export CSV
        </button>
      </div>
    </div>
    
    <div class="dashboard-content">
      <div v-if="isLoading" class="loading">Loading history...</div>
      
      <div v-else-if="sessions.length > 0" class="history-content">
        <div class="stats-overview">
          <StatsPanel :sessions="sessions" />
          <NetworkRanking />
        </div>

        <div class="chart-section">
          <h2>Progress Trend</h2>
          <ProgressChart :sessions="sessions" />
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
          <h2>Recent Sessions</h2>
          <div class="session-list">
            <div v-for="session in sessions" :key="session.id" class="session-card">
              <div class="session-date">
                {{ new Date(session.completed_at).toLocaleDateString() }}
                <span class="session-time">{{ new Date(session.completed_at).toLocaleTimeString() }}</span>
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
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 2rem;
  text-align: center;
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
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.range-selector select {
  border: none;
  background: transparent;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
}

.export-btn {
  position: absolute;
  right: 0;
  top: 0;
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

h1 {
  font-size: 2.5rem;
  color: var(--true-cobalt, #0047AB);
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.history-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats-overview {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  align-items: start;
}

@media (max-width: 900px) {
  .stats-overview {
    grid-template-columns: 1fr;
  }
}

.category-grid-section h2 {
  margin-bottom: 20px;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.chart-section {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.session-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.session-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  transition: transform 0.2s;
}

.session-card:hover {
  transform: translateY(-2px);
}

.session-date {
  display: flex;
  flex-direction: column;
  font-weight: 500;
}

.session-time {
  font-size: 0.8em;
  color: #888;
}

.session-score {
  font-weight: 800;
  font-size: 1.2em;
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
  background: var(--true-cobalt, #0047AB);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: opacity 0.2s;
}

.cta-button:hover {
  opacity: 0.9;
}
</style>