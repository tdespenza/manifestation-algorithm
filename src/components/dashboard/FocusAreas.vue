<script setup lang="ts">
import { computed } from 'vue';
import type { CategoryTrends } from '../../services/db_trends';
import { computeFocusAreas } from '../../data/recommendations';

const props = defineProps<{
  trends: CategoryTrends;
}>();

const areas = computed(() => computeFocusAreas(props.trends, 3));

function trendIcon(trend: 'up' | 'down' | 'flat'): string {
  if (trend === 'up') return '↑';
  if (trend === 'down') return '↓';
  return '→';
}

function trendClass(trend: 'up' | 'down' | 'flat'): string {
  if (trend === 'up') return 'trend-up';
  if (trend === 'down') return 'trend-down';
  return 'trend-flat';
}

function scoreColor(score: number): string {
  if (score >= 7) return 'score-excellent';
  if (score >= 4) return 'score-good';
  return 'score-needs-work';
}
</script>

<template>
  <section class="focus-areas" aria-labelledby="focus-areas-heading">
    <div class="focus-header">
      <h2 id="focus-areas-heading" class="focus-title">Focus Areas</h2>
      <p class="focus-subtitle">
        Your 3 lowest-scoring categories — improving these drives the biggest gains.
      </p>
    </div>

    <div v-if="areas.length === 0" class="focus-empty">
      <p>Complete more sessions to see personalised focus area recommendations.</p>
    </div>

    <div v-else class="focus-cards" aria-live="polite">
      <article
        v-for="area in areas"
        :key="area.category"
        class="focus-card"
        :aria-label="`Focus area: ${area.category}`"
      >
        <div class="card-header">
          <span class="category-name">{{ area.category }}</span>
          <div class="card-meta">
            <span :class="['score-badge', scoreColor(area.latestScore)]">
              {{ area.latestScore.toFixed(1) }}/10
            </span>
            <span
              :class="['trend-badge', trendClass(area.trend)]"
              :aria-label="`Trend: ${area.trend}`"
              >{{ trendIcon(area.trend) }}</span
            >
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.focus-areas {
  background: #fff;
  border-radius: var(--radius-lg, 16px);
  padding: 28px 28px 24px;
  box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.08));
}

.focus-header {
  margin-bottom: 20px;
}

.focus-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--true-cobalt, #0a1f7d);
  margin: 0 0 4px;
}

.focus-subtitle {
  font-size: 0.88rem;
  color: var(--color-muted, #94a3b8);
  margin: 0;
}

.focus-empty {
  color: var(--color-muted, #94a3b8);
  font-size: 0.92rem;
  text-align: center;
  padding: 20px 0 8px;
}

.focus-cards {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.focus-card {
  border: 1px solid rgba(10, 31, 125, 0.1);
  border-radius: var(--radius-md, 10px);
  padding: 16px 18px;
  background: rgba(10, 31, 125, 0.02);
  transition: box-shadow var(--transition-fast, 0.15s ease);
}

.focus-card:hover {
  box-shadow: var(--shadow-sm, 0 1px 3px rgba(0, 0, 0, 0.08));
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.category-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: #1a1a2e;
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.score-badge {
  font-size: 0.82rem;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 20px;
  font-variant-numeric: tabular-nums;
}

.score-excellent {
  background: rgba(76, 175, 80, 0.1);
  color: #1b5e20;
}

.score-good {
  background: rgba(245, 158, 11, 0.1);
  color: #78350f;
}

.score-needs-work {
  background: rgba(220, 38, 38, 0.07);
  color: #7f1d1d;
}

.trend-badge {
  font-size: 1rem;
  font-weight: 700;
  width: 22px;
  text-align: center;
}

.trend-up {
  color: var(--success, #4caf50);
}

.trend-down {
  color: var(--color-danger, #dc2626);
}

.trend-flat {
  color: var(--color-muted, #94a3b8);
}
</style>
