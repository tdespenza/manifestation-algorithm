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

// ── DB service mocks ─────────────────────────────────────────────────────────
const dbMocks = vi.hoisted(() => ({
  loadHistoricalSessions: vi.fn().mockResolvedValue([]),
  loadSessionResponses: vi.fn().mockResolvedValue([])
}));

vi.mock('@/services/db', () => ({
  loadHistoricalSessions: (...args: unknown[]) => dbMocks.loadHistoricalSessions(...args),
  loadSessionResponses: (...args: unknown[]) => dbMocks.loadSessionResponses(...args)
}));

// ── Import composable AFTER mocks are set up ─────────────────────────────────
import {
  useNetwork,
  toggleSharing,
  publishLastSession,
  _resetNetworkState
} from '@/composables/useNetwork';

describe('useNetwork module initial state', () => {
  it('starts with strict module-level defaults before any reset/init', () => {
    const network = useNetwork();
    expect(network.bandwidthStats.value).toEqual({ inbound: 0, outbound: 0 });
    expect(network.isConnected.value).toBe(false);
    expect(network.sharingEnabled.value).toBe(false);

    // Bring state back to defaults for subsequent describe blocks.
    _resetNetworkState();
  });
});

describe('useNetwork composable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    _resetNetworkState();
    // Default: no historical sessions (so publishLastSession is a no-op)
    dbMocks.loadHistoricalSessions.mockResolvedValue([]);
    dbMocks.loadSessionResponses.mockResolvedValue([]);
    // Default: peer count returns 0, sharing disabled
    mockInvoke.mockImplementation((cmd: string) => {
      if (cmd === 'get_peer_count') return Promise.resolve(0);
      if (cmd === 'get_network_sharing') return Promise.resolve(false);
      if (cmd === 'set_network_sharing') return Promise.resolve();
      if (cmd === 'publish_result') return Promise.resolve('bafy-mock-cid');
      return Promise.resolve();
    });
    // listen returns an unlisten stub that resolves immediately
    mockListen.mockResolvedValue(vi.fn());
  });

  it('exposes correct default state before init', () => {
    const network = useNetwork();
    expect(network.count.value).toBe(0);
    expect(network.manifestations.value).toBe(0);
    expect(network.avgScore.value).toBeNull();
    expect(network.percentile90.value).toBeNull();
    expect(network.categoryStats.value).toEqual({});
    expect(network.bandwidthStats.value).toEqual({ inbound: 0, outbound: 0 });
    expect(network.isConnected.value).toBe(false);
    expect(network.sharingEnabled.value).toBe(false);
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
        avg_score: 60,
        percentile_90: 80,
        category_stats: { focus: { avg: 70, p90: 85 } },
        bandwidth_in: 100,
        bandwidth_out: 50
      }
    });

    expect(categoryStats.value['focus']).toEqual({ avg: 70, p90: 85 });
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

  it('loadSharingState leaves sharingEnabled unchanged when invoke throws', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    // Make get_network_sharing throw so the catch block is exercised
    mockInvoke.mockImplementation((cmd: string) => {
      if (cmd === 'get_network_sharing') return Promise.reject(new Error('permission denied'));
      if (cmd === 'get_peer_count') return Promise.resolve(0);
      return Promise.resolve();
    });

    const { init, sharingEnabled } = useNetwork();
    await init();

    // The catch block preserves the current value rather than forcing false,
    // preventing an already-enabled setting from being silently reverted.
    // After _resetNetworkState() the value starts as false, so false is expected here.
    expect(sharingEnabled.value).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    consoleSpy.mockRestore();
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

  // ── publishLastSession on enable ────────────────────────────────────────────

  it('toggleSharing(true) calls publish_result with last session data when sessions exist', async () => {
    dbMocks.loadHistoricalSessions.mockResolvedValue([
      {
        id: 'sess-001',
        total_score: 7500,
        completed_at: '2026-02-22T10:00:00Z',
        duration_seconds: 0
      }
    ]);
    dbMocks.loadSessionResponses.mockResolvedValue([
      { question_id: '1a', category: 'Master the Basics', answer_value: 9 },
      { question_id: '2', category: 'Activate Words', answer_value: 7 }
    ]);

    await toggleSharing(true);

    expect(mockInvoke).toHaveBeenCalledWith('publish_result', {
      score: 7500,
      categoryScores: { '1a': 9, '2': 7 }
    });
  });

  it('toggleSharing(true) does NOT call publish_result when no sessions exist', async () => {
    // dbMocks.loadHistoricalSessions already returns [] by default in beforeEach
    await toggleSharing(true);

    const publishCalls = mockInvoke.mock.calls.filter((c: unknown[]) => c[0] === 'publish_result');
    expect(publishCalls).toHaveLength(0);
  });

  it('toggleSharing(false) does NOT call publish_result', async () => {
    dbMocks.loadHistoricalSessions.mockResolvedValue([
      {
        id: 'sess-001',
        total_score: 7500,
        completed_at: '2026-02-22T10:00:00Z',
        duration_seconds: 0
      }
    ]);

    await toggleSharing(false);

    const publishCalls = mockInvoke.mock.calls.filter((c: unknown[]) => c[0] === 'publish_result');
    expect(publishCalls).toHaveLength(0);
  });

  it('toggleSharing(true) still succeeds and logs if publishLastSession throws', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    dbMocks.loadHistoricalSessions.mockResolvedValue([
      {
        id: 'sess-001',
        total_score: 7500,
        completed_at: '2026-02-22T10:00:00Z',
        duration_seconds: 0
      }
    ]);
    dbMocks.loadSessionResponses.mockResolvedValue([
      { question_id: '1a', category: 'Master the Basics', answer_value: 9 }
    ]);
    mockInvoke.mockImplementation((cmd: string) => {
      if (cmd === 'set_network_sharing') return Promise.resolve();
      if (cmd === 'publish_result') return Promise.reject(new Error('gossipsub error'));
      return Promise.resolve();
    });

    await expect(toggleSharing(true)).resolves.toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(
      'Failed to publish last session on sharing enable:',
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });

  it('publishLastSession is a no-op when loadHistoricalSessions returns empty', async () => {
    await publishLastSession(); // dbMocks default returns []
    const publishCalls = mockInvoke.mock.calls.filter((c: unknown[]) => c[0] === 'publish_result');
    expect(publishCalls).toHaveLength(0);
  });

  it('publishLastSession skips responses with undefined question_id', async () => {
    dbMocks.loadHistoricalSessions.mockResolvedValue([
      {
        id: 'sess-001',
        total_score: 5000,
        completed_at: '2026-02-22T10:00:00Z',
        duration_seconds: 0
      }
    ]);
    // Simulate fixture data seeded with old column name (question_number instead of question_id)
    dbMocks.loadSessionResponses.mockResolvedValue([
      { question_id: undefined, category: 'General', answer_value: 5 },
      { question_id: '2', category: 'Activate Words', answer_value: 8 }
    ]);

    await publishLastSession();

    expect(mockInvoke).toHaveBeenCalledWith('publish_result', {
      score: 5000,
      categoryScores: { '2': 8 } // undefined key excluded
    });
  });

  it('publishLastSession skips responses with null question_id', async () => {
    dbMocks.loadHistoricalSessions.mockResolvedValue([
      {
        id: 'sess-001',
        total_score: 5000,
        completed_at: '2026-02-22T10:00:00Z',
        duration_seconds: 0
      }
    ]);
    dbMocks.loadSessionResponses.mockResolvedValue([
      { question_id: null, category: 'General', answer_value: 5 },
      { question_id: '2', category: 'Activate Words', answer_value: 8 }
    ]);

    await publishLastSession();

    expect(mockInvoke).toHaveBeenCalledWith('publish_result', {
      score: 5000,
      categoryScores: { '2': 8 }
    });
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

  it('cleanup() does not call clearTimeout when no timer exists', () => {
    _resetNetworkState();
    const clearSpy = vi.spyOn(globalThis, 'clearTimeout');

    const { cleanup } = useNetwork();
    cleanup();

    expect(clearSpy).not.toHaveBeenCalled();
    clearSpy.mockRestore();
  });

  it('cleanup() clears timeout when connectTimeoutId is set', async () => {
    _resetNetworkState();
    const clearSpy = vi.spyOn(globalThis, 'clearTimeout');
    const { init, cleanup } = useNetwork();
    await init(); // sets connectTimeoutId
    expect(() => cleanup()).not.toThrow();
    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });

  it('network-stats event with partial payload (missing optional fields)', async () => {
    let capturedHandler: ((e: { payload: unknown }) => void) | null = null;
    mockListen.mockImplementation((_event: string, handler: (e: { payload: unknown }) => void) => {
      capturedHandler = handler;
      return Promise.resolve(vi.fn());
    });
    _resetNetworkState();
    const { init, manifestations, avgScore, percentile90, categoryStats, bandwidthStats } =
      useNetwork();
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
    expect(manifestations.value).toBe(0);
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

  it('cleanup() after init allows re-init to invoke get_peer_count again', async () => {
    _resetNetworkState();
    const { init, cleanup } = useNetwork();

    await init();
    cleanup();
    vi.clearAllMocks();
    await init();

    expect(mockInvoke).toHaveBeenCalledWith('get_peer_count');
  });

  it('_resetNetworkState resets connected/sharing/bandwidth refs to defaults', async () => {
    const clearSpy = vi.spyOn(globalThis, 'clearTimeout');
    const { init, isConnected, sharingEnabled, bandwidthStats } = useNetwork();
    await init();

    isConnected.value = true;
    sharingEnabled.value = true;
    bandwidthStats.value.inbound = 99;
    bandwidthStats.value.outbound = 88;

    _resetNetworkState();

    expect(isConnected.value).toBe(false);
    expect(sharingEnabled.value).toBe(false);
    expect(bandwidthStats.value).toEqual({ inbound: 0, outbound: 0 });
    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });

  it('_resetNetworkState does not call clearTimeout when timer is null', () => {
    _resetNetworkState();
    const clearSpy = vi.spyOn(globalThis, 'clearTimeout');

    _resetNetworkState();

    expect(clearSpy).not.toHaveBeenCalled();
    clearSpy.mockRestore();
  });
});
