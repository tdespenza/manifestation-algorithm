<template>
  <div class="chart-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
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
  scales: {
    y: {
      beginAtZero: true,
      max: getMaxPossibleScore()
    }
  }
};
</script>

<style scoped>
.chart-container {
  height: 400px;
  width: 100%;
}
</style>
