import { nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useGlobalConfig } from '@nano-ui/hooks';
import { NMessage } from '../index';

describe('Message', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllTimers();
  });

  it('should create message', async () => {
    NMessage('This is a message');

    await nextTick();
    const message = document.querySelector('.nano-message');
    expect(message).toBeTruthy();
    expect(message?.querySelector('.nano-message__content')?.textContent).toBe(
      'This is a message'
    );
  });

  it('should show different types', async () => {
    const types = ['success', 'warning', 'info', 'error'] as const;

    for (const type of types) {
      document.body.innerHTML = '';
      NMessage[type]('Message');

      await nextTick();
      const message = document.querySelector('.nano-message');
      expect(message?.classList.contains(`nano-message--${type}`)).toBe(true);
    }
  });

  it('should handle close button', async () => {
    const onClose = vi.fn();
    NMessage({
      message: 'Message',
      showClose: true,
      onClose,
    });

    await nextTick();
    const closeBtn = document.querySelector('.nano-message__close');
    expect(closeBtn).toBeTruthy();

    await closeBtn
      ?.querySelector('.nano-icon')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await nextTick();
    await new Promise((resolve) => setTimeout(resolve, 300));
    expect(onClose).toHaveBeenCalled();
  });

  it('should auto close after duration', async () => {
    vi.useFakeTimers();
    const duration = 1000;
    const onClose = vi.fn();

    NMessage({
      message: 'Message',
      duration,
      onClose,
    });

    await nextTick();
    vi.advanceTimersByTime(duration);
    await nextTick();
    expect(onClose).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('should support HTML string', async () => {
    const htmlMessage = '<strong>HTML Content</strong>';
    NMessage({
      message: htmlMessage,
      dangerouslyUseHTMLString: true,
    });

    await nextTick();
    const content = document.querySelector('.nano-message__content');
    expect(content?.innerHTML).toContain(htmlMessage);
  });

  it('should center text when center is true', async () => {
    NMessage({
      message: 'Centered Message',
      center: true,
    });

    await nextTick();
    const message = document.querySelector('.nano-message');
    expect(message?.classList.contains('text-center')).toBe(true);
  });

  it('should respect max count', async () => {
    const max = 3;
    const globalConfig = useGlobalConfig();
    globalConfig.value = {
      ...globalConfig.value,
      message: { max },
    };

    for (let i = 0; i < max + 2; i++) {
      NMessage(`Message ${i}`);
    }

    await nextTick();
    const messages = document.querySelectorAll('.nano-message');
    expect(messages.length).toBeLessThanOrEqual(max);
  });
});
