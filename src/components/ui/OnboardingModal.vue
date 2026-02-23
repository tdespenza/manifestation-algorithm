<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{ (e: 'complete'): void }>();

const step = ref(0);
const totalSteps = 3;

function next() {
  if (step.value < totalSteps - 1) {
    step.value++;
  } else {
    emit('complete');
  }
}

function skip() {
  emit('complete');
}
</script>

<template>
  <div
    class="onboarding-backdrop"
    role="dialog"
    aria-modal="true"
    aria-labelledby="onboarding-title"
  >
    <div class="onboarding-card">
      <!-- Step indicators -->
      <div class="step-dots" aria-hidden="true">
        <span
          v-for="i in totalSteps"
          :key="i"
          class="dot"
          :class="{ active: i - 1 === step, done: i - 1 < step }"
        />
      </div>

      <!-- Step 0: What is this? -->
      <div v-if="step === 0" class="step-content">
        <div class="step-icon">✦</div>
        <h2 id="onboarding-title" class="step-title">Welcome to the Manifestation Algorithm</h2>
        <p class="step-body">
          This tool helps you measure how aligned your mindset, habits, and daily actions are with
          achieving your goals. Answer each question honestly to get your current score.
        </p>
        <p class="step-body">
          Complete the questionnaire at regular intervals to track your growth over time and see
          which areas need the most attention.
        </p>
      </div>

      <!-- Step 1: Scoring explained -->
      <div v-else-if="step === 1" class="step-content">
        <div class="step-icon">📊</div>
        <h2 id="onboarding-title" class="step-title">How Scoring Works</h2>
        <p class="step-body">
          Each question is worth a set number of points. Rate yourself on a scale of
          <strong>1&ndash;10</strong> for every question. A rating of 10 means you fully embody that
          principle; 1 means you haven't started.
        </p>
        <div class="score-tiers">
          <div class="tier tier--excellent">
            <span class="tier-range">7,001 – 10,000</span>
            <span class="tier-label">Excellent</span>
            <span class="tier-note">Strong alignment — keep going</span>
          </div>
          <div class="tier tier--good">
            <span class="tier-range">4,001 – 7,000</span>
            <span class="tier-label">Good</span>
            <span class="tier-note">Solid foundation — room to grow</span>
          </div>
          <div class="tier tier--needs-work">
            <span class="tier-range">0 – 4,000</span>
            <span class="tier-label">Needs Work</span>
            <span class="tier-note">Focus on fundamentals first</span>
          </div>
        </div>
        <p class="step-hint">
          🎯 Target: <strong>6,000+</strong> &nbsp;|&nbsp; Maximum: <strong>10,000</strong>
        </p>
      </div>

      <!-- Step 2: Privacy -->
      <div v-else-if="step === 2" class="step-content">
        <div class="step-icon">🔒</div>
        <h2 id="onboarding-title" class="step-title">Your Data Stays Private</h2>
        <p class="step-body">
          All your answers and score history are stored <strong>locally on your device</strong>
          using an encrypted SQLite database. Nothing is sent to any server without your explicit
          permission.
        </p>
        <p class="step-body">
          The optional peer-to-peer sharing feature lets you see anonymised aggregate scores from
          other users. It only shares a cryptographically signed summary — never your individual
          answers.
        </p>
        <p class="step-body ready-text">Ready? Let's get your baseline score.</p>
      </div>

      <!-- Navigation -->
      <div class="step-actions">
        <button class="btn-skip" @click="skip">Skip intro</button>
        <button class="btn-next" @click="next">
          {{ step < totalSteps - 1 ? 'Next' : 'Get Started' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.onboarding-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(10, 31, 125, 0.55);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.onboarding-card {
  background: #fff;
  border-radius: var(--radius-xl, 24px);
  padding: 44px 40px 32px;
  max-width: 520px;
  width: 100%;
  box-shadow: var(--shadow-lg, 0 8px 30px rgba(0, 0, 0, 0.12));
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Step dots */
.step-dots {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e2e6f0;
  transition: background var(--transition-base, 0.22s ease);
}

.dot.active {
  background: var(--true-cobalt, #0a1f7d);
  width: 22px;
  border-radius: 4px;
}

.dot.done {
  background: var(--dusty-grape, #6061a4);
}

/* Content area */
.step-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.step-icon {
  font-size: 2.4rem;
  text-align: center;
  line-height: 1;
}

.step-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--true-cobalt, #0a1f7d);
  text-align: center;
  margin: 0;
}

.step-body {
  font-size: 0.95rem;
  color: #444;
  line-height: 1.65;
  margin: 0;
}

.ready-text {
  font-weight: 600;
  color: var(--true-cobalt, #0a1f7d);
  text-align: center;
  margin-top: 6px;
}

/* Score tiers */
.score-tiers {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
}

.tier {
  display: grid;
  grid-template-columns: 130px 1fr 1fr;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: var(--radius-md, 10px);
  font-size: 0.88rem;
}

.tier-range {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
}

.tier-label {
  font-weight: 700;
}

.tier-note {
  color: #666;
  font-size: 0.82rem;
}

.tier--excellent {
  background: rgba(76, 175, 80, 0.08);
  color: #1b5e20;
}

.tier--good {
  background: rgba(245, 158, 11, 0.08);
  color: #78350f;
}

.tier--needs-work {
  background: rgba(220, 38, 38, 0.07);
  color: #7f1d1d;
}

.step-hint {
  font-size: 0.9rem;
  color: #555;
  text-align: center;
  margin-top: 2px;
}

/* Actions */
.step-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 4px;
}

.btn-skip {
  background: none;
  border: none;
  color: var(--color-muted, #94a3b8);
  font-size: 0.88rem;
  cursor: pointer;
  padding: 6px 2px;
  transition: color var(--transition-fast, 0.15s ease);
}

.btn-skip:hover {
  color: #666;
}

.btn-next {
  background: var(--true-cobalt, #0a1f7d);
  color: #fff;
  border: none;
  border-radius: var(--radius-md, 10px);
  padding: 11px 28px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity var(--transition-fast, 0.15s ease);
}

.btn-next:hover {
  opacity: 0.88;
}

@media (max-width: 480px) {
  .onboarding-card {
    padding: 32px 22px 24px;
  }

  .tier {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
  }

  .tier-note {
    grid-column: 1 / -1;
  }
}
</style>
