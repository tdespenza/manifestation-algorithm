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
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08));
}

.stat-item {
  text-align: center;
  padding: 12px 8px;
  border-radius: 8px;
  background: #fafbff;
  border: 1px solid #f0f0f0;
  transition: box-shadow 0.15s ease;
}

.stat-item:hover {
  box-shadow: 0 2px 8px rgba(10, 31, 125, 0.1);
}

.label {
  font-size: 0.72em;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 6px;
  font-weight: 700;
}

.value {
  font-size: 1.45em;
  font-weight: 800;
  color: var(--true-cobalt, #0a1f7d);
}
</style>
