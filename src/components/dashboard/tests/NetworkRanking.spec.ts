import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref, computed } from 'vue';
import NetworkRanking from '../NetworkRanking.vue';

// ── Stub child components ────────────────────────────────────────────────────
vi.mock('../../ui/SharingToggle.vue', () => ({
  default: { template: '<div class="sharing-toggle-stub" />' },
}));

// ── Mock useNetwork composable ───────────────────────────────────────────────

const mockCount = ref(0);
const mockManifestations = ref(0);
const mockAvgScore = ref<number | null>(null);
const mockPercentile90 = ref<number | null>(null);
const mockCategoryStats = ref<Record<string, { avg: number; p90: number; count: number }>>({});
const mockBandwidthStats = ref({ inbound: 0, outbound: 0 });
const mockIsConnected = ref(false);
const mockInit = vi.fn();
const mockCleanup = vi.fn();

vi.mock('../../../composables/useNetwork', () => ({
  useNetwork: () => ({
    count: mockCount,
    manifestations: mockManifestations,
    avgScore: mockAvgScore,
    percentile90: mockPercentile90,
    categoryStats: mockCategoryStats,
    bandwidthStats: mockBandwidthStats,
    isConnected: mockIsConnected,
    sharingEnabled: ref(false),
    init: mockInit,
    cleanup: mockCleanup,
    toggleSharing: vi.fn(),
  }),
}));

