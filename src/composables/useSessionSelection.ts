import { ref, computed } from 'vue';
import type { ComputedRef } from 'vue';
import type { SessionSummary } from '../services/db';
import type { ToastType } from './useToast';

export interface ConfirmState {
  visible: boolean;
  title: string;
  message: string;
  action: (() => Promise<void>) | null;
}

export function useSessionSelection(
  sessions: ComputedRef<SessionSummary[]>,
  deleteOne: (id: string) => Promise<void>,
  deleteMany: (ids: string[]) => Promise<void>,
  addToast: (message: string, type?: ToastType) => void
) {
  const selectedIds = ref<Set<string>>(new Set());
  const selectionMode = ref(false);
  const isDeleting = ref(false);

  const confirmVisible = ref(false);
  const confirmTitle = ref('');
  const confirmMessage = ref('');
  const confirmAction = ref<(() => Promise<void>) | null>(null);

  const selectedCount = computed(() => selectedIds.value.size);
  const allSelected = computed(
    () => sessions.value.length > 0 && selectedIds.value.size === sessions.value.length
  );

  // ── Confirm helpers ───────────────────────────────────────────────────────
  function showConfirm(title: string, message: string, action: () => Promise<void>) {
    confirmTitle.value = title;
    confirmMessage.value = message;
    confirmAction.value = action;
    confirmVisible.value = true;
  }

  async function onConfirmed() {
    confirmVisible.value = false;
    if (confirmAction.value) await confirmAction.value();
  }

  function onCancelled() {
    confirmVisible.value = false;
    confirmAction.value = null;
  }

  // ── Selection mode ────────────────────────────────────────────────────────
  function enterSelectionMode() {
    selectionMode.value = true;
  }

  function exitSelectionMode() {
    selectionMode.value = false;
    selectedIds.value = new Set();
  }

  function toggleSelect(id: string) {
    const updated = new Set(selectedIds.value);
    if (updated.has(id)) updated.delete(id);
    else updated.add(id);
    selectedIds.value = updated;
  }

  function toggleSelectAll() {
    if (allSelected.value) {
      selectedIds.value = new Set();
    } else {
      selectedIds.value = new Set(sessions.value.map(s => s.id));
    }
  }

  // ── Delete handlers ───────────────────────────────────────────────────────
  async function doDeleteSession(id: string) {
    isDeleting.value = true;
    try {
      await deleteOne(id);
      const updated = new Set(selectedIds.value);
      updated.delete(id);
      selectedIds.value = updated;
      addToast('Session deleted', 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to delete session', 'error');
    } finally {
      isDeleting.value = false;
    }
  }

  function handleDeleteSession(id: string) {
    showConfirm(
      'Delete Session',
      'Are you sure you want to permanently delete this session? This cannot be undone.',
      () => doDeleteSession(id)
    );
  }

  async function doDeleteSelected(ids: string[]) {
    isDeleting.value = true;
    try {
      await deleteMany(ids);
      exitSelectionMode();
      addToast(`Deleted ${ids.length} session${ids.length === 1 ? '' : 's'}`, 'success');
    } catch (err) {
      console.error(err);
      addToast('Failed to delete sessions', 'error');
    } finally {
      isDeleting.value = false;
    }
  }

  function handleDeleteSelected() {
    if (selectedIds.value.size === 0) return;
    const ids = [...selectedIds.value];
    const count = ids.length;
    showConfirm(
      `Delete ${count} Session${count === 1 ? '' : 's'}`,
      `Are you sure you want to permanently delete ${
        count === 1 ? 'this session' : `these ${count} sessions`
      }? This cannot be undone.`,
      () => doDeleteSelected(ids)
    );
  }

  return {
    selectedIds,
    selectionMode,
    isDeleting,
    selectedCount,
    allSelected,
    confirmVisible,
    confirmTitle,
    confirmMessage,
    onConfirmed,
    onCancelled,
    enterSelectionMode,
    exitSelectionMode,
    toggleSelect,
    toggleSelectAll,
    handleDeleteSession,
    handleDeleteSelected
  };
}
