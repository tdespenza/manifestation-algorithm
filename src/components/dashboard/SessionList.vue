<script setup lang="ts">
import type { SessionSummary } from '../../services/db';

/**
 * SessionList — displays the paginated list of assessment sessions with
 * selection-mode mass-delete, per-card inline delete, and load-more pagination.
 *
 * All business logic lives in the parent (DashboardView) via useSessionSelection;
 * this component is purely presentational.
 */

defineProps<{
  sessions: SessionSummary[];
  isDeleting: boolean;
  selectionMode: boolean;
  selectedIds: Set<string>;
  allSelected: boolean;
  selectedCount: number;
  hasMore: boolean;
  isLoadingMore: boolean;
  remaining: number;
}>();

const emit = defineEmits<{
  (e: 'delete-session', id: string): void;
  (e: 'delete-selected'): void;
  (e: 'toggle-select', id: string): void;
  (e: 'toggle-select-all'): void;
  (e: 'enter-selection'): void;
  (e: 'exit-selection'): void;
  (e: 'load-more'): void;
}>();
</script>

<template>
  <div class="recent-sessions">
    <div class="recent-sessions-header">
      <h2>Recent Sessions</h2>
      <div class="sessions-header-actions">
        <template v-if="selectionMode">
          <button class="select-all-pill" @click="emit('toggle-select-all')">
            {{ allSelected ? 'Deselect All' : 'Select All' }}
          </button>
          <button
            v-if="selectedCount > 0"
            class="delete-selected-btn-sm"
            :disabled="isDeleting"
            @click="emit('delete-selected')"
          >
            {{ isDeleting ? 'Deleting…' : `Delete ${selectedCount}` }}
          </button>
          <button class="cancel-select-btn" @click="emit('exit-selection')">Cancel</button>
        </template>
        <button v-else class="select-mode-btn" @click="emit('enter-selection')">Select</button>
      </div>
    </div>

    <div class="session-list">
      <div
        v-for="session in sessions"
        :key="session.id"
        class="session-card"
        :class="{
          selected: selectedIds.has(session.id),
          'selection-mode': selectionMode
        }"
        @click="selectionMode ? emit('toggle-select', session.id) : undefined"
      >
        <!-- Check badge (selection mode only) -->
        <div
          v-if="selectionMode"
          class="session-check"
          :class="{ checked: selectedIds.has(session.id) }"
        >
          <span v-if="selectedIds.has(session.id)" class="check-symbol">✓</span>
        </div>

        <!-- Individual delete (normal mode, hover only) -->
        <button
          v-else
          class="delete-btn-inline"
          title="Delete session"
          :disabled="isDeleting"
          @click.stop="emit('delete-session', session.id)"
        >
          ✕
        </button>

        <div class="session-date">
          {{ new Date(session.completed_at).toLocaleDateString() }}
          <span class="session-time">{{
            new Date(session.completed_at).toLocaleTimeString()
          }}</span>
        </div>
        <div class="session-score" :class="{ high: session.total_score > 5000 }">
          {{ Math.round(session.total_score).toLocaleString() }}
        </div>
        <div
          class="session-score-label"
          :class="{
            'label-high': session.total_score > 7000,
            'label-mid': session.total_score >= 4000 && session.total_score <= 7000,
            'label-low': session.total_score < 4000
          }"
        >
          {{
            session.total_score > 7000
              ? 'Excellent'
              : session.total_score >= 4000
                ? 'Good'
                : 'Needs Work'
          }}
        </div>
      </div>
    </div>

    <!-- Load More sessions (paginated, 20 per page) -->
    <div v-if="hasMore" class="load-more-wrap">
      <button class="load-more-btn" :disabled="isLoadingMore" @click="emit('load-more')">
        {{ isLoadingMore ? 'Loading…' : `Load More (${remaining} remaining)` }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/* ── Section wrapper ──────────────────────────────────────────────────────── */
.recent-sessions {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

/* ── Header row ───────────────────────────────────────────────────────────── */
.recent-sessions-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.recent-sessions-header h2 {
  margin: 0;
  margin-top: 0;
  margin-bottom: 16px;
  color: var(--color-heading, #2c3e50);
  font-size: 1.3rem;
}

.sessions-header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.select-mode-btn {
  padding: 6px 16px;
  background: transparent;
  border: 1.5px solid #bbb;
  border-radius: 20px;
  color: #555;
  font-size: 0.85em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  letter-spacing: 0.03em;
}

.select-mode-btn:hover {
  border-color: var(--true-cobalt, #0a1f7d);
  color: var(--true-cobalt, #0a1f7d);
}

.select-all-pill {
  padding: 5px 12px;
  background: rgba(0, 71, 171, 0.08);
  border: none;
  border-radius: 20px;
  color: var(--true-cobalt, #0a1f7d);
  font-size: 0.82em;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.select-all-pill:hover {
  background: rgba(0, 71, 171, 0.16);
}

.delete-selected-btn-sm {
  padding: 5px 14px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 0.82em;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
}

.delete-selected-btn-sm:hover:not(:disabled) {
  background: #b02a37;
}

.delete-selected-btn-sm:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.cancel-select-btn {
  padding: 5px 12px;
  background: transparent;
  border: none;
  color: #888;
  font-size: 0.82em;
  font-weight: 600;
  cursor: pointer;
  border-radius: 20px;
  transition:
    background 0.15s,
    color 0.15s;
}

.cancel-select-btn:hover {
  background: #f0f0f0;
  color: #333;
}

/* ── Session grid ─────────────────────────────────────────────────────────── */
.session-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

@media (min-width: 1400px) {
  .session-list {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

/* ── Session card ─────────────────────────────────────────────────────────── */
.session-card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    border-color 0.2s;
  border-left: 4px solid var(--true-cobalt, #0a1f7d);
  position: relative;
}

.session-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.session-card.selection-mode {
  cursor: pointer;
}

.session-card.selection-mode:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
}

.session-card.selected {
  border-left-color: #43a047;
  background: #f6fff7;
}

/* ── Selection check badge ────────────────────────────────────────────────── */
.session-check {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #ccc;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    border-color 0.15s,
    background 0.15s;
  flex-shrink: 0;
}

.session-check.checked {
  border-color: #43a047;
  background: #43a047;
}

.check-symbol {
  color: white;
  font-size: 0.75rem;
  font-weight: 800;
  line-height: 1;
}

/* ── Inline delete button (hover-reveal, normal mode) ─────────────────────── */
.delete-btn-inline {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  color: #d0d0d0;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 4px;
  opacity: 0;
  transition:
    opacity 0.15s,
    color 0.15s,
    background 0.15s;
  line-height: 1;
}

.session-card:hover .delete-btn-inline {
  opacity: 1;
}

.delete-btn-inline:hover:not(:disabled) {
  color: #dc3545;
  background: #fff0f0;
}

.delete-btn-inline:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* ── Session card content ─────────────────────────────────────────────────── */
.session-date {
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 8px;
  font-weight: 600;
  margin-bottom: 8px;
}

.session-time {
  font-size: 0.8em;
  color: #888;
}

.session-score {
  font-weight: 800;
  font-size: 1.5em;
  color: #555;
}

.session-score.high {
  color: #4caf50;
}

.session-score-label {
  font-size: 0.72em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 2px;
  padding: 2px 8px;
  border-radius: 10px;
  display: inline-block;
}

.label-high {
  background: #e8f5e9;
  color: #2e7d32;
}

.label-mid {
  background: #fff3e0;
  color: #e65100;
}

.label-low {
  background: #ffebee;
  color: #c62828;
}

/* ── Load More ────────────────────────────────────────────────────────────── */
.load-more-wrap {
  display: flex;
  justify-content: center;
  padding: 16px 0 4px;
}

.load-more-btn {
  padding: 8px 24px;
  border: 1px solid #6c757d;
  border-radius: 6px;
  background: white;
  color: #495057;
  font-size: 0.875rem;
  cursor: pointer;
  transition:
    background 0.15s ease,
    border-color 0.15s ease;
}

.load-more-btn:hover:not(:disabled) {
  background: #f8f9fa;
  border-color: #495057;
}

.load-more-btn:disabled {
  cursor: default;
  opacity: 0.6;
}
</style>