describe('NetworkRanking.vue', () => {
  beforeEach(() => {
    mockCount.value = 0;
    mockManifestations.value = 0;
    mockAvgScore.value = null;
    mockPercentile90.value = null;
    mockCategoryStats.value = {};
    mockBandwidthStats.value = { inbound: 0, outbound: 0 };
    mockIsConnected.value = false;
    vi.clearAllMocks();
  });

  // ── Connection state ────────────────────────────────────────────────────────

  it('shows "Searching for peers..." loading text when count and manifestations are both 0', () => {
    mockCount.value = 0;
    mockManifestations.value = 0;
    const wrapper = mount(NetworkRanking);
    expect(wrapper.find('.loading').text()).toContain('Searching for peers...');
  });

  it('hides loading text and shows stats-grid when count > 0', async () => {
    mockCount.value = 1;
    const wrapper = mount(NetworkRanking);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.loading').exists()).toBe(false);
    expect(wrapper.find('.stats-grid').exists()).toBe(true);
  });

  it('hides loading text and shows stats-grid when manifestations > 0', async () => {
    mockCount.value = 0;
    mockManifestations.value = 5;
    const wrapper = mount(NetworkRanking);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.loading').exists()).toBe(false);
    expect(wrapper.find('.stats-grid').exists()).toBe(true);
  });

  // ── Stats values ─────────────────────────────────────────────────────────

  it('displays "-" for global average when avgScore is null', async () => {
    mockCount.value = 1; // grid visible
    mockAvgScore.value = null;
    const wrapper = mount(NetworkRanking);
    await wrapper.vm.$nextTick();
    const primaryBox = wrapper.find('.stat-box.primary .value');
    expect(primaryBox.text()).toBe('-');
  });

  it('displays formatted avgScore when present', async () => {
    mockCount.value = 1; // grid visible
    mockAvgScore.value = 75.567;
    const wrapper = mount(NetworkRanking);
    await wrapper.vm.$nextTick();
    const primaryBox = wrapper.find('.stat-box.primary .value');
    expect(primaryBox.text()).toBe('75.6'); // toFixed(1)
  });

  it('displays "-" for P90 when percentile90 is null', async () => {
    mockCount.value = 1; // grid visible
    mockPercentile90.value = null;
    const wrapper = mount(NetworkRanking);
    await wrapper.vm.$nextTick();
    const accentBox = wrapper.find('.stat-box.accent .value');
    expect(accentBox.text()).toBe('-');
  });

  it('displays formatted P90 when present', async () => {
    mockCount.value = 1; // grid visible
    mockPercentile90.value = 91.04;
    const wrapper = mount(NetworkRanking);
    await wrapper.vm.$nextTick();
    const accentBox = wrapper.find('.stat-box.accent .value');
    expect(accentBox.text()).toBe('91.0');
  });

  it('displays peer count and manifestation count in stat boxes', async () => {
    mockIsConnected.value = true;
    mockCount.value = 12;
    mockManifestations.value = 99;
    const wrapper = mount(NetworkRanking);
    await wrapper.vm.$nextTick();
    const boxes = wrapper.findAll('.stat-box .value');
    const texts = boxes.map((b) => b.text());
    expect(texts).toContain('12');
    expect(texts).toContain('99');
  });

  // ── Category breakdown ────────────────────────────────────────────────────

  it('hides category breakdown when categoryStats is empty', () => {
    mockIsConnected.value = true;
    mockCategoryStats.value = {};
    const wrapper = mount(NetworkRanking);
    expect(wrapper.find('.category-breakdown').exists()).toBe(false);
  });

  it('shows category breakdown when categoryStats has entries', async () => {
    mockIsConnected.value = true;
    mockCategoryStats.value = {
      Wellness: { avg: 72.5, p90: 88.0, count: 10 },
      Career: { avg: 65.0, p90: 80.0, count: 5 },
    };
    const wrapper = mount(NetworkRanking);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.category-breakdown').exists()).toBe(true);
    const items = wrapper.findAll('.category-item');
    expect(items).toHaveLength(2);
    expect(items[0].find('.cat-name').text()).toBe('Wellness');
    expect(items[1].find('.cat-name').text()).toBe('Career');
  });

  // ── Bandwidth stats ───────────────────────────────────────────────────────

  it('shows bandwidth stats section with 0 B when idle', () => {
    const wrapper = mount(NetworkRanking);
    const bw = wrapper.find('.bandwidth-stats');
    expect(bw.exists()).toBe(true);
    expect(bw.text()).toContain('0 B');
  });

  it('shows formatted bandwidth when bytes > 0', async () => {
    mockBandwidthStats.value = { inbound: 2048, outbound: 1024 };
    const wrapper = mount(NetworkRanking);
    await wrapper.vm.$nextTick();
    const bw = wrapper.find('.bandwidth-stats');
    expect(bw.text()).toContain('2 KB');
    expect(bw.text()).toContain('1 KB');
  });

  // ── SharingToggle integration ─────────────────────────────────────────────

  it('renders the SharingToggle component', () => {
    const wrapper = mount(NetworkRanking);
    expect(wrapper.find('.sharing-toggle-stub').exists()).toBe(true);
  });

  it('renders the sharing-section wrapper', () => {
    const wrapper = mount(NetworkRanking);
    expect(wrapper.find('.sharing-section').exists()).toBe(true);
  });

  // ── Lifecycle ─────────────────────────────────────────────────────────────

  it('calls init() on mount', () => {
    mount(NetworkRanking);
    expect(mockInit).toHaveBeenCalledOnce();
  });
});

// ── formatBytes unit tests (via component exposure) ───────────────────────────
// Test via the bandwidth display to avoid importing private functions
describe('NetworkRanking.vue – formatBytes via bandwidth display', () => {
  beforeEach(() => {
    mockIsConnected.value = false; // loading state, but bandwidth-stats is always visible
    vi.clearAllMocks();
  });

  const cases: [number, number, string][] = [
    [0, 0, '0 B'],
    [1024, 0, '1 KB'],
    [1048576, 0, '1 MB'],
    [1073741824, 0, '1 GB'],
  ];

  cases.forEach(([inbound, outbound, expected]) => {
    it(`formatBytes(${inbound}) → "${expected}"`, async () => {
      mockBandwidthStats.value = { inbound, outbound };
      const wrapper = mount(NetworkRanking);
      await wrapper.vm.$nextTick();
      expect(wrapper.find('.bandwidth-stats').text()).toContain(expected);
    });
  });
});
