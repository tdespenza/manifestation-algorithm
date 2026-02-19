<template>
  <div class="network-stats-panel">
    <h3>Network Rankings</h3>

    <div v-if="count === 0 && manifestations === 0" class="loading">Searching for peers...</div>

    <div v-else class="stats-grid">
      <div class="stat-box primary">
        <span class="label">Global Average</span>
        <span class="value">{{ avgScore?.toFixed(1) || '-' }}</span>
      </div>
      <div class="stat-box accent">
        <span class="label">90th Percentile</span>
        <span class="value">{{ percentile90?.toFixed(1) || '-' }}</span>
      </div>
      <div class="stat-box">
        <span class="label">Manifestations</span>
        <span class="value">{{ manifestations }}</span>
      </div>
      <div class="stat-box">
        <span class="label">Active Peers</span>
        <span class="value">{{ count }}</span>
      </div>
    </div>

    <div v-if="hasCategories" class="category-breakdown">
      <h4>Category Rankings</h4>
      <div class="category-list">
        <div v-for="(stat, category) in categoryStats" :key="category" class="category-item">
          <span class="cat-name">{{ category }}</span>
          <div class="cat-bars">
            <div class="bar-group">
              <span class="bar-label">Avg</span>
              <div class="bar-bg">
                <div class="bar-fill avg" :style="{ width: (stat.avg / 100) * 100 + '%' }"></div>
              </div>
              <span class="bar-val">{{ stat.avg.toFixed(1) }}</span>
            </div>
            <div class="bar-group">
              <span class="bar-label">P90</span>
              <div class="bar-bg">
                <div class="bar-fill p90" :style="{ width: (stat.p90 / 100) * 100 + '%' }"></div>
              </div>
              <span class="bar-val">{{ stat.p90.toFixed(1) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bandwidth-stats">
      ↓ {{ formatBytes(bandwidthStats.inbound) }} &nbsp;|&nbsp; ↑
      {{ formatBytes(bandwidthStats.outbound) }}
    </div>

    <div class="sharing-section">
      <SharingToggle />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useNetwork } from '../../composables/useNetwork';
import SharingToggle from '../ui/SharingToggle.vue';

const { count, manifestations, avgScore, percentile90, categoryStats, bandwidthStats, init } =
  useNetwork();

const hasCategories = computed(() => Object.keys(categoryStats.value).length > 0);

onMounted(() => {
  init();
});

function formatBytes(bytes: number, decimals = 2) {
  if (!bytes) return '0 B';
  const k = 1024;
  const dm = decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Number.parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
</script>

<style scoped>
/* ── Panel shell ── */
.network-stats-panel {
  background: white;
  border-radius: 14px;
  padding: 1.75rem 1.75rem 1.25rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ── Header ── */
h3 {
  margin: 0;
  color: #1a2233;
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.01em;
}

/* ── Sub-headings ── */
h4 {
  margin: 0 0 0.875rem;
  color: #555;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.07em;
}

/* ── Top-level stat cards ── */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.875rem;
}

.stat-box {
  background: #f4f6fa;
  padding: 1rem 1.1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.stat-box.primary {
  background: linear-gradient(135deg, #e8f0fe 0%, #d0e4ff 100%);
  border-color: rgba(10, 31, 125, 0.12);
}

.stat-box.accent {
  background: linear-gradient(135deg, #f0eaff 0%, #e4d5ff 100%);
  border-color: rgba(96, 97, 164, 0.15);
}

.label {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #6b7a99;
  line-height: 1;
}

.stat-box.primary .label { color: #3a5cc5; }
.stat-box.accent .label  { color: #6061a4; }

.value {
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1;
  color: #1a2233;
}

.stat-box.primary .value { color: #0a1f7d; }
.stat-box.accent .value  { color: #4a3b9c; }

/* ── Category breakdown ── */
.category-breakdown {
  display: flex;
  flex-direction: column;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  border: 1px solid #ebebf0;
  border-radius: 10px;
  overflow: hidden;
}

.category-item {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 1rem;
  padding: 0.7rem 1rem;
  border-bottom: 1px solid #f0f0f4;
  background: #fff;
  transition: background 0.15s;
}

.category-item:last-child {
  border-bottom: none;
}

.category-item:hover {
  background: #fafbff;
}

.cat-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #2c3e50;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.cat-bars {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 140px;
  flex-shrink: 0;
}

.bar-group {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.72rem;
}

.bar-label {
  width: 26px;
  color: #8a94a6;
  font-weight: 600;
  letter-spacing: 0.03em;
  flex-shrink: 0;
}

.bar-bg {
  flex: 1;
  height: 7px;
  background: #eceff4;
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 2px;
}

.bar-fill.avg {
  background: linear-gradient(90deg, #2979ff, #448aff);
}

.bar-fill.p90 {
  background: linear-gradient(90deg, #7c4dff, #b388ff);
}

.bar-val {
  width: 28px;
  text-align: right;
  font-weight: 600;
  color: #4a5568;
  flex-shrink: 0;
}

/* ── Bandwidth line ── */
.bandwidth-stats {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.875rem;
  background: #f8f9fb;
  border-radius: 8px;
  border: 1px solid #ebebf0;
  color: #8a94a6;
  font-size: 0.75rem;
  letter-spacing: 0.02em;
}

.bandwidth-stats::before {
  content: '📡';
  font-size: 0.85rem;
}

/* ── Sharing section ── */
.sharing-section {
  border-top: 1px solid #f0f0f4;
  padding-top: 1.25rem;
  margin-top: 0.25rem;
}

/* ── Loading state ── */
.loading {
  color: #8a94a6;
  font-size: 0.875rem;
  text-align: center;
  padding: 1.5rem 0;
}

/* ── Responsive ── */
@media (max-width: 480px) {
  .network-stats-panel {
    padding: 1.25rem 1rem 1rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.625rem;
  }

  .value {
    font-size: 1.4rem;
  }

  .cat-bars {
    width: 110px;
  }
}
</style>
