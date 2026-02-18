<template>
  <div class="network-status" :class="{ connected: count > 0 }">
    <div class="status-indicator"></div>
    <span class="status-text">{{ statusText }}</span>
    <span v-if="count > 0" class="peer-count">({{ count }} peers)</span>
    <span v-if="manifestations > 0" class="manifestation-count">| {{ manifestations }} results</span>
    <span v-if="avgScore && avgScore > 0" class="avg-score" title="Average Score">| μ: {{ avgScore.toFixed(1) }}</span>
    <span v-if="percentile90 && percentile90 > 0" class="p90" title="90th Percentile">| P90: {{ percentile90.toFixed(1) }}</span>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue';
import { useNetwork } from '../composables/useNetwork';

const { 
  count, 
  manifestations, 
  avgScore, 
  percentile90, 
  isConnected,
  init,
  cleanup
} = useNetwork();

const statusText = computed(() => {
  if (count.value > 0) return 'Online';
  if (isConnected.value) return 'Searching...';
  return 'Connecting...';
});

onMounted(() => {
  init();
});

onUnmounted(() => {
  // We keep the listener active if there are multiple components using it,
  // or we can structure useNetwork to manage singular subscription.
  // For now, let's allow it to persist or be managed by the composable logic.
  // If we want to strictly cleanup when no components are using it, we need a ref count.
  // But given the app structure, global listener is fine.
});
</script>

<style scoped>
.network-status {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: #666;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 12px;
  background: rgba(0,0,0,0.03);
  transition: all 0.3s ease;
}

.network-status.connected {
  color: #2e7d32;
  background: rgba(46, 125, 50, 0.1);
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ccc;
  transition: background-color 0.3s ease;
}

.connected .status-indicator {
  background-color: #4caf50;
  box-shadow: 0 0 4px #4caf50;
}

.status-text {
  font-weight: 500;
}

.peer-count {
  opacity: 0.8;
  font-size: 0.8em;
}

.manifestation-count {
  opacity: 0.8;
  font-size: 0.8em;
  font-variant-numeric: tabular-nums;
  margin-left: 4px;
}
</style>