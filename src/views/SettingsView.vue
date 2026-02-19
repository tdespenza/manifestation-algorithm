<script setup lang="ts">
import Settings from '../components/ui/Settings.vue';
</script>

<template>
  <div class="settings-view">
    <div class="header-section">
      <h1>Settings</h1>
    </div>
    <Settings @close="$router.push('/')" />
  </div>
</template>

<style scoped>
.settings-view {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}
.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: var(--true-cobalt, #0047ab);
}
</style>
