<script setup lang="ts">
import Questionnaire from '../components/ui/Questionnaire.vue';
</script>

<template>
  <div class="home-view">
    <div class="header-section">
      <h1>Manifestation Algorithm</h1>
      <p class="subtitle">Rate each item from 1 to 10</p>
    </div>
    <Questionnaire />
  </div>
</template>

<style scoped>
.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: var(--true-cobalt);
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}
</style>