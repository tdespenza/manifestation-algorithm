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
  Legend
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

  // Determine trend color (Black for up/stable, Red for down)
  let trendColor = '#000000';
  if (sorted.length > 1) {
    const firstScore = sorted[0].total_score;
    const lastScore = sorted[sorted.length - 1].total_score;
    if (lastScore < firstScore) {
      trendColor = '#d32f2f'; // Material Red 700
    }
  } else {
    // Single point default
    trendColor = '#000000';
  }

  return {
    labels: sorted.map(s => {
      const d = new Date(s.completed_at);
      return d.toLocaleDateString();
    }),
    datasets: [
      {
        label: 'Manifestation Score',
        backgroundColor: trendColor,
        borderColor: trendColor,
        data: sorted.map(s => s.total_score),
        tension: 0.1
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
