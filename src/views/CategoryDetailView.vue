<template>
  <div v-if="categoryData.length > 0" class="category-detail-view">
    <header class="view-header">
      <button class="back-btn" @click="$router.back()">‹ Back</button>
      <h1>{{ category }}</h1>
    </header>

    <div class="detail-content">
      <div class="chart-section">
        <ChartActions
          target-id="category-chart-area"
          :title="`${category} Trend`"
          :data="exportData"
          :filename="`${category.replace(/\\s+/g, '_')}_trend`"
        />
        <div id="category-chart-area" class="main-chart-container">
          <Line :data="chartData" :options="chartOptions" />
        </div>
      </div>

      <div class="data-table-container">
        <h3>History</h3>
        <table class="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entry, index) in reversedHistory" :key="index">
              <td>{{ formatDate(entry.date) }}</td>
              <td :class="getScoreClass(entry.value)">{{ formatScore(entry.value) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    <span v-if="historyStore.isLoading">Loading...</span>
    <span v-else>No data found for "{{ category }}".</span>
    <button @click="$router.push('/dashboard')">Go to Dashboard</button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useHistoryStore } from '../stores/history';
import { Line } from 'vue-chartjs';
import ChartActions from '../components/charts/ChartActions.vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ScriptableLineSegmentContext
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const route = useRoute();
const historyStore = useHistoryStore();
const category = ref('');

onMounted(async () => {
  category.value = route.params.id as string;
  if (!historyStore.sessions.length) {
    await historyStore.fetchHistory();
  }
});

const categoryData = computed(() => {
  if (!category.value || !historyStore.trends) return [];
  return historyStore.trends[category.value] || [];
});

const reversedHistory = computed(() => {
  return [...categoryData.value].reverse();
});

const chartData = computed(() => {
  const data = categoryData.value;
  const isDowntrend = data.length > 1 && data[data.length - 1].value < data[0].value;
  return {
    labels: data.map(d => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: category.value,
        data: data.map(d => d.value),
        borderColor: isDowntrend ? '#f44336' : '#000000',
        backgroundColor: 'transparent',
        tension: 0.2,
        fill: false,
        segment: {
          borderColor: (ctx: ScriptableLineSegmentContext) =>
            (ctx.p1.parsed.y ?? 0) >= (ctx.p0.parsed.y ?? 0) ? '#000000' : '#f44336'
        }
      }
    ]
  };
});

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: 'index',
      intersect: false
    }
  },
  scales: {
    y: {
      min: 0,
      max: 10,
      ticks: {
        stepSize: 1
      },
      grid: {
        color: '#e0e0e0'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString();
};

const getScoreClass = (score: number) => {
  if (score >= 8) return 'high-score';
  if (score >= 5) return 'med-score';
  return 'low-score';
};

const formatScore = (score: number) => Number(score).toFixed(2);

const exportData = computed(() => {
  return reversedHistory.value.map(entry => ({
    Date: new Date(entry.date).toLocaleDateString(),
    Time: new Date(entry.date).toLocaleTimeString(),
    Score: Number(entry.value).toFixed(2)
  }));
});
</script>

<style scoped>
.category-detail-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: var(--deep-twilight, #0f0758);
}

.view-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: white;
  border: 1px solid #e0e0e0;
  color: #555;
  padding: 0.5rem 1.1rem;
  cursor: pointer;
  border-radius: 25px;
  font-size: 0.88rem;
  font-weight: 600;
  transition: all 0.18s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.back-btn:hover {
  background: var(--true-cobalt, #0a1f7d);
  border-color: var(--true-cobalt, #0a1f7d);
  color: white;
  transform: translateX(-2px);
}

.detail-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.chart-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-chart-container {
  background: white;
  padding: 1.5rem;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  height: 400px;
}

.data-table-container {
  background: white;
  padding: 1.5rem;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  max-height: 400px;
  overflow-y: auto;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
}

.history-table th,
.history-table td {
  padding: 0.62rem 0.75rem;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  color: #333;
}

.history-table th {
  color: #888;
  font-weight: 700;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.history-table tr:last-child td {
  border-bottom: none;
}

.history-table tbody tr:hover {
  background: #fafbff;
}

.high-score {
  color: #2e7d32;
  font-weight: bold;
}
.med-score {
  color: #e65100;
}
.low-score {
  color: #c62828;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem;
  color: #666;
}

@media (max-width: 768px) {
  .detail-content {
    grid-template-columns: 1fr;
  }
}
</style>
