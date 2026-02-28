<template>
  <Teleport to="body">
    <div class="confirm-overlay" role="presentation" @click.self="$emit('cancel')">
      <dialog open class="confirm-dialog" :aria-labelledby="titleId" :aria-describedby="messageId">
        <div class="confirm-icon">{{ icon }}</div>
        <h2 :id="titleId" class="confirm-title">{{ title }}</h2>
        <p :id="messageId" class="confirm-message">{{ message }}</p>
        <div class="confirm-actions">
          <button ref="cancelButtonRef" class="btn-cancel" @click="$emit('cancel')">
            {{ cancelLabel }}
          </button>
          <button class="btn-confirm" @click="$emit('confirm')">{{ confirmLabel }}</button>
        </div>
      </dialog>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    icon?: string;
    uid?: string;
  }>(),
  {
    confirmLabel: 'Delete',
    cancelLabel: 'Cancel',
    icon: '🗑️',
    uid: 'confirm'
  }
);

defineEmits<{ (e: 'confirm'): void; (e: 'cancel'): void }>();

const titleId = computed(() => `${props.uid}-title`);
const messageId = computed(() => `${props.uid}-message`);
const cancelButtonRef = ref<HTMLButtonElement | null>(null);

onMounted(async () => {
  await nextTick();
  cancelButtonRef.value?.focus();
});
</script>

<style scoped>
.confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.15s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.confirm-dialog {
  background: white;
  border: none;
  border-radius: 20px;
  padding: 40px 36px 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.22);
  animation: slideUp 0.25s ease;
  margin: 0;
  position: static;
}

@keyframes slideUp {
  from {
    transform: translateY(24px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.confirm-icon {
  font-size: 2.8em;
  margin-bottom: 12px;
  line-height: 1;
}

.confirm-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 10px;
}

.confirm-message {
  color: #555;
  font-size: 0.97rem;
  line-height: 1.6;
  margin: 0 0 28px;
}

.confirm-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.btn-cancel {
  padding: 10px 24px;
  background: transparent;
  border: 1.5px solid #ccc;
  border-radius: 10px;
  color: #555;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
  min-width: 100px;
}

.btn-cancel:hover {
  border-color: #999;
  color: #333;
  background: #f5f5f5;
}

.btn-confirm {
  padding: 10px 24px;
  background: #dc3545;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s;
  min-width: 100px;
}

.btn-confirm:hover {
  background: #b02a37;
}
</style>
