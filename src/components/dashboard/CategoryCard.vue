<template>
  <button
    type="button"
    class="category-card"
    :class="`trend-${trend}`"
    :aria-label="`Open details for ${category}`"
    @click="goToDetail"
  >
    <div class="card-header">
      <h3>{{ category }}</h3>
      <div v-if="currentScore !== undefined" class="current-score" :class="scoreClass">
        {{ currentScore }}
        <span v-if="trendIcon" :class="['trend-icon', trendClass]">{{ trendIcon }}</span>
      </div>
    </div>

    <div v-if="trendData.length > 1" class="sparkline-container">
      <Line :data="chartData" :options="chartOptions" />
    </div>
    <div v-else class="no-trend">
      <small>Not enough data</small>
    </div>
  </button>
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
  type ChartOptions,
  type ScriptableLineSegmentContext
} from 'chart.js';

const props = defineProps<{
  category: string;
  currentScore?: number;
  trendData: number[]; // Array of scores over time
  dates: string[]; // Corresponding dates
}>();

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const router = useRouter();

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

const chartData = computed(() => {
  const isDowntrend =
    props.trendData.length > 1 && props.trendData[props.trendData.length - 1] < props.trendData[0];
  return {
    labels: props.dates,
    datasets: [
      {
        data: props.trendData,
        borderColor: isDowntrend ? '#f44336' : '#000000',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        fill: false,
        tension: 0.3,
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
    intersect: false
  }
};
</script>

<style scoped>
.category-card {
  border: none;
  background: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  height: 160px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  border-left: 3px solid #e0e0e0;
}

/* Trend-colored border */
.category-card.trend-improving {
  border-left-color: #4caf50;
}

.category-card.trend-declining {
  border-left-color: #f44336;
}

.category-card.trend-stable {
  border-left-color: #9e9e9e;
}

.category-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
  gap: 8px;
}

h3 {
  margin: 0;
  font-size: 0.88rem;
  color: #444;
  font-weight: 600;
  line-height: 1.3;
}

.current-score {
  font-weight: 800;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 2px;
}

.current-score.high {
  color: #2e7d32;
}
.current-score.medium {
  color: #e65100;
}
.current-score.low {
  color: #c62828;
}

.trend-icon {
  font-size: 0.75rem;
  margin-left: 2px;
  vertical-align: middle;
}
.trend-up {
  color: #4caf50;
}
.trend-down {
  color: #f44336;
}
.trend-stable {
  color: #9e9e9e;
}

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
  color: #ddd;
  font-size: 0.78rem;
  font-style: italic;
}
</style>
