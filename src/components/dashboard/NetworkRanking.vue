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
      <small
        >Bandwidth: ↓ {{ formatBytes(bandwidthStats.inbound) }} | ↑
        {{ formatBytes(bandwidthStats.outbound) }}</small
      >
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
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
</script>

<style scoped>
.network-stats-panel {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-size: 1.25rem;
}

h4 {
  margin: 1.5rem 0 1rem;
  color: #666;
  font-size: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-box {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.stat-box.primary {
  background: #e3f2fd;
  color: #1976d2;
}

.stat-box.accent {
  background: #f3e5f5;
  color: #7b1fa2;
}

.label {
  font-size: 0.8rem;
  opacity: 0.8;
  margin-bottom: 0.25rem;
}

.value {
  font-size: 1.5rem;
  font-weight: 600;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.category-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.cat-name {
  width: 100px;
  font-size: 0.9rem;
  font-weight: 500;
}

.cat-bars {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.bar-group {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
}

.bar-label {
  width: 24px;
  color: #666;
}

.bar-bg {
  flex: 1;
  height: 6px;
  background: #eee;
  border-radius: 3px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.bar-fill.avg {
  background: #2196f3;
}
.bar-fill.p90 {
  background: #9c27b0;
}

.bar-val {
  width: 30px;
  text-align: right;
  font-weight: 500;
}

.bandwidth-stats {
  margin-top: 1.5rem;
  text-align: right;
  color: #999;
}

.sharing-section {
  margin-top: 1rem;
}
</style>
