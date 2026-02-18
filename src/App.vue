
<script setup lang="ts">
import { ref } from "vue";
import Questionnaire from "./components/ui/Questionnaire.vue";
import Settings from "./components/ui/Settings.vue";

const showSettings = ref(false);
</script>

<template>
  <main class="container">
    <div class="app-header">
      <div v-if="!showSettings" class="header-content">
        <h1>Manifestation Algorithm</h1>
        <button class="settings-btn" @click="showSettings = true" aria-label="Settings">
          ⚙️
        </button>
      </div>
      <div v-else class="header-content">
          <h1>Settings</h1>
      </div>
      <p v-if="!showSettings" class="subtitle">Rate each item from 1 to 10</p>
    </div>
    
    <div v-if="showSettings">
      <Settings @close="showSettings = false" />
    </div>
    <div v-else>
      <Questionnaire />
    </div>
  </main>
</template>

<style scoped>
.app-header {
  margin-bottom: 20px;
  text-align: center;
}

.header-content {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 48px;
}

.settings-btn {
  position: absolute;
  right: 0;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
}

.settings-btn:hover {
  background-color: rgba(0,0,0,0.05);
}
</style>


