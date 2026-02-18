<script setup lang="ts">
import { ref } from 'vue';

// Placeholder for dashboard components we will build next
const isLoading = ref(false);
</script>

<template>
  <div class="dashboard-view">
    <div class="dashboard-header">
      <h1>Manifestation History</h1>
      <p class="subtitle">Track your progress over time</p>
    </div>
    
    <div class="dashboard-content">
      <div v-if="isLoading" class="loading">Loading history...</div>
      <div v-else class="empty-state">
        <p>No historical sessions found yet. Complete a questionnaire to see results here.</p>
        <router-link to="/" class="cta-button">Start New Assessment</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 2rem;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  color: var(--true-cobalt, #0047AB);
  margin-bottom: 0.5rem;
}

.empty-state {
  text-align: center;
  padding: 4rem;
  background: #f8f9fa;
  border-radius: 12px;
  color: #666;
}

.cta-button {
  display: inline-block;
  margin-top: 1rem;
  padding: 10px 20px;
  background: var(--true-cobalt, #0047AB);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: opacity 0.2s;
}

.cta-button:hover {
  opacity: 0.9;
}
</style>