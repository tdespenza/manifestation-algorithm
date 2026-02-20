<template>
  <div class="progress-chart-wrapper">
    <ChartActions
      target-id="progress-chart-print-area"
      title="Progress Trend"
      :data="exportData"
      filename="progress_trend"
    />
    <div id="progress-chart-print-area" class="chart-container">
      <h2 class="print-only">Progress Trend</h2>
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ChartActions from './ChartActions.vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ScriptableLineSegmentContext
} from 'chart.js';
import { Line } from 'vue-chartjs';
import type { SessionSummary } from '../../services/db';
import { getMaxPossibleScore } from '../../services/scoring';

const props = defineProps<{
  sessions: SessionSummary[];
}>();

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const chartData = computed(() => {
  // Sort by date ascending for the chart
  const sorted = [...props.sessions].reverse(); // sessions come DESC from DB
  const isDowntrend =
    sorted.length > 1 && sorted[sorted.length - 1].total_score < sorted[0].total_score;

  return {
    labels: sorted.map(s => {
      const d = new Date(s.completed_at);
      return d.toLocaleDateString();
    }),
    datasets: [
      {
        label: 'Manifestation Score',
        data: sorted.map(s => s.total_score),
        borderColor: isDowntrend ? '#d32f2f' : '#000000',
        backgroundColor: 'transparent',
        tension: 0.1,
        segment: {
          borderColor: (ctx: ScriptableLineSegmentContext) =>
            (ctx.p1.parsed.y ?? 0) >= (ctx.p0.parsed.y ?? 0) ? '#000000' : '#d32f2f'
        }
      }
    ]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      labels: {
        generateLabels: () => [
          {
            text: 'Improving',
            strokeStyle: '#000000',
            fillStyle: '#000000',
            lineWidth: 2,
            hidden: false,
            datasetIndex: 0
          },
          {
            text: 'Declining',
            strokeStyle: '#d32f2f',
            fillStyle: '#d32f2f',
            lineWidth: 2,
            hidden: false,
            datasetIndex: 0
          }
        ]
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: getMaxPossibleScore()
    }
  }
};

const exportData = computed(() => {
  const sorted = [...props.sessions].reverse();
  return sorted.map(s => ({
    Date: new Date(s.completed_at).toLocaleDateString(),
    Time: new Date(s.completed_at).toLocaleTimeString(),
    'Total Score': s.total_score
  }));
});
</script>

<style scoped>
.progress-chart-wrapper {
  width: 100%;
}

.chart-container {
  height: 400px;
  width: 100%;
  background: white;
}

.print-only {
  display: none;
}

@media print {
  .print-only {
    display: block;
    text-align: center;
    margin-bottom: 20px;
    color: var(--deep-twilight);
  }
  .chart-container {
    height: 80vh !important;
    width: 100vw !important;
    padding: 20px;
  }
}
</style>
