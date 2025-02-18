import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { componentSizes } from '@nano-ui/shared';
import Avatar from '../avatar.vue';

describe('Avatar', () => {
  describe('rendering', () => {
    test('renders with base class', () => {
      const wrapper = mount(() => <Avatar>user</Avatar>);
      expect(wrapper.classes()).toContain('nano-avatar');
    });

    test('renders with different sizes', () => {
      const sizes = componentSizes;
      sizes.forEach((size) => {
        const wrapper = mount(() => <Avatar size={size}>user</Avatar>);
        expect(wrapper.classes()).toContain(`nano-avatar--${size}`);
      });
    });

    test('renders with different shapes', () => {
      const shapes = ['circle', 'square'] as const;
      shapes.forEach((shape) => {
        const wrapper = mount(() => <Avatar shape={shape}>user</Avatar>);
        expect(wrapper.classes()).toContain(`nano-avatar--${shape}`);
      });
    });

    test('renders with custom numeric size', () => {
      const customSizes = [50, 100, 150];
      customSizes.forEach((size) => {
        const wrapper = mount(() => <Avatar size={size} />);
        const style = wrapper.attributes('style');
        expect(style).toContain(`width: ${size}px`);
        expect(style).toContain(`height: ${size}px`);
        expect(style).toContain(`line-height: ${size}px`);
      });
    });
  });

  describe('content display', () => {
    test('displays image when src is provided', () => {
      const src = 'avatar.jpg';
      const alt = 'user';
      const wrapper = mount(() => <Avatar src={src} alt={alt} />);
      const img = wrapper.find('img');
      expect(img.exists()).toBe(true);
      expect(img.attributes('src')).toBe(src);
      expect(img.attributes('alt')).toBe(alt);
    });

    test('displays icon when icon prop is provided', () => {
      const wrapper = mount(() => <Avatar icon="user" />);
      expect(wrapper.find('.nano-avatar__icon').exists()).toBe(true);
    });

    test('displays text content when slot is provided', () => {
      const content = 'US';
      const wrapper = mount(() => <Avatar>{content}</Avatar>);
      expect(wrapper.find('.nano-avatar__text').text()).toBe(content);
    });

    test('handles image load error', async () => {
      const onError = vi.fn();
      const wrapper = mount(() => (
        <Avatar src="invalid.jpg" onError={onError} />
      ));
      await wrapper.find('img').trigger('error');
      expect(onError).toHaveBeenCalled();
    });

    test('applies object-fit style to image', () => {
      const fits = ['fill', 'contain', 'cover', 'none', 'scale-down'] as const;
      fits.forEach((fit) => {
        const wrapper = mount(() => <Avatar src="avatar.jpg" fit={fit} />);
        expect(wrapper.find('img').attributes('style')).toContain(
          `object-fit: ${fit}`
        );
      });
    });
  });

  describe('fallback behavior', () => {
    test('displays icon when src is empty and icon is provided', () => {
      const wrapper = mount(() => <Avatar icon="user" />);
      expect(wrapper.find('.nano-avatar__icon').exists()).toBe(true);
      expect(wrapper.find('img').exists()).toBe(false);
    });

    test('displays text when no src or icon is provided', () => {
      const text = 'User';
      const wrapper = mount(() => <Avatar>{text}</Avatar>);
      expect(wrapper.find('.nano-avatar__text').exists()).toBe(true);
      expect(wrapper.find('img').exists()).toBe(false);
      expect(wrapper.find('.nano-avatar__icon').exists()).toBe(false);
    });
  });

  describe('style handling', () => {
    test('applies custom size when number is provided', () => {
      const size = 100;
      const wrapper = mount(() => <Avatar size={size} />);
      const style = wrapper.attributes('style');
      expect(style).toContain(`width: ${size}px`);
      expect(style).toContain(`height: ${size}px`);
      expect(style).toContain(`line-height: ${size}px`);
    });
  });
});
