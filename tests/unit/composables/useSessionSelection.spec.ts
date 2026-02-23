import { describe, it, expect, vi } from 'vitest';
import { computed, ref } from 'vue';
import { useSessionSelection } from '../../../src/composables/useSessionSelection';
import type { SessionSummary } from '../../../src/services/db';

function session(id: string): SessionSummary {
  return { id, completed_at: new Date().toISOString(), total_score: 5000, duration_seconds: 60 };
}

function setup(ids = ['s1', 's2', 's3']) {
  const rawSessions = ref<SessionSummary[]>(ids.map(session));
  const sessionsComputed = computed(() => rawSessions.value);
  const deleteOne = vi.fn().mockResolvedValue(undefined);
  const deleteMany = vi.fn().mockResolvedValue(undefined);
  const addToast = vi.fn();
  const sel = useSessionSelection(sessionsComputed, deleteOne, deleteMany, addToast);
  return { sel, rawSessions, deleteOne, deleteMany, addToast };
}

describe('useSessionSelection', () => {
  describe('initial state', () => {
    it('selectionMode is false', () => {
      const { sel } = setup();
      expect(sel.selectionMode.value).toBe(false);
    });

    it('selectedIds is empty', () => {
      const { sel } = setup();
      expect(sel.selectedIds.value.size).toBe(0);
    });

    it('selectedCount is 0', () => {
      const { sel } = setup();
      expect(sel.selectedCount.value).toBe(0);
    });

    it('allSelected is false when nothing selected', () => {
      const { sel } = setup();
      expect(sel.allSelected.value).toBe(false);
    });
  });

  describe('selection mode', () => {
    it('enterSelectionMode sets selectionMode to true', () => {
      const { sel } = setup();
      sel.enterSelectionMode();
      expect(sel.selectionMode.value).toBe(true);
    });

    it('exitSelectionMode resets state', () => {
      const { sel } = setup();
      sel.enterSelectionMode();
      sel.toggleSelect('s1');
      sel.exitSelectionMode();
      expect(sel.selectionMode.value).toBe(false);
      expect(sel.selectedIds.value.size).toBe(0);
    });

    it('toggleSelect adds an id', () => {
      const { sel } = setup();
      sel.toggleSelect('s1');
      expect(sel.selectedIds.value.has('s1')).toBe(true);
    });

    it('toggleSelect removes an already-selected id', () => {
      const { sel } = setup();
      sel.toggleSelect('s1');
      sel.toggleSelect('s1');
      expect(sel.selectedIds.value.has('s1')).toBe(false);
    });

    it('toggleSelectAll selects all sessions', () => {
      const { sel } = setup(['s1', 's2']);
      sel.toggleSelectAll();
      expect(sel.allSelected.value).toBe(true);
      expect(sel.selectedCount.value).toBe(2);
    });

    it('toggleSelectAll deselects all when all already selected', () => {
      const { sel } = setup(['s1', 's2']);
      sel.toggleSelectAll();
      sel.toggleSelectAll();
      expect(sel.selectedCount.value).toBe(0);
    });

    it('selectedCount reflects selected set size', () => {
      const { sel } = setup();
      sel.toggleSelect('s1');
      sel.toggleSelect('s2');
      expect(sel.selectedCount.value).toBe(2);
    });

    it('allSelected is true when all sessions are selected', () => {
      const { sel } = setup(['s1', 's2']);
      sel.toggleSelect('s1');
      sel.toggleSelect('s2');
      expect(sel.allSelected.value).toBe(true);
    });
  });

  describe('handleDeleteSession', () => {
    it('opens the confirm dialog without deleting immediately', () => {
      const { sel, deleteOne } = setup();
      sel.handleDeleteSession('s1');
      expect(sel.confirmVisible.value).toBe(true);
      expect(sel.confirmTitle.value).toBe('Delete Session');
      expect(deleteOne).not.toHaveBeenCalled();
    });

    it('calls deleteOne after onConfirmed', async () => {
      const { sel, deleteOne } = setup();
      sel.handleDeleteSession('s1');
      await sel.onConfirmed();
      expect(deleteOne).toHaveBeenCalledWith('s1');
    });

    it('shows success toast after deletion', async () => {
      const { sel, addToast } = setup();
      sel.handleDeleteSession('s1');
      await sel.onConfirmed();
      expect(addToast).toHaveBeenCalledWith('Session deleted', 'success');
    });

    it('shows error toast on failure', async () => {
      const { sel, deleteOne, addToast } = setup();
      deleteOne.mockRejectedValueOnce(new Error('DB error'));
      sel.handleDeleteSession('s1');
      await sel.onConfirmed();
      expect(addToast).toHaveBeenCalledWith('Failed to delete session', 'error');
    });
  });

  describe('handleDeleteSelected', () => {
    it('is a no-op when nothing is selected', () => {
      const { sel, deleteMany } = setup();
      sel.handleDeleteSelected();
      expect(sel.confirmVisible.value).toBe(false);
      expect(deleteMany).not.toHaveBeenCalled();
    });

    it('opens confirm dialog for bulk delete', () => {
      const { sel } = setup();
      sel.toggleSelect('s1');
      sel.toggleSelect('s2');
      sel.handleDeleteSelected();
      expect(sel.confirmVisible.value).toBe(true);
      expect(sel.confirmTitle.value).toContain('Delete');
    });

    it('calls deleteMany with selected ids after onConfirmed', async () => {
      const { sel, deleteMany } = setup();
      sel.toggleSelect('s1');
      sel.toggleSelect('s2');
      sel.handleDeleteSelected();
      await sel.onConfirmed();
      expect(deleteMany).toHaveBeenCalledWith(expect.arrayContaining(['s1', 's2']));
    });

    it('shows plural success toast', async () => {
      const { sel, addToast } = setup();
      sel.toggleSelect('s1');
      sel.toggleSelect('s2');
      sel.handleDeleteSelected();
      await sel.onConfirmed();
      expect(addToast).toHaveBeenCalledWith('Deleted 2 sessions', 'success');
    });

    it('shows singular success toast for 1 session', async () => {
      const { sel, addToast } = setup();
      sel.toggleSelect('s1');
      sel.handleDeleteSelected();
      await sel.onConfirmed();
      expect(addToast).toHaveBeenCalledWith('Deleted 1 session', 'success');
    });

    it('exits selection mode after successful bulk delete', async () => {
      const { sel } = setup();
      sel.enterSelectionMode();
      sel.toggleSelect('s1');
      sel.handleDeleteSelected();
      await sel.onConfirmed();
      expect(sel.selectionMode.value).toBe(false);
    });

    it('shows error toast on failure', async () => {
      const { sel, deleteMany, addToast } = setup();
      deleteMany.mockRejectedValueOnce(new Error('bulk fail'));
      sel.toggleSelect('s1');
      sel.handleDeleteSelected();
      await sel.onConfirmed();
      expect(addToast).toHaveBeenCalledWith('Failed to delete sessions', 'error');
    });
  });

  describe('onCancelled', () => {
    it('hides the confirm dialog', () => {
      const { sel } = setup();
      sel.handleDeleteSession('s1');
      sel.onCancelled();
      expect(sel.confirmVisible.value).toBe(false);
    });

    it('does not call deleteOne when cancelled', async () => {
      const { sel, deleteOne } = setup();
      sel.handleDeleteSession('s1');
      sel.onCancelled();
      expect(deleteOne).not.toHaveBeenCalled();
    });
  });
});
