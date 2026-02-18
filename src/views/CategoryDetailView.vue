<template>
  <div class="category-detail-view" v-if="categoryData">
    <header class="view-header">
      <button class="back-btn" @click="$router.back()">← Back</button>
      <h1>{{ category }}</h1>
    </header>

    <div class="detail-content">
      <div class="main-chart-container">
        <Line :data="chartData" :options="chartOptions" />
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
              <td :class="getScoreClass(entry.score)">{{ entry.score }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-else class="loading">
    Loading... <button @click="$router.push('/dashboard')">Go to Dashboard</button>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useHistoryStore } from '../stores/history';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const route = useRoute();
const historyStore = useHistoryStore();
const category = ref('');

onMounted(async () => {
  category.value = route.params.id as string;
  if (!historyStore.sessions.length) {
    await historyStore.loadHistory();
  }
});

const categoryData = computed(() => {
  if (!category.value || !historyStore.categoryTrends) return [];
  return historyStore.categoryTrends[category.value] || [];
});

const reversedHistory = computed(() => {
  return [...categoryData.value].reverse();
});

const chartData = computed(() => {
  const data = categoryData.value;
  return {
    labels: data.map(d => new Date(d.date).toLocaleDateString()),
    datasets: [
      {
        label: category.value,
        data: data.map(d => d.score),
        borderColor: '#42b983',
        backgroundColor: 'rgba(66, 185, 131, 0.2)',
        tension: 0.2,
        fill: true
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
        color: '#333'
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
</script>

<style scoped>
.category-detail-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  color: #fff;
}

.view-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.back-btn {
  background: none;
  border: 1px solid #666;
  color: #ccc;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
}

.back-btn:hover {
  background: #333;
  color: #fff;
}

.detail-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
}

.main-chart-container {
  background: #1e1e1e;
  padding: 1.5rem;
  border-radius: 8px;
  height: 400px;
}

.data-table-container {
  background: #1e1e1e;
  padding: 1.5rem;
  border-radius: 8px;
  max-height: 400px;
  overflow-y: auto;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
}

.history-table th,
.history-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #333;
}

.history-table th {
  color: #888;
  font-weight: normal;
}

.high-score { color: #42b983; font-weight: bold; }
.med-score { color: #f1c40f; }
.low-score { color: #e74c3c; }

@media (max-width: 768px) {
  .detail-content {
    grid-template-columns: 1fr;
  }
}
</style>
