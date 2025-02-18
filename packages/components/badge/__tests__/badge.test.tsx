import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Badge from '../badge.vue';
import { badgeTypes } from '../badge';

describe('Badge', () => {
  describe('rendering', () => {
    it('renders with different types', () => {
      badgeTypes.forEach((type) => {
        const wrapper = mount(() => <Badge type={type} value={1} />);
        expect(wrapper.find('.nano-badge__content').classes()).toContain(
          `nano-badge__content--${type}`
        );
      });
    });

    it('renders with different positions', () => {
      const positions = [
        'top-right',
        'top-left',
        'bottom-right',
        'bottom-left',
      ] as const;
      positions.forEach((position) => {
        const wrapper = mount(() => <Badge value={1} position={position} />);
        expect(wrapper.find('.nano-badge__content').classes()).toContain(
          `is-${position}`
        );
      });
    });
  });

  describe('value display', () => {
    it('displays string value directly', () => {
      const value = 'new';
      const wrapper = mount(() => <Badge value={value} />);
      expect(wrapper.find('.nano-badge__content').text()).toBe(value);
    });

    it('formats number value according to max', () => {
      const wrapper = mount(() => <Badge value={200} max={99} />);
      expect(wrapper.find('.nano-badge__content').text()).toBe('99+');
    });

    it('displays dot when isDot is true', () => {
      const wrapper = mount(() => <Badge isDot />);
      expect(wrapper.find('.nano-badge__content').classes()).toContain(
        'is-dot'
      );
    });
  });

  describe('visibility', () => {
    it('hides badge when hidden is true', () => {
      const wrapper = mount(() => <Badge value={1} hidden />);
      expect(wrapper.find('.nano-badge__content').exists()).toBe(false);
    });
  });

  describe('slot handling', () => {
    it('renders default slot content', () => {
      const content = 'Content';
      const wrapper = mount(() => <Badge value={1}>{content}</Badge>);
      expect(wrapper.text()).toContain(content);
    });
  });
});
