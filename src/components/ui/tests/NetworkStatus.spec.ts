import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref } from 'vue';
import NetworkStatus from '../../NetworkStatus.vue';

// ── Mock useNetwork composable ───────────────────────────────────────────────

// Mutable state that tests can override per-describe block
const mockCount = ref(0);
const mockManifestations = ref(0);
const mockAvgScore = ref<number | null>(null);
const mockPercentile90 = ref<number | null>(null);
const mockIsConnected = ref(false);
const mockInit = vi.fn();
const mockCleanup = vi.fn();

vi.mock('../../../composables/useNetwork', () => ({
  useNetwork: () => ({
    count: mockCount,
    manifestations: mockManifestations,
    avgScore: mockAvgScore,
    percentile90: mockPercentile90,
    isConnected: mockIsConnected,
    init: mockInit,
    cleanup: mockCleanup,
    sharingEnabled: ref(false),
    bandwidthStats: ref({ inbound: 0, outbound: 0 }),
    lastUpdate: ref(Date.now()),
    toggleSharing: vi.fn(),
  }),
}));

describe('NetworkStatus.vue', () => {
  beforeEach(() => {
    mockCount.value = 0;
    mockManifestations.value = 0;
    mockAvgScore.value = null;
    mockPercentile90.value = null;
    mockIsConnected.value = false;
    vi.clearAllMocks();
  });

  it('shows "Connecting..." when not connected and no peers', async () => {
    mockIsConnected.value = false;
    mockCount.value = 0;
    const wrapper = mount(NetworkStatus);
    expect(wrapper.find('.status-text').text()).toBe('Connecting...');
  });

  it('shows "Searching..." when connected but zero peers', async () => {
    mockIsConnected.value = true;
    mockCount.value = 0;
    const wrapper = mount(NetworkStatus);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.status-text').text()).toBe('Searching...');
  });

  it('shows "Online" when peer count > 0', async () => {
    mockCount.value = 3;
    const wrapper = mount(NetworkStatus);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.status-text').text()).toBe('Online');
  });

  it('adds "connected" class to root when count > 0', async () => {
    mockCount.value = 1;
    const wrapper = mount(NetworkStatus);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.network-status').classes()).toContain('connected');
  });

  it('does NOT have "connected" class when count is 0', () => {
    mockCount.value = 0;
    const wrapper = mount(NetworkStatus);
    expect(wrapper.find('.network-status').classes()).not.toContain('connected');
  });

  it('shows peer count badge when count > 0', async () => {
    mockCount.value = 7;
    const wrapper = mount(NetworkStatus);
    await wrapper.vm.$nextTick();
    const peerCount = wrapper.find('.peer-count');
    expect(peerCount.exists()).toBe(true);
    expect(peerCount.text()).toContain('7');
  });

  it('hides peer count badge when count is 0', () => {
    mockCount.value = 0;
    const wrapper = mount(NetworkStatus);
    expect(wrapper.find('.peer-count').exists()).toBe(false);
  });

  it('shows manifestation count when > 0', async () => {
    mockManifestations.value = 123;
    const wrapper = mount(NetworkStatus);
    await wrapper.vm.$nextTick();
    const el = wrapper.find('.manifestation-count');
    expect(el.exists()).toBe(true);
    expect(el.text()).toContain('123');
  });

  it('hides manifestation count when 0', () => {
    mockManifestations.value = 0;
    const wrapper = mount(NetworkStatus);
    expect(wrapper.find('.manifestation-count').exists()).toBe(false);
  });

  it('shows average score when avgScore > 0', async () => {
    mockAvgScore.value = 73.456;
    const wrapper = mount(NetworkStatus);
    await wrapper.vm.$nextTick();
    const el = wrapper.find('.avg-score');
    expect(el.exists()).toBe(true);
    expect(el.text()).toContain('73.5'); // toFixed(1)
  });

  it('hides average score when null', () => {
    mockAvgScore.value = null;
    const wrapper = mount(NetworkStatus);
    expect(wrapper.find('.avg-score').exists()).toBe(false);
  });

  it('shows P90 when percentile90 > 0', async () => {
    mockPercentile90.value = 88.9;
    const wrapper = mount(NetworkStatus);
    await wrapper.vm.$nextTick();
    const el = wrapper.find('.p90');
    expect(el.exists()).toBe(true);
    expect(el.text()).toContain('88.9');
  });

  it('hides P90 when null', () => {
    mockPercentile90.value = null;
    const wrapper = mount(NetworkStatus);
    expect(wrapper.find('.p90').exists()).toBe(false);
  });

  it('calls init() on mount', () => {
    mount(NetworkStatus);
    expect(mockInit).toHaveBeenCalledOnce();
  });
});
