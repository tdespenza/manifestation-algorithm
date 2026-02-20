import { ref } from 'vue';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  duration: number;
}

// Module-level singleton so all components share the same toast stack
const toasts = ref<Toast[]>([]);
let _nextId = 0;

export function useToast() {
  function addToast(message: string, type: ToastType = 'success', duration = 3500) {
    const id = _nextId++;
    toasts.value.push({ id, message, type, duration });
    setTimeout(() => dismissToast(id), duration);
  }

  function dismissToast(id: number) {
    const idx = toasts.value.findIndex(t => t.id === id);
    if (idx !== -1) toasts.value.splice(idx, 1);
  }

  return { toasts, addToast, dismissToast };
}
