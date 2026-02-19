<template>
  <div class="category-card" @click="goToDetail">
    <div class="card-header">
      <h3>{{ category }}</h3>
      <div v-if="currentScore !== undefined" class="current-score" :class="scoreClass">
        {{ currentScore }}
        <span v-if="trendIcon" :class="['trend-icon', trendClass]">{{ trendIcon }}</span>
      </div>
    </div>
    
    <div class="sparkline-container" v-if="trendData.length > 1">
      <Line :data="chartData" :options="chartOptions" />
    </div>
    <div v-else class="no-trend">
      <small>Not enough data for trend</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { Line } from 'vue-chartjs';
import { detectTrend } from '../../utils/analysis';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  type ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const router = useRouter();

const props = defineProps<{
  category: string;
  currentScore?: number;
  trendData: number[]; // Array of scores over time
  dates: string[]; // Corresponding dates
}>();

const goToDetail = () => {
  router.push({ name: 'CategoryDetail', params: { id: props.category } });
};

const trend = computed(() => {
  return detectTrend(props.trendData);
});

const trendIcon = computed(() => {
  if (trend.value === 'improving') return '↑';
  if (trend.value === 'declining') return '↓';
  if (trend.value === 'stable') return '→';
  return '';
});

const trendClass = computed(() => {
  if (trend.value === 'improving') return 'trend-up';
  if (trend.value === 'declining') return 'trend-down';
  return 'trend-stable';
});

const scoreClass = computed(() => {
  if (!props.currentScore) return '';
  if (props.currentScore >= 8) return 'high';
  if (props.currentScore >= 5) return 'medium';
  return 'low';
});

const isUptrend = computed(() =>
  props.trendData.length > 1
    ? props.trendData[props.trendData.length - 1] >= props.trendData[0]
    : true
);

const chartData = computed(() => ({
  labels: props.dates,
  datasets: [{
    data: props.trendData,
    borderColor: isUptrend.value ? '#000000' : '#f44336',
    borderWidth: 2,
    pointRadius: 0,
    pointHoverRadius: 4,
    fill: false,
    tension: 0.3
  }]
}));

const chartOptions: ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  normalized: true,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false }
  },
  scales: {
    x: { display: false },
    y: { display: false, min: 0, max: 10 }
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
};
</script>

<style scoped>
.category-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  display: flex;
  flex-direction: column;
  height: 160px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 8px;
}

h3 {
  margin: 0;
  font-size: 0.95rem;
  color: #555;
  font-weight: 600;
  line-height: 1.2;
}

.current-score {
  font-weight: 800;
  font-size: 1.2rem;
}

.current-score.high { color: #4caf50; }
.current-score.medium { color: #ff9800; }
.current-score.low { color: #f44336; }

.trend-icon {
  font-size: 0.8rem;
  margin-left: 4px;
  vertical-align: middle;
}
.trend-up { color: #4caf50; }
.trend-down { color: #f44336; }
.trend-stable { color: #9e9e9e; }

.sparkline-container {
  flex: 1;
  position: relative;
  width: 100%;
  overflow: hidden;
  min-height: 0;
}

.no-trend {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  font-style: italic;
}
</style>