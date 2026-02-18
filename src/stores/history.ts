import { defineStore } from 'pinia';
import { ref } from 'vue';
import { loadHistoricalSessions, type SessionSummary } from '../services/db';
import { loadConsolidatedCategoryTrends, type CategoryTrends } from '../services/db_trends';

export const useHistoryStore = defineStore('history', () => {
  const sessions = ref<SessionSummary[]>([]);
  const trends = ref<CategoryTrends>({});
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchHistory() {
    isLoading.value = true;
    error.value = null;
    try {
      const [s, t] = await Promise.all([
        loadHistoricalSessions(),
        loadConsolidatedCategoryTrends()
      ]);
      sessions.value = s;
      trends.value = t;
    } catch (e) {
      console.error('Failed to load history:', e);
      error.value = String(e);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    sessions,
    trends,
    isLoading,
    error,
    fetchHistory
  };
});
