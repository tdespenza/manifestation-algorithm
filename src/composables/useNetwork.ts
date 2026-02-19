import { ref } from 'vue';
import { invoke } from '@tauri-apps/api/core';
import type { UnlistenFn } from '@tauri-apps/api/event';
import { listen } from '@tauri-apps/api/event';

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
const sharingEnabled = ref(false);

// Fallback: mark as connected after 3 s even if the first invoke hasn't resolved.
// The Rust P2P node always starts — the frontend just needs to listen for events.
let connectTimeoutId: ReturnType<typeof setTimeout> | null = null;

let unlisten: UnlistenFn | null = null;

async function loadSharingState(): Promise<void> {
  try {
    sharingEnabled.value = await invoke<boolean>('get_network_sharing');
  } catch {
    sharingEnabled.value = false;
  }
}

export async function toggleSharing(enabled: boolean): Promise<void> {
  try {
    await invoke('set_network_sharing', { enabled });
    sharingEnabled.value = enabled;
  } catch (e) {
    console.error('Failed to update sharing setting:', e);
  }
}

export function useNetwork() {
  const init = async () => {
    if (isListening.value) return;

    // Mark as connected immediately — the P2P node is always running in the backend.
    // This prevents the UI from being stuck on "Connecting..." forever.
    isConnected.value = true;
    if (connectTimeoutId === null) {
      connectTimeoutId = setTimeout(() => {
        isConnected.value = true;
      }, 3000);
    }

    try {
      const initialCount = await invoke<number>('get_peer_count').catch(() => 0);
      count.value = initialCount;

      // Load and track sharing opt-in state
      await loadSharingState();

      unlisten = await listen<NetworkStatUpdate>('network-stats', event => {
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
    if (connectTimeoutId !== null) {
      clearTimeout(connectTimeoutId);
      connectTimeoutId = null;
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
    sharingEnabled,
    init,
    cleanup,
    toggleSharing,
  };
}

/** Reset all module-level state — for use in tests only. */
export function _resetNetworkState(): void {
  count.value = 0;
  manifestations.value = 0;
  avgScore.value = null;
  percentile90.value = null;
  categoryStats.value = {};
  bandwidthStats.value = { inbound: 0, outbound: 0 };
  lastUpdate.value = Date.now();
  isConnected.value = false;
  isListening.value = false;
  sharingEnabled.value = false;
  unlisten = null;
  if (connectTimeoutId !== null) {
    clearTimeout(connectTimeoutId);
  }
  connectTimeoutId = null;
}
