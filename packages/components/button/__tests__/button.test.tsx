import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { componentSizes } from '@nano-ui/shared';
import NButton from '../button.vue';
import NButtonGroup from '../button-group.vue';
import NIcon from '../../icon/icon.vue';
import { buttonTypes } from '../button';

describe('Button', () => {
  describe('rendering', () => {
    it('renders with different types', () => {
      buttonTypes
        .filter((type) => type !== '')
        .forEach((type) => {
          const wrapper = mount(() => <NButton type={type} />);
          expect(wrapper.classes()).toContain(`nano-button--${type}`);
        });
    });

    it('renders with different sizes', () => {
      componentSizes
        .filter((size) => size !== '')
        .forEach((size) => {
          const wrapper = mount(() => <NButton size={size} />);
          expect(wrapper.classes()).toContain(`nano-button--${size}`);
        });
    });

    it('renders without type class when type is empty', () => {
      const wrapper = mount(() => <NButton type="" />);
      expect(wrapper.classes()).not.toContain('nano-button--');
      expect(wrapper.classes()).toContain('nano-button');
    });

    it('renders without size class when size is empty', () => {
      const wrapper = mount(() => <NButton size="" />);
      expect(wrapper.classes()).not.toContain('nano-button--');
      expect(wrapper.classes()).toContain('nano-button');
    });
  });

  describe('functionality', () => {
    it('handles click events', async () => {
      const onClick = vi.fn();
      const wrapper = mount(() => <NButton onClick={onClick} />);
      await wrapper.trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('throttles click events when enabled', async () => {
      const onClick = vi.fn();
      const wrapper = mount(() => (
        <NButton useThrottle throttleDuration={300} onClick={onClick} />
      ));
      await wrapper.trigger('click');
      await wrapper.trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('states', () => {
    it('handles disabled state', () => {
      const wrapper = mount(() => <NButton disabled />);
      expect(wrapper.classes()).toContain('is-disabled');
      expect(wrapper.attributes('disabled')).toBeDefined();
    });

    it('handles loading state', () => {
      const wrapper = mount(() => <NButton loading />);
      expect(wrapper.classes()).toContain('is-loading');
      expect(wrapper.findComponent(NIcon).exists()).toBe(true);
    });
  });

  describe('icon handling', () => {
    it('renders icon with correct margin', () => {
      const wrapper = mount(() => (
        <NButton icon="check-circle">Click Me</NButton>
      ));
      const iconStyle = wrapper.findComponent(NIcon).attributes('style');
      expect(iconStyle).toContain('margin-right: 6px');
    });
  });
});

describe('ButtonGroup', () => {
  describe('context inheritance', () => {
    it('passes props to child buttons', () => {
      const wrapper = mount(() => (
        <NButtonGroup size="small" type="warning" disabled>
          <NButton />
        </NButtonGroup>
      ));

      const button = wrapper.findComponent(NButton);
      expect(button.classes()).toContain('nano-button--small');
      expect(button.classes()).toContain('nano-button--warning');
      expect(button.classes()).toContain('is-disabled');
    });
  });

  describe('event handling', () => {
    it('preserves click events on child buttons', async () => {
      const onClick = vi.fn();
      const wrapper = mount(() => (
        <NButtonGroup>
          <NButton onClick={onClick} />
        </NButtonGroup>
      ));

      await wrapper.findComponent(NButton).trigger('click');
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
