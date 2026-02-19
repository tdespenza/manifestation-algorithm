import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref } from 'vue';

// ── Tauri API mocks ──────────────────────────────────────────────────────────
const mockInvoke = vi.fn();
const mockListen = vi.fn();

vi.mock('@tauri-apps/api/core', () => ({
  invoke: (...args: unknown[]) => mockInvoke(...args),
}));

vi.mock('@tauri-apps/api/event', () => ({
  listen: (...args: unknown[]) => mockListen(...args),
}));

// ── Import composable AFTER mocks are set up ─────────────────────────────────
import { useNetwork, toggleSharing, _resetNetworkState } from '../useNetwork';

describe('useNetwork composable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    _resetNetworkState();
    // Default: peer count returns 0, sharing disabled
    mockInvoke.mockImplementation((cmd: string) => {
      if (cmd === 'get_peer_count') return Promise.resolve(0);
      if (cmd === 'get_network_sharing') return Promise.resolve(false);
      if (cmd === 'set_network_sharing') return Promise.resolve();
      return Promise.resolve();
    });
    // listen returns an unlisten stub that resolves immediately
    mockListen.mockResolvedValue(vi.fn());
  });

  it('exposes correct default state before init', () => {
    const network = useNetwork();
    expect(network.isConnected.value).toBeDefined();
    expect(typeof network.count.value).toBe('number');
    expect(typeof network.manifestations.value).toBe('number');
    expect(network.avgScore.value === null || typeof network.avgScore.value === 'number').toBe(true);
    expect(network.percentile90.value === null || typeof network.percentile90.value === 'number').toBe(true);
  });

  it('init() invokes get_peer_count and get_network_sharing', async () => {
    const { init } = useNetwork();
    await init();

    expect(mockInvoke).toHaveBeenCalledWith('get_peer_count');
    expect(mockInvoke).toHaveBeenCalledWith('get_network_sharing');
  });

  it('init() registers a network-stats listener', async () => {
    const { init } = useNetwork();
    await init();

    expect(mockListen).toHaveBeenCalledWith('network-stats', expect.any(Function));
  });

  it('init() sets isConnected to true on success', async () => {
    const { init, isConnected } = useNetwork();
    await init();
    expect(isConnected.value).toBe(true);
  });

  it('network-stats event updates count, manifestations, avgScore, percentile90', async () => {
    let capturedHandler: ((e: { payload: unknown }) => void) | null = null;
    mockListen.mockImplementation((_event: string, handler: (e: { payload: unknown }) => void) => {
      capturedHandler = handler;
      return Promise.resolve(vi.fn());
    });

    const { init, count, manifestations, avgScore, percentile90 } = useNetwork();
    await init();

    expect(capturedHandler).not.toBeNull();

    capturedHandler!({
      payload: {
        peer_count: 5,
        connected_peers: ['peer1'],
        total_manifestations: 42,
        avg_score: 73.5,
        percentile_90: 88.2,
        category_stats: {},
        bandwidth_in: 1024,
        bandwidth_out: 512,
      },
    });

    expect(count.value).toBe(5);
    expect(manifestations.value).toBe(42);
    expect(avgScore.value).toBeCloseTo(73.5);
    expect(percentile90.value).toBeCloseTo(88.2);
  });

  it('network-stats event updates bandwidthStats', async () => {
    let capturedHandler: ((e: { payload: unknown }) => void) | null = null;
    mockListen.mockImplementation((_event: string, handler: (e: { payload: unknown }) => void) => {
      capturedHandler = handler;
      return Promise.resolve(vi.fn());
    });

    const { init, bandwidthStats } = useNetwork();
    await init();

    capturedHandler!({
      payload: {
        peer_count: 1,
        connected_peers: [],
        total_manifestations: 0,
        avg_score: null,
        percentile_90: null,
        category_stats: {},
        bandwidth_in: 2048,
        bandwidth_out: 4096,
      },
    });

    expect(bandwidthStats.value.inbound).toBe(2048);
    expect(bandwidthStats.value.outbound).toBe(4096);
  });

  it('network-stats event updates categoryStats', async () => {
    let capturedHandler: ((e: { payload: unknown }) => void) | null = null;
    mockListen.mockImplementation((_event: string, handler: (e: { payload: unknown }) => void) => {
      capturedHandler = handler;
      return Promise.resolve(vi.fn());
    });

    const { init, categoryStats } = useNetwork();
    await init();

    capturedHandler!({
      payload: {
        peer_count: 2,
        connected_peers: [],
        total_manifestations: 10,
        avg_score: 60.0,
        percentile_90: 80.0,
        category_stats: { focus: { avg: 70.0, p90: 85.0 } },
        bandwidth_in: 100,
        bandwidth_out: 50,
      },
    });

    expect(categoryStats.value['focus']).toEqual({ avg: 70.0, p90: 85.0 });
  });

  it('cleanup() calls the unlisten function', async () => {
    const mockUnlisten = vi.fn();
    mockListen.mockResolvedValue(mockUnlisten);

    const { init, cleanup } = useNetwork();
    await init();
    cleanup();

    expect(mockUnlisten).toHaveBeenCalledOnce();
  });

  it('toggleSharing(true) invokes set_network_sharing with enabled=true', async () => {
    await toggleSharing(true);

    expect(mockInvoke).toHaveBeenCalledWith('set_network_sharing', { enabled: true });
  });

  it('toggleSharing(false) invokes set_network_sharing with enabled=false', async () => {
    await toggleSharing(false);

    expect(mockInvoke).toHaveBeenCalledWith('set_network_sharing', { enabled: false });
  });

  it('toggleSharing(true) updates sharingEnabled ref to true', async () => {
    const { sharingEnabled } = useNetwork();
    await toggleSharing(true);
    expect(sharingEnabled.value).toBe(true);
  });
});
