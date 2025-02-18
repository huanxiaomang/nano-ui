import { nextTick } from 'vue';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useGlobalConfig } from '@nano-ui/hooks';
import { NNotify } from '../index';
import { NotificationPosition } from '../notification';

describe('Notification', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllTimers();
  });

  it('should create notification', async () => {
    NNotify({
      title: 'Title',
      message: 'This is a message',
    });

    await nextTick();
    const notification = document.querySelector('.nano-notification');
    expect(notification).toBeTruthy();
    expect(
      notification?.querySelector('.nano-notification__title')?.textContent
    ).toBe('Title');
    expect(
      notification?.querySelector('.nano-notification__content')?.textContent
    ).toBe('This is a message');
  });

  it('should show different types', async () => {
    const types = ['success', 'warning', 'info', 'error'] as const;

    for (const type of types) {
      document.body.innerHTML = '';
      NNotify[type]({
        title: 'Title',
        message: 'Message',
      });

      await nextTick();
      const notification = document.querySelector('.nano-notification');
      expect(
        notification?.classList.contains(`nano-notification--${type}`)
      ).toBe(true);
    }
  });

  it('should show in different positions', async () => {
    const positions: NotificationPosition[] = [
      'top-right',
      'top-left',
      'bottom-right',
      'bottom-left',
    ];

    for (const position of positions) {
      document.body.innerHTML = '';
      NNotify({
        title: 'Title',
        message: 'Message',
        position,
      });

      await nextTick();
      const notification = document.querySelector('.nano-notification');
      const horizontalClass = position.includes('right') ? 'right' : 'left';
      expect(notification?.classList.contains(horizontalClass)).toBe(true);
    }
  });

  it('should handle close button', async () => {
    const onClose = vi.fn();
    NNotify({
      title: 'Title',
      message: 'Message',
      showClose: true,
      onClose,
    });

    await nextTick();
    const closeBtn = document.querySelector('.nano-notification__close');
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

    NNotify({
      title: 'Title',
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

  it('should handle click event', async () => {
    const onClick = vi.fn();
    NNotify({
      title: 'Title',
      message: 'Message',
      onClick,
    });

    await nextTick();
    const notification = document.querySelector('.nano-notification');
    notification?.dispatchEvent(new Event('click'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should support HTML string', async () => {
    const htmlMessage = '<strong>HTML Content</strong>';
    NNotify({
      title: 'Title',
      message: htmlMessage,
      dangerouslyUseHTMLString: true,
    });

    await nextTick();
    const content = document.querySelector('.nano-notification__content');
    expect(content?.innerHTML).toContain(htmlMessage);
  });

  it('should respect max count', async () => {
    const max = 3;
    const globalConfig = useGlobalConfig();
    globalConfig.value = {
      ...globalConfig.value,
      notification: { max },
    };

    for (let i = 0; i < max + 2; i++) {
      NNotify({
        title: `Title ${i}`,
        message: `Message ${i}`,
      });
    }

    await nextTick();
    const notifications = document.querySelectorAll('.nano-notification');
    expect(notifications.length).toBeLessThanOrEqual(max);
  });
});
