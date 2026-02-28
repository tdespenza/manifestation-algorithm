import { describe, it, expect, vi, beforeEach } from 'vitest';

// Reset the module between tests to clear singleton state
beforeEach(() => {
  vi.resetModules();
  vi.useRealTimers();
});

describe('useToast', () => {
  it('addToast appends a toast with correct properties', async () => {
    const { useToast } = await import('@/composables/useToast');
    const { addToast, toasts } = useToast();

    addToast('Hello', 'success', 5000);

    expect(toasts.value).toHaveLength(1);
    expect(toasts.value[0].message).toBe('Hello');
    expect(toasts.value[0].type).toBe('success');
    expect(toasts.value[0].duration).toBe(5000);
    expect(typeof toasts.value[0].id).toBe('number');
  });

  it('addToast defaults type to "success" and duration to 3500', async () => {
    const { useToast } = await import('@/composables/useToast');
    const { addToast, toasts } = useToast();

    addToast('Default toast');

    expect(toasts.value[0].type).toBe('success');
    expect(toasts.value[0].duration).toBe(3500);
  });

  it('addToast supports all toast types', async () => {
    const { useToast } = await import('@/composables/useToast');
    const { addToast, toasts } = useToast();

    addToast('Error message', 'error');
    addToast('Info message', 'info');

    const types = toasts.value.map(t => t.type);
    expect(types).toContain('error');
    expect(types).toContain('info');
  });

  it('dismissToast removes the toast by id', async () => {
    const { useToast } = await import('@/composables/useToast');
    const { addToast, dismissToast, toasts } = useToast();

    addToast('Remove me', 'success');
    const id = toasts.value[0].id;
    expect(toasts.value).toHaveLength(1);

    dismissToast(id);
    expect(toasts.value).toHaveLength(0);
  });

  it('dismissToast is a no-op for unknown id', async () => {
    const { useToast } = await import('@/composables/useToast');
    const { addToast, dismissToast, toasts } = useToast();

    addToast('Keep me', 'info');
    dismissToast(99999); // non-existent id

    expect(toasts.value).toHaveLength(1);
  });

  it('addToast auto-dismisses after the duration elapses', async () => {
    vi.useFakeTimers();
    const { useToast } = await import('@/composables/useToast');
    const { addToast, toasts } = useToast();

    addToast('Auto dismiss', 'success', 1000);
    expect(toasts.value).toHaveLength(1);

    vi.advanceTimersByTime(1000);
    expect(toasts.value).toHaveLength(0);
  });

  it('multiple toasts are stacked and each dismisses independently', async () => {
    vi.useFakeTimers();
    const { useToast } = await import('@/composables/useToast');
    const { addToast, dismissToast, toasts } = useToast();

    addToast('First', 'success', 2000);
    addToast('Second', 'error', 4000);
    expect(toasts.value).toHaveLength(2);

    const firstId = toasts.value[0].id;
    dismissToast(firstId);
    expect(toasts.value).toHaveLength(1);
    expect(toasts.value[0].message).toBe('Second');
  });

  it('ids are unique across successive calls', async () => {
    const { useToast } = await import('@/composables/useToast');
    const { addToast, toasts } = useToast();

    addToast('A', 'success');
    addToast('B', 'error');
    addToast('C', 'info');

    const ids = toasts.value.map(t => t.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids[0]).toBeLessThan(ids[1]);
    expect(ids[1]).toBeLessThan(ids[2]);
  });
});
