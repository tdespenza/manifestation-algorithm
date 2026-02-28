import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
  loadHistoricalSessions,
  loadHistoricalSessionsPage,
  countHistoricalSessions,
  deleteSession as dbDeleteSession,
  deleteSessions as dbDeleteSessions,
  type SessionSummary
} from '../services/db';
import { loadConsolidatedCategoryTrends, type CategoryTrends } from '../services/dbTrends';

/** Number of sessions to load per page. */
const PAGE_SIZE = 20;

export const useHistoryStore = defineStore('history', () => {
  const sessions = ref<SessionSummary[]>([]);
  const trends = ref<CategoryTrends>({});
  const isLoading = ref(false);
  const isLoadingMore = ref(false);
  const error = ref<string | null>(null);
  const totalCount = ref(0);

  /** True when more sessions are available to load beyond the current set. */
  const hasMore = computed(() => sessions.value.length < totalCount.value);

  /**
   * Fetch the first page of sessions and reset pagination state.
   * Also reloads the total session count and trends.
   */
  async function fetchHistory() {
    isLoading.value = true;
    error.value = null;
    try {
      const [firstPage, count, t] = await Promise.all([
        loadHistoricalSessionsPage(PAGE_SIZE, 0),
        countHistoricalSessions(),
        loadConsolidatedCategoryTrends()
      ]);
      sessions.value = firstPage;
      totalCount.value = count;
      trends.value = t;
    } catch (e) {
      console.error('Failed to load history:', e);
      error.value = String(e);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Load all sessions at once (used internally by flows that need full data,
   * e.g., the questionnaire store checking for a saved session).
   */
  async function fetchAllSessions(): Promise<SessionSummary[]> {
    return loadHistoricalSessions();
  }

  /** Append the next page of sessions to the current list. */
  async function loadMoreSessions() {
    if (!hasMore.value || isLoadingMore.value) return;
    isLoadingMore.value = true;
    try {
      const nextPage = await loadHistoricalSessionsPage(PAGE_SIZE, sessions.value.length);
      sessions.value = [...sessions.value, ...nextPage];
    } catch (e) {
      console.error('Failed to load more sessions:', e);
      error.value = String(e);
    } finally {
      isLoadingMore.value = false;
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
    isLoadingMore,
    error,
    totalCount,
    hasMore,
    fetchHistory,
    fetchAllSessions,
    loadMoreSessions,
    deleteSession,
    deleteSessions
  };
});
