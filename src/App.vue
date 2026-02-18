
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <div class="app-layout">
    <nav class="main-nav">
      <div class="nav-content">
        <div class="nav-left">
          <router-link to="/" class="nav-logo">MA</router-link>
          <div class="nav-links">
            <router-link to="/" active-class="active">Questionnaire</router-link>
            <router-link to="/dashboard" active-class="active">History</router-link>
          </div>
        </div>
        <div class="nav-right">
          <router-link to="/settings" active-class="active" class="settings-link" aria-label="Settings">⚙️</router-link>
        </div>
      </div>
    </nav>

    <main class="container">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.main-nav {
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-logo {
  font-weight: 900;
  font-size: 1.5rem;
  color: var(--true-cobalt, #0047AB);
  text-decoration: none;
  letter-spacing: -1px;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: #666;
  font-weight: 500;
  transition: color 0.2s;
  padding: 5px 0;
  border-bottom: 2px solid transparent;
}

.nav-links a:hover {
  color: var(--true-cobalt, #0047AB);
}

.nav-links a.active {
  color: var(--true-cobalt, #0047AB);
  border-bottom-color: var(--true-cobalt, #0047AB);
}

.settings-link {
  font-size: 1.2rem;
  text-decoration: none;
}

.container {
  padding-top: 20px;
  padding-bottom: 40px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>


