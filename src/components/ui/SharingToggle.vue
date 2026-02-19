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

    <label class="toggle-label">
      <input
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
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem 1.25rem;
  border: 1px solid #e9ecef;
}

.toggle-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.toggle-header h4 {
  margin: 0;
  font-size: 0.95rem;
  color: #2c3e50;
}

.privacy-badge {
  font-size: 0.75rem;
  background: #e8f5e9;
  color: #2e7d32;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
}

.toggle-description {
  font-size: 0.8rem;
  color: #6c757d;
  margin: 0 0 0.75rem;
  line-height: 1.4;
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
  width: 38px;
  height: 20px;
  background: #ccc;
  border-radius: 10px;
  position: relative;
  transition: background 0.2s;
  flex-shrink: 0;
}

.toggle-switch::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  top: 2px;
  left: 2px;
  transition: left 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.toggle-switch.active {
  background: #4caf50;
}

.toggle-switch.active::after {
  left: 20px;
}

.toggle-text {
  font-size: 0.85rem;
  color: #495057;
}

.sharing-active-badge {
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #2e7d32;
  background: #e8f5e9;
  padding: 4px 10px;
  border-radius: 4px;
}

.sharing-off-note {
  margin-top: 0.5rem;
  font-size: 0.78rem;
  color: #999;
  font-style: italic;
}
</style>
