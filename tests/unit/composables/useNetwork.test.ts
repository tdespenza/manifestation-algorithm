import { describe, it, expect, vi, beforeEach } from 'vitest';

// ── Tauri API mocks ──────────────────────────────────────────────────────────
const mockInvoke = vi.fn();
const mockListen = vi.fn();

vi.mock('@tauri-apps/api/core', () => ({
  invoke: (...args: unknown[]) => mockInvoke(...args)
}));

vi.mock('@tauri-apps/api/event', () => ({
  listen: (...args: unknown[]) => mockListen(...args)
}));

// ── Import composable AFTER mocks are set up ─────────────────────────────────
import { useNetwork, toggleSharing, _resetNetworkState } from '@/composables/useNetwork';

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
    expect(network.avgScore.value === null || typeof network.avgScore.value === 'number').toBe(
      true
    );
    expect(
      network.percentile90.value === null || typeof network.percentile90.value === 'number'
    ).toBe(true);
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
        bandwidth_out: 512
      }
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
        bandwidth_out: 4096
      }
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
        bandwidth_out: 50
      }
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

  it('loadSharingState sets sharingEnabled to false when invoke throws', async () => {
    // Make get_network_sharing throw so the catch block is exercised
    mockInvoke.mockImplementation((cmd: string) => {
      if (cmd === 'get_network_sharing') return Promise.reject(new Error('permission denied'));
      if (cmd === 'get_peer_count') return Promise.resolve(0);
      return Promise.resolve();
    });

    const { init, sharingEnabled } = useNetwork();
    await init();

    // The catch block in loadSharingState should have set sharingEnabled to false
    expect(sharingEnabled.value).toBe(false);
  });

  it('toggleSharing logs error and does not throw when invoke rejects', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    mockInvoke.mockImplementation((cmd: string) => {
      if (cmd === 'set_network_sharing') return Promise.reject(new Error('network error'));
      return Promise.resolve();
    });

    await expect(toggleSharing(true)).resolves.toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith('Failed to update sharing setting:', expect.any(Error));
    consoleSpy.mockRestore();
  });

  it('network-stats event sets isConnected to true via event handler', async () => {
    let capturedHandler: ((e: { payload: unknown }) => void) | null = null;
    mockListen.mockImplementation((_event: string, handler: (e: { payload: unknown }) => void) => {
      capturedHandler = handler;
      return Promise.resolve(vi.fn());
    });

    const { init, isConnected } = useNetwork();
    // Reset isConnected manually to verify event sets it
    isConnected.value = false;
    await init();

    capturedHandler!({
      payload: {
        peer_count: 3,
        connected_peers: ['peer1'],
        total_manifestations: 10,
        avg_score: 70,
        percentile_90: 80,
        category_stats: {},
        bandwidth_in: 500,
        bandwidth_out: 250
      }
    });

    expect(isConnected.value).toBe(true);
  });

  it('init() logs error when listen() throws (catch block coverage)', async () => {
    _resetNetworkState();
    mockListen.mockRejectedValue(new Error('listen failed'));
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { init } = useNetwork();
    await expect(init()).resolves.toBeUndefined(); // should not rethrow

    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to connect to network service:',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });

  it('init() is a no-op when already listening (isListening early return)', async () => {
    _resetNetworkState();
    const { init } = useNetwork();
    await init(); // first call initializes
    vi.clearAllMocks(); // clear call counts
    await init(); // second call should return early
    expect(mockInvoke).not.toHaveBeenCalled(); // no further invocations
  });

  it('cleanup() when unlisten is null does not throw', () => {
    _resetNetworkState(); // unlisten is null
    const { cleanup } = useNetwork();
    expect(() => cleanup()).not.toThrow();
  });

  it('cleanup() clears timeout when connectTimeoutId is set', async () => {
    _resetNetworkState();
    const { init, cleanup } = useNetwork();
    await init(); // sets connectTimeoutId
    expect(() => cleanup()).not.toThrow();
  });

  it('network-stats event with partial payload (missing optional fields)', async () => {
    let capturedHandler: ((e: { payload: unknown }) => void) | null = null;
    mockListen.mockImplementation((_event: string, handler: (e: { payload: unknown }) => void) => {
      capturedHandler = handler;
      return Promise.resolve(vi.fn());
    });
    _resetNetworkState();
    const { init, avgScore, percentile90, categoryStats, bandwidthStats } = useNetwork();
    await init();

    // Send payload WITHOUT optional fields — tests FALSE branches of if-checks
    capturedHandler!({
      payload: {
        peer_count: 2
        // no total_manifestations, avg_score, percentile_90, category_stats, bandwidth_in/out
      }
    });

    // Optional fields should remain at defaults since payload didn't include them
    expect(avgScore.value).toBeNull();
    expect(percentile90.value).toBeNull();
    expect(Object.keys(categoryStats.value)).toHaveLength(0);
    expect(bandwidthStats.value.inbound).toBe(0);
    expect(bandwidthStats.value.outbound).toBe(0);
  });

  it('setTimeout callback (connectTimeoutId) sets isConnected to true after 3s', async () => {
    vi.useFakeTimers();
    _resetNetworkState();
    const { init, isConnected } = useNetwork();
    await init();
    // Reset isConnected to false to verify the timer callback sets it back
    isConnected.value = false;
    // Advance the timer to trigger the setTimeout(() => { isConnected.value = true; }, 3000)
    vi.advanceTimersByTime(3000);
    expect(isConnected.value).toBe(true);
    vi.useRealTimers();
  });

  it('invoke get_peer_count failure falls back to 0 via catch(() => 0)', async () => {
    _resetNetworkState();
    mockInvoke.mockImplementation((cmd: string) => {
      if (cmd === 'get_peer_count') return Promise.reject(new Error('permission denied'));
      if (cmd === 'get_network_sharing') return Promise.resolve(false);
      return Promise.resolve();
    });
    const { init, count } = useNetwork();
    await init();
    // The .catch(() => 0) should have caught the rejection and returned 0
    expect(count.value).toBe(0);
  });

  it('init() called while connectTimeoutId is already set skips setting timeout again (FALSE branch of connectTimeoutId === null)', async () => {
    vi.useFakeTimers();
    _resetNetworkState(); // connectTimeoutId = null
    let callCount = 0;
    mockListen.mockImplementation(() => {
      callCount++;
      // First call fails (so isListening stays false but connectTimeoutId is set)
      if (callCount === 1) return Promise.reject(new Error('first listen failed'));
      return Promise.resolve(vi.fn());
    });
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const { init } = useNetwork();
    // First init: connectTimeoutId was null → sets timeout (TRUE branch), listen fails (isListening stays false)
    await init();
    // Second init: isListening is false so we proceed, but connectTimeoutId is NOT null (FALSE branch!)
    await init();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to connect to network service:',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
    vi.useRealTimers();
  });
});
