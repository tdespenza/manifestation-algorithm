<template>
  <div class="network-status" :class="{ connected: count > 0 }">
    <div class="status-indicator"></div>
    <span class="status-text">{{ statusText }}</span>
    <span v-if="count > 0" class="peer-count">({{ count }} peers)</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import { listen } from '@tauri-apps/api/event';

const count = ref(0);
const lastUpdate = ref(Date.now());
// Track if we heard from backend
const isConnected = ref(false);

const statusText = computed(() => {
  if (count.value > 0) return 'Online';
  if (isConnected.value) return 'Searching...';
  return 'Connecting...';
});

let unlisten: () => void;

onMounted(async () => {
  try {
    // Initial check
    const initialCount = await invoke<number>('get_peer_count').catch(() => 0);
    count.value = initialCount;
    isConnected.value = true;

    // Listen for updates
    unlisten = await listen<{ peer_count: number }>('network-stats', (event) => {
      count.value = event.payload.peer_count;
      lastUpdate.value = Date.now();
      isConnected.value = true;
    });
  } catch (e) {
    console.error('Failed to connect to network service:', e);
  }
});

onUnmounted(() => {
  if (unlisten) unlisten();
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
</style>