<script setup lang="ts">
import type { DateRange } from '../../composables/useDateFilter';

const props = defineProps<{
  modelValue: string;
  ranges: DateRange[];
  customStart?: string;
  customEnd?: string;
  todayStr?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'update:customStart', value: string): void;
  (e: 'update:customEnd', value: string): void;
}>();

const today = props.todayStr ?? new Date().toISOString().slice(0, 10);

function select(value: string) {
  emit('update:modelValue', value);
}
</script>

<template>
  <div class="range-selector">
    <span class="range-label">Range:</span>
    <div class="range-pills">
      <button
        v-for="r in ranges"
        :key="r.value"
        class="range-pill"
        :class="{ active: modelValue === r.value }"
        @click="select(r.value)"
      >
        {{ r.label }}
      </button>
    </div>
    <template v-if="modelValue === 'custom'">
      <div class="custom-dates">
        <input
          id="custom-start"
          type="date"
          class="date-input"
          :value="customStart"
          :max="customEnd || today"
          aria-label="Start date"
          @input="emit('update:customStart', ($event.target as HTMLInputElement).value)"
        />
        <span class="date-sep">→</span>
        <input
          id="custom-end"
          type="date"
          class="date-input"
          :value="customEnd"
          :min="customStart"
          :max="today"
          aria-label="End date"
          @input="emit('update:customEnd', ($event.target as HTMLInputElement).value)"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.range-selector {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: white;
  padding: 0.45rem 0.75rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
}

.range-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #666;
  white-space: nowrap;
}

.range-pills {
  display: flex;
  gap: 4px;
  align-items: center;
}

.range-pill {
  padding: 4px 10px;
  border: 1.5px solid #d1d5db;
  background: transparent;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #555;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
}

.range-pill:hover {
  border-color: var(--true-cobalt, #0a1f7d);
  color: var(--true-cobalt, #0a1f7d);
}

.range-pill.active {
  background: var(--true-cobalt, #0a1f7d);
  border-color: var(--true-cobalt, #0a1f7d);
  color: white;
}

.custom-dates {
  display: flex;
  align-items: center;
  gap: 6px;
}

.date-input {
  border: 1.5px solid #d1d5db;
  border-radius: 6px;
  padding: 3px 8px;
  font-size: 0.82rem;
  font-family: inherit;
  color: #333;
  background: #f9fafb;
  cursor: pointer;
  transition: border-color 0.15s;
}

.date-input:focus {
  outline: none;
  border-color: var(--true-cobalt, #0a1f7d);
  box-shadow: 0 0 0 2px rgba(10, 31, 125, 0.12);
}

.date-sep {
  font-size: 0.85rem;
  color: #888;
}
</style>
