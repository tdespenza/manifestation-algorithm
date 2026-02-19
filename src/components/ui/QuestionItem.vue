<template>
  <div
    class="question-item"
    :class="{ 'parent-question': question.hasSubPoints, 'sub-question': isSubQuestion }"
    :style="{ borderLeftColor: isSubQuestion ? '#C4923E' : '#0A1F7D' }"
  >
    <div class="question-header">
      <span class="question-number">{{ question.id }}</span>
      <div class="question-text">{{ question.description }}</div>
      <span class="question-points">{{ question.points }} points</span>
    </div>

    <!-- Rating Slider -->
    <div v-if="!question.hasSubPoints" class="slider-wrapper">
      <div class="slider-container">
        <span class="slider-label">1</span>
        <input
          type="range"
          class="slider"
          min="1"
          max="10"
          :value="internalValue"
          :aria-label="`Rate ${question.description}`"
          @input="handleInput"
        />
        <span class="slider-label">10</span>
        <span class="slider-value">{{ internalValue }}</span>
      </div>

      <div class="score-display">
        Score: <span class="score-value">{{ calculatedScore }}</span> points
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
}>();

const store = useQuestionnaireStore();

// Access store directly for reactive state
const internalValue = computed({
  get: () => store.answers[props.question.id] || 1,
  set: val => {
    if (val >= 1 && val <= 10) {
      store.setAnswer(props.question.id, val);
    }
  },
});

const calculatedScore = computed(() => {
  return props.question.points * (internalValue.value / 10);
});

function handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  const val = parseInt(target.value);
  internalValue.value = val;
}
</script>

<style scoped>
.question-item {
  margin-bottom: 25px;
  padding: 25px;
  background: white;
  border-radius: 12px;
  border-left: 4px solid #0a1f7d;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.question-item:hover {
  transform: translateX(5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
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
  font-weight: bold;
  color: var(--true-cobalt);
  font-size: 1.2em;
  min-width: 40px;
}

.question-text {
  flex: 1;
  font-size: 1.1em;
  font-weight: 500;
  line-height: 1.4;
}

.question-points {
  background: var(--true-cobalt);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: bold;
}

.sub-question {
  margin-top: 15px;
  margin-bottom: 0;
  background: rgba(248, 253, 255, 0.8);
  border-left-width: 3px;
}

.slider-container {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 20px;
}

.slider {
  flex: 1;
  height: 8px;
  border-radius: 5px;
  background: #eee;
  outline: none;
  -webkit-appearance: none;
  cursor: pointer;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--true-cobalt);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  margin-top: -8px; /* specific to webkit */
}

.slider::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  background: #ddd;
  border-radius: 5px;
}

.slider-value {
  font-weight: bold;
  color: var(--true-cobalt);
  font-size: 1.2em;
  min-width: 30px;
  text-align: center;
}

.score-display {
  font-size: 0.9em;
  color: var(--dusty-grape);
  margin-top: 10px;
  text-align: right;
  border-top: 1px solid #eee;
  padding-top: 8px;
}

.score-value {
  font-weight: bold;
  color: var(--true-cobalt);
}
</style>
