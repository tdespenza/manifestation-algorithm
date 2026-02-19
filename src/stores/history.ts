import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  loadHistoricalSessions,
  deleteSession as dbDeleteSession,
  deleteSessions as dbDeleteSessions,
  type SessionSummary
} from '../services/db';
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

  async function deleteSession(id: string): Promise<void> {
    try {
      await dbDeleteSession(id);
      await fetchHistory();
    } catch (e) {
      console.error('Failed to delete session:', e);
      error.value = String(e);
    }
  }

  async function deleteSessions(ids: string[]): Promise<void> {
    if (ids.length === 0) return;
    try {
      await dbDeleteSessions(ids);
      await fetchHistory();
    } catch (e) {
      console.error('Failed to delete sessions:', e);
      error.value = String(e);
    }
  }

  return {
    sessions,
    trends,
    isLoading,
    error,
    fetchHistory,
    deleteSession,
    deleteSessions
  };
});
