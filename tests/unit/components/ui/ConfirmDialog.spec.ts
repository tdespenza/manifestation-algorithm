import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ConfirmDialog from '@/components/ui/ConfirmDialog.vue';

describe('ConfirmDialog.vue', () => {
  const DEFAULT_PROPS = {
    title: 'Delete Session',
    message: 'Are you sure? This cannot be undone.'
  };

  it('renders the title and message', () => {
    const wrapper = mount(ConfirmDialog, {
      props: DEFAULT_PROPS,
      attachTo: document.body
    });
    expect(document.querySelector('.confirm-title')?.textContent).toContain('Delete Session');
    expect(document.querySelector('.confirm-message')?.textContent).toContain(
      'Are you sure? This cannot be undone.'
    );
    wrapper.unmount();
  });

  it('renders default icon', () => {
    const wrapper = mount(ConfirmDialog, { props: DEFAULT_PROPS, attachTo: document.body });
    expect(document.querySelector('.confirm-icon')?.textContent).toContain('🗑️');
    wrapper.unmount();
  });

  it('renders a custom icon when provided', () => {
    const wrapper = mount(ConfirmDialog, {
      props: { ...DEFAULT_PROPS, icon: '⚠️' },
      attachTo: document.body
    });
    expect(document.querySelector('.confirm-icon')?.textContent).toContain('⚠️');
    wrapper.unmount();
  });

  it('renders default button labels', () => {
    const wrapper = mount(ConfirmDialog, { props: DEFAULT_PROPS, attachTo: document.body });
    expect(document.querySelector('.btn-confirm')?.textContent?.trim()).toBe('Delete');
    expect(document.querySelector('.btn-cancel')?.textContent?.trim()).toBe('Cancel');
    wrapper.unmount();
  });

  it('renders custom button labels', () => {
    const wrapper = mount(ConfirmDialog, {
      props: { ...DEFAULT_PROPS, confirmLabel: 'Yes, remove', cancelLabel: 'Go back' },
      attachTo: document.body
    });
    expect(document.querySelector('.btn-confirm')?.textContent?.trim()).toBe('Yes, remove');
    expect(document.querySelector('.btn-cancel')?.textContent?.trim()).toBe('Go back');
    wrapper.unmount();
  });

  it('emits "confirm" when the confirm button is clicked', async () => {
    const wrapper = mount(ConfirmDialog, { props: DEFAULT_PROPS, attachTo: document.body });
    (document.querySelector('.btn-confirm') as HTMLButtonElement).click();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('confirm')).toHaveLength(1);
    wrapper.unmount();
  });

  it('emits "cancel" when the cancel button is clicked', async () => {
    const wrapper = mount(ConfirmDialog, { props: DEFAULT_PROPS, attachTo: document.body });
    (document.querySelector('.btn-cancel') as HTMLButtonElement).click();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('cancel')).toHaveLength(1);
    wrapper.unmount();
  });

  it('emits "cancel" when the overlay backdrop is clicked', async () => {
    const wrapper = mount(ConfirmDialog, { props: DEFAULT_PROPS, attachTo: document.body });
    const overlay = document.querySelector('.confirm-overlay') as HTMLElement;
    overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('cancel')).toHaveLength(1);
    wrapper.unmount();
  });

  it('clicking inside the dialog does NOT emit "cancel"', async () => {
    const wrapper = mount(ConfirmDialog, { props: DEFAULT_PROPS, attachTo: document.body });
    const dialog = document.querySelector('.confirm-dialog') as HTMLElement;
    dialog.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await wrapper.vm.$nextTick();
    // Only the overlay self-click triggers cancel
    expect(wrapper.emitted('cancel')).toBeUndefined();
    wrapper.unmount();
  });

  it('uses the uid prop to create unique ARIA IDs', () => {
    const wrapper = mount(ConfirmDialog, {
      props: { ...DEFAULT_PROPS, uid: 'my-dialog' },
      attachTo: document.body
    });
    const dialog = document.querySelector('.confirm-dialog') as HTMLElement;
    expect(dialog.getAttribute('aria-labelledby')).toBe('my-dialog-title');
    expect(dialog.getAttribute('aria-describedby')).toBe('my-dialog-message');
    wrapper.unmount();
  });

  it('the <dialog> element has role dialog via the open attribute', () => {
    const wrapper = mount(ConfirmDialog, { props: DEFAULT_PROPS, attachTo: document.body });
    const dialog = document.querySelector('.confirm-dialog');
    expect(dialog?.tagName.toLowerCase()).toBe('dialog');
    expect(dialog?.hasAttribute('open')).toBe(true);
    wrapper.unmount();
  });

  it('ConfirmDialog is rendered inside document.body via Teleport', () => {
    const wrapper = mount(ConfirmDialog, { props: DEFAULT_PROPS, attachTo: document.body });
    // The overlay should be a direct child of body (Teleport target)
    expect(document.body.querySelector('.confirm-overlay')).not.toBeNull();
    wrapper.unmount();
  });

  it('confirm button does not emit cancel', async () => {
    const wrapper = mount(ConfirmDialog, { props: DEFAULT_PROPS, attachTo: document.body });
    (document.querySelector('.btn-confirm') as HTMLButtonElement).click();
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted('cancel')).toBeUndefined();
    wrapper.unmount();
  });
});
