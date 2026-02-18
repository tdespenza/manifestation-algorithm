import { ref, onMounted, onUnmounted } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import { listen, UnlistenFn } from '@tauri-apps/api/event';

export interface CategoryStats {
  avg: number;
  p90: number;
}

export interface NetworkStatUpdate {
  peer_count: number;
  connected_peers: string[];
  total_manifestations: number;
  avg_score: number | null;
  percentile_90: number | null;
  category_stats: Record<string, CategoryStats>;
  bandwidth_in: number;
  bandwidth_out: number;
}

const count = ref(0);
const manifestations = ref(0);
const avgScore = ref<number | null>(null);
const percentile90 = ref<number | null>(null);
const categoryStats = ref<Record<string, CategoryStats>>({});
const bandwidthStats = ref({ inbound: 0, outbound: 0 });
const lastUpdate = ref(Date.now());
const isConnected = ref(false);
const isListening = ref(false);

let unlisten: UnlistenFn | null = null;

export function useNetwork() {
  const init = async () => {
    if (isListening.value) return;
    
    try {
      // Initial check
      const initialCount = await invoke<number>('get_peer_count').catch(() => 0);
      count.value = initialCount;
      isConnected.value = true;

      // Listen for updates
      unlisten = await listen<NetworkStatUpdate>('network-stats', (event) => {
        const payload = event.payload;
        count.value = payload.peer_count;
        if (payload.total_manifestations !== undefined) {
          manifestations.value = payload.total_manifestations;
        }
        if (payload.avg_score) avgScore.value = payload.avg_score;
        if (payload.percentile_90) percentile90.value = payload.percentile_90;
        if (payload.category_stats) categoryStats.value = payload.category_stats;
        if (payload.bandwidth_in) bandwidthStats.value.inbound = payload.bandwidth_in;
        if (payload.bandwidth_out) bandwidthStats.value.outbound = payload.bandwidth_out;
        
        lastUpdate.value = Date.now();
        isConnected.value = true;
      });
      
      isListening.value = true;
    } catch (e) {
      console.error('Failed to connect to network service:', e);
    }
  };

  const cleanup = () => {
    if (unlisten) {
      unlisten();
      unlisten = null;
      isListening.value = false;
    }
  };

  return {
    count,
    manifestations,
    avgScore,
    percentile90,
    categoryStats,
    bandwidthStats,
    lastUpdate,
    isConnected,
    init,
    cleanup
  };
}
