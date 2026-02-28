<template>
  <div
    class="question-item"
    :class="{
      'parent-question': question.hasSubPoints,
      'sub-question': isSubQuestion,
      highlighted: props.highlighted && !question.hasSubPoints
    }"
    :style="{ borderLeftColor: isSubQuestion ? '#C4923E' : '#0A1F7D' }"
  >
    <div class="question-header">
      <span class="question-number">{{ question.id }}</span>
      <div class="question-text">{{ question.description }}</div>
      <span class="question-points">{{ question.points }} pts</span>
    </div>

    <!-- Rating Slider -->
    <div v-if="!question.hasSubPoints" class="slider-wrapper">
      <div class="slider-container">
        <span class="slider-label low-label">Low</span>
        <input
          type="range"
          class="slider"
          min="1"
          max="10"
          :value="internalValue"
          :style="{ '--fill-pct': sliderFillPct }"
          :aria-label="`Rate ${question.description}`"
          @input="handleInput"
        />
        <span class="slider-label high-label">High</span>
        <span class="slider-value" :class="sliderValueClass">{{ internalValue }}</span>
      </div>

      <div class="score-display">
        <span class="score-calc">{{ calculatedScore.toFixed(1) }} / {{ question.points }} pts</span>
      </div>
    </div>

    <!-- Sub-Questions -->
    <div v-if="question.hasSubPoints && question.subPoints?.length" class="sub-points-section">
      <QuestionItem
        v-for="sub in question.subPoints"
        :key="sub.id"
        :question="sub"
        :is-sub-question="true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useQuestionnaireStore } from '../../stores/questionnaire';
import type { Question } from '../../types';

const props = defineProps<{
  question: Question;
  isSubQuestion?: boolean;
  highlighted?: boolean;
}>();

const store = useQuestionnaireStore();

// Access store directly for reactive state
const internalValue = computed({
  get: () => store.answers[props.question.id] || 1,
  set: val => {
    if (val >= 1 && val <= 10) {
      store.setAnswer(props.question.id, val);
    }
  }
});

const calculatedScore = computed(() => {
  return props.question.points * (internalValue.value / 10);
});

// Percentage fill for the slider track (0% at value=1, 100% at value=10)
const sliderFillPct = computed(() => {
  return `${Math.round(((internalValue.value - 1) / 9) * 100)}%`;
});

const sliderValueClass = computed(() => {
  if (internalValue.value >= 8) return 'value-high';
  if (internalValue.value >= 5) return 'value-mid';
  return 'value-low';
});

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  const val = Number.parseInt(target.value);
  internalValue.value = val;
}
</script>

<style scoped>
.question-item {
  margin-bottom: 20px;
  padding: 22px 24px;
  background: white;
  border-radius: 12px;
  border-left: 4px solid #0a1f7d;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.question-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.09);
}

.question-item.highlighted {
  box-shadow:
    0 0 0 2px rgba(10, 31, 125, 0.2),
    0 8px 28px rgba(10, 31, 125, 0.12);
  transform: none;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 10px;
}

.question-number {
  font-weight: 700;
  color: var(--true-cobalt, #0a1f7d);
  font-size: 0.95em;
  min-width: 36px;
  opacity: 0.65;
}

.question-text {
  flex: 1;
  font-size: 1.05em;
  font-weight: 600;
  line-height: 1.45;
  color: #1a1a2e;
}

.question-points {
  background: var(--true-cobalt, #0a1f7d);
  color: white;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.78em;
  font-weight: 700;
  white-space: nowrap;
}

.sub-question {
  margin-top: 12px;
  margin-bottom: 0;
  background: #fafbff;
  border-left-width: 3px;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
}

/* Filled slider track via CSS custom property --fill-pct */
.slider {
  flex: 1;
  height: 6px;
  border-radius: 4px;
  outline: none;
  -webkit-appearance: none;
  cursor: pointer;
  background: linear-gradient(
    to right,
    var(--true-cobalt, #0a1f7d) 0%,
    var(--true-cobalt, #0a1f7d) var(--fill-pct, 44%),
    #dde2f4 var(--fill-pct, 44%),
    #dde2f4 100%
  );
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--true-cobalt, #0a1f7d);
  box-shadow: 0 2px 6px rgba(10, 31, 125, 0.35);
  cursor: pointer;
  border: 2px solid white;
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease;
}

.slider:active::-webkit-slider-thumb,
.slider:hover::-webkit-slider-thumb {
  transform: scale(1.18);
  box-shadow: 0 3px 10px rgba(10, 31, 125, 0.45);
}

.slider::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 4px;
}

.slider-label {
  font-size: 0.72em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  min-width: 28px;
  text-align: center;
}

.low-label {
  color: #9f1d1d;
}

.high-label {
  color: #1f6f35;
}

.slider-value {
  font-weight: 800;
  font-size: 1.25em;
  min-width: 28px;
  text-align: center;
  transition: color 0.2s;
}

.value-low {
  color: #ef5350;
}

.value-mid {
  color: #f9a825;
}

.value-high {
  color: #2e7d32;
}

.score-display {
  margin-top: 8px;
  text-align: right;
}

.score-calc {
  font-size: 0.82em;
  color: #4b5563;
  font-weight: 500;
}
</style>
