<template>
  <div class="stats-panel">
    <div class="stat-item">
      <div class="label">Average Score</div>
      <div class="value">{{ Math.round(stats.mean).toLocaleString() }}</div>
    </div>
    <div class="stat-item">
      <div class="label">Median Score</div>
      <div class="value">{{ Math.round(stats.median).toLocaleString() }}</div>
    </div>
    <div class="stat-item">
      <div class="label">Highest Score</div>
      <div class="value">{{ Math.round(stats.max).toLocaleString() }}</div>
    </div>
    <div class="stat-item">
      <div class="label">Total Sessions</div>
      <div class="value">{{ stats.count }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { SessionSummary } from '../../services/db';

const props = defineProps<{
  sessions: SessionSummary[];
}>();

const stats = computed(() => {
  if (!props.sessions.length) return { mean: 0, median: 0, max: 0, count: 0 };

  const scores = props.sessions.map(s => s.total_score).sort((a, b) => a - b);
  const count = scores.length;
  const sum = scores.reduce((a, b) => a + b, 0);
  const mean = sum / count;
  const max = scores[count - 1];

  const median =
    count % 2 === 0
      ? (scores[count / 2 - 1] + scores[count / 2]) / 2
      : scores[Math.floor(count / 2)];

  return { mean, median, max, count };
});
</script>

<style scoped>
.stats-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.stat-item {
  text-align: center;
}

.label {
  font-size: 0.85em;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 5px;
}

.value {
  font-size: 1.5em;
  font-weight: 700;
  color: var(--true-cobalt, #0047ab);
}
</style>
