<template>
  <div class="sharing-toggle">
    <div class="toggle-header">
      <h4>Anonymous Network Sharing</h4>
      <span class="privacy-badge">🔒 Privacy-First</span>
    </div>

    <p class="toggle-description">
      Optionally contribute your results anonymously to the global network. No name, email, IP
      address, or device ID is ever shared.
    </p>

    <label class="toggle-label" for="sharing-toggle-input">
      <input
        id="sharing-toggle-input"
        type="checkbox"
        :checked="sharingEnabled"
        class="toggle-input"
        data-testid="sharing-checkbox"
        @change="handleToggle"
      />
      <span class="toggle-switch" :class="{ active: sharingEnabled }"></span>
      <span class="toggle-text">
        {{
          sharingEnabled
            ? 'Sharing enabled — contributing to network'
            : 'Sharing disabled (default)'
        }}
      </span>
    </label>

    <div v-if="sharingEnabled" class="sharing-active-badge">
      ✓ Your anonymised scores are being shared with peers
    </div>
    <div v-else class="sharing-off-note">
      Enable to see your percentile rank compared to the global network.
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useNetwork, loadSharingState } from '../../composables/useNetwork';

const { sharingEnabled, toggleSharing } = useNetwork();

// Load the persisted value directly on mount so this component is always
// initialised correctly regardless of whether useNetwork().init() has been
// called by a parent (e.g. when navigating straight to the Settings page).
onMounted(async () => {
  await loadSharingState();
});

async function handleToggle(event: Event) {
  const target = event.target as HTMLInputElement;
  await toggleSharing(target.checked);
}
</script>

<style scoped>
.sharing-toggle {
  background: #f4f6fa;
  border-radius: 10px;
  padding: 1.1rem 1.25rem;
  border: 1px solid #e4e8f0;
}

.toggle-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.6rem;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.toggle-header h4 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1a2233;
}

.privacy-badge {
  font-size: 0.7rem;
  background: #e6f4ea;
  color: #2e7d32;
  padding: 3px 8px;
  border-radius: 20px;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.toggle-description {
  font-size: 0.78rem;
  color: #6b7a99;
  margin: 0 0 0.875rem;
  line-height: 1.5;
}

.toggle-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}

.toggle-input {
  display: none;
}

.toggle-switch {
  width: 40px;
  height: 22px;
  background: #c8cfd8;
  border-radius: 11px;
  position: relative;
  transition: background 0.22s;
  flex-shrink: 0;
}

.toggle-switch::after {
  content: '';
  position: absolute;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: white;
  top: 2.5px;
  left: 3px;
  transition: left 0.22s;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
}

.toggle-switch.active {
  background: #43a047;
}

.toggle-switch.active::after {
  left: 20px;
}

.toggle-text {
  font-size: 0.83rem;
  font-weight: 500;
  color: #3a4a5c;
}

.sharing-active-badge {
  margin-top: 0.625rem;
  font-size: 0.78rem;
  color: #2e7d32;
  background: #e6f4ea;
  padding: 5px 10px;
  border-radius: 6px;
  font-weight: 500;
}

.sharing-off-note {
  margin-top: 0.625rem;
  font-size: 0.75rem;
  color: #8a94a6;
  font-style: italic;
  line-height: 1.4;
}
</style>
