<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { computed, onErrorCaptured, onMounted } from 'vue';
import NetworkStatus from './components/NetworkStatus.vue';
import AppToast from './components/ui/AppToast.vue';
import UpdateNotification from './components/ui/UpdateNotification.vue';
import logoUrl from './assets/logo.svg';
import { useToast } from './composables/useToast';
import { useNetwork, loadSharingState } from './composables/useNetwork';

const route = useRoute();
const mainClass = computed(() => (route.name === 'dashboard' ? 'full-width-main' : 'container'));
const { addToast } = useToast();
const { sharingEnabled } = useNetwork();

onMounted(() => {
  loadSharingState().catch(() => {});
});

onErrorCaptured(err => {
  console.error('Caught in App boundary:', err);
  addToast('An unexpected error occurred.', 'error');
  return false;
});
</script>

<template>
  <div class="app-layout">
    <nav class="main-nav">
      <div class="nav-content">
        <div class="nav-left">
          <router-link to="/" class="nav-logo" aria-label="Manifestation Algorithm">
            <img :src="logoUrl" alt="Manifestation Algorithm" class="nav-logo-img" />
          </router-link>
          <div class="nav-links">
            <router-link to="/" active-class="active">Questionnaire</router-link>
            <router-link to="/dashboard" active-class="active">History</router-link>
          </div>
        </div>
        <div class="nav-right">
          <NetworkStatus v-if="sharingEnabled" class="network-status-nav" />
          <router-link
            to="/settings"
            active-class="active"
            class="settings-link"
            aria-label="Settings"
            title="Settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3" />
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
              />
            </svg>
          </router-link>
        </div>
      </div>
    </nav>

    <UpdateNotification />

    <main :class="mainClass">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
  <AppToast />
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.main-nav {
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
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
  transition: color var(--transition-fast, 0.15s ease);
  padding: 6px 2px;
  border-bottom: 2px solid transparent;
  font-size: 0.92rem;
  letter-spacing: 0.01em;
}

.nav-links a:hover {
  color: var(--true-cobalt, #0a1f7d);
}

.nav-links a.active {
  color: var(--true-cobalt, #0a1f7d);
  border-bottom-color: var(--true-cobalt, #0a1f7d);
  font-weight: 600;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.settings-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  text-decoration: none;
  color: #666;
  transition:
    color var(--transition-fast, 0.15s ease),
    background var(--transition-fast, 0.15s ease);
}

.settings-link:hover {
  color: var(--true-cobalt, #0a1f7d);
  background: rgba(10, 31, 125, 0.08);
}

.settings-link.active {
  color: var(--true-cobalt, #0a1f7d);
  background: rgba(10, 31, 125, 0.1);
}

/* NetworkStatus in the nav bar is display-only; never let it intercept clicks */
.network-status-nav {
  pointer-events: none;
}

/* On narrow viewports hide all text inside NetworkStatus; show only the dot */
@media (max-width: 520px) {
  .network-status-nav :deep(.status-text),
  .network-status-nav :deep(.peer-count),
  .network-status-nav :deep(.manifestation-count),
  .network-status-nav :deep(.avg-score),
  .network-status-nav :deep(.p90) {
    display: none;
  }
}

.container {
  padding-top: 20px;
  padding-bottom: 40px;
}

.full-width-main {
  width: 100%;
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
