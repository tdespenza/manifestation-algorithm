<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import NetworkStatus from './components/NetworkStatus.vue';
import logoUrl from './assets/logo.svg';
</script>

<template>
  <div class="app-layout">
    <nav class="main-nav">
      <div class="nav-content">
        <div class="nav-left">
          <router-link to="/" class="nav-logo">
            <img :src="logoUrl" alt="Manifestation Algorithm" class="nav-logo-img" />
            <span class="nav-logo-text">Manifestation Algorithm</span>
          </router-link>
          <div class="nav-links">
            <router-link to="/" active-class="active">Questionnaire</router-link>
            <router-link to="/dashboard" active-class="active">History</router-link>
          </div>
        </div>
        <div class="nav-right">
          <NetworkStatus class="network-status-nav" />
          <router-link
            to="/settings"
            active-class="active"
            class="settings-link"
            aria-label="Settings"
            >⚙️</router-link
          >
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
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
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
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  line-height: 1;
}

.nav-logo-img {
  width: 36px;
  height: 36px;
  filter: drop-shadow(0 0 5px rgba(185, 148, 64, 0.3));
  transition: filter 0.25s;
}

.nav-logo-text {
  font-weight: 700;
  font-size: 0.85rem;
  color: #333;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.nav-logo:hover .nav-logo-img {
  filter: drop-shadow(0 0 10px rgba(185, 148, 64, 0.55));
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
  color: var(--true-cobalt, #0047ab);
}

.nav-links a.active {
  color: var(--true-cobalt, #0047ab);
  border-bottom-color: var(--true-cobalt, #0047ab);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 15px;
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
