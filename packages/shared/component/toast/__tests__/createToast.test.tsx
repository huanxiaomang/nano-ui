import { Component, h, nextTick, ref } from 'vue';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { debugWarn } from '@nano-ui/shared';
import { createToastFn, getMessageVNode } from '../createToast';
import type { ToastCompContext } from '../types';

// Mock debugWarn
vi.mock('@nano-ui/shared', async () => {
  const actual = await vi.importActual('@nano-ui/shared');
  return {
    ...actual,
    debugWarn: vi.fn(),
  };
});

const TestComponent = {
  name: 'TestToast',
  props: {
    id: String,
    message: [String, Object, Function],
    onClose: Function,
    onDestroy: Function,
  },
  setup(props: any) {
    const visible = ref(true);

    const close = () => {
      visible.value = false;
      props.onClose?.();
    };

    return {
      close,
      visible,
    };
  },
  render() {
    if (!this.visible) return null;
    return h('div', { class: 'test-toast', id: this.id }, this.message);
  },
  expose: ['close'],
} as Component;

describe('Toast', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  describe('createToastFn', () => {
    it('creates toast instance with basic options', async () => {
      const toastFn = createToastFn({
        componentConstructor: TestComponent,
      });

      const instance = toastFn(
        { message: 'test message' },
        null
      ) as ToastCompContext<any>;

      await nextTick();
      expect(instance.id).toMatch(/^nano_TestToast-\d+$/);
      expect(instance.handler).toHaveProperty('close');
      expect(document.querySelector('.test-toast')).toBeTruthy();
    });

    it('handles different message types', async () => {
      const toastFn = createToastFn({
        componentConstructor: TestComponent,
      });

      // String message
      toastFn({ message: 'string message' }, null);
      await nextTick();
      expect(document.querySelector('.test-toast')?.textContent).toBe(
        'string message'
      );

      // VNode message
      document.body.innerHTML = '';
      toastFn({ message: h('span', 'vnode message') }, null);
      await nextTick();
      expect(document.querySelector('.test-toast span')?.textContent).toBe(
        'vnode message'
      );
    });

    it('appends to specified element', async () => {
      const container = document.createElement('div');
      container.id = 'custom-container';
      document.body.appendChild(container);

      const toastFn = createToastFn({
        componentConstructor: TestComponent,
      });

      toastFn(
        {
          message: 'test',
          appendTo: container,
        },
        null
      );
      await nextTick();
      expect(container.querySelector('.test-toast')).toBeTruthy();

      // Invalid selector - should fallback to document.body
      document.body.innerHTML = '';
      toastFn(
        {
          message: 'test',
          appendTo: '#non-existent',
        },
        null
      );
      await nextTick();
      expect(document.body.querySelector('.test-toast')).toBeTruthy();
      expect(debugWarn).toHaveBeenCalledWith(
        'NanoMessage',
        'The appendTo option is not a valid HTMLElement. Falling back to document.body.'
      );
    });

    it('calls lifecycle hooks', async () => {
      const onInstanceClose = vi.fn();
      const onInstanceDestroy = vi.fn();
      const beforeInstanceClose = vi.fn();
      const beforeInstanceDestroy = vi.fn();
      const userOnClose = vi.fn();

      const toastFn = createToastFn({
        componentConstructor: TestComponent,
        onInstanceClose,
        onInstanceDestroy,
        beforeInstanceClose,
        beforeInstanceDestroy,
      });

      const instance = toastFn(
        {
          message: 'test',
          onClose: userOnClose,
        },
        null
      );

      await nextTick();
      instance.handler.close();
      await nextTick();

      expect(beforeInstanceClose).toHaveBeenCalledWith(instance.id);
      expect(userOnClose).toHaveBeenCalled();
      expect(onInstanceClose).toHaveBeenCalledWith(instance.id);
    });
  });

  describe('getMessageVNode', () => {
    it('handles different message types', () => {
      // String message
      expect(getMessageVNode('string message')).toBeNull();

      // VNode message
      const vnode = h('div', 'test');
      const vnodeResult = getMessageVNode(vnode);
      expect(vnodeResult).toHaveProperty('default');
      expect(typeof vnodeResult?.default).toBe('function');

      // Function message
      const func = () => h('div', 'test');
      const funcResult = getMessageVNode(func);
      expect(funcResult).toHaveProperty('default');
      expect(funcResult?.default).toBe(func);
    });
  });
});
