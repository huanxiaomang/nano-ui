import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import NAlert from '../alert.vue';
import NIcon from '../../icon/icon.vue';
import { alertEffects, alertTypes } from '../alert';

describe('Alert', () => {
  describe('rendering', () => {
    it('renders with base class and visibility', () => {
      const wrapper = mount(() => <NAlert />);
      expect(wrapper.classes()).toContain('nano-alert');
      expect(wrapper.isVisible()).toBe(true);
    });

    it('renders with different types', () => {
      alertTypes.forEach((type) => {
        const wrapper = mount(() => <NAlert type={type} />);
        expect(wrapper.classes()).toContain(`nano-alert__${type}`);
      });
    });

    it('renders with different effects', () => {
      alertEffects.forEach((effect) => {
        const wrapper = mount(() => <NAlert effect={effect} />);
        expect(wrapper.classes()).toContain(`nano-alert__${effect}`);
      });
    });
  });

  describe('functionality', () => {
    it('displays icon when showIcon is true', () => {
      const wrapper = mount(() => <NAlert showIcon />);
      expect(wrapper.findComponent(NIcon).exists()).toBe(true);
    });

    it('renders custom content in default slot', () => {
      const content = 'Custom Content';
      const wrapper = mount(() => <NAlert>{content}</NAlert>);
      expect(wrapper.text()).toContain(content);
    });

    it('renders title using slot', () => {
      const title = 'Alert Title';
      const wrapper = mount(() => <NAlert>{{ title: () => title }}</NAlert>);
      expect(wrapper.find('.nano-alert__title').text()).toBe(title);
    });

    it('renders description', () => {
      const description = 'Alert Description';
      const wrapper = mount(() => <NAlert description={description} />);
      expect(wrapper.find('.nano-alert__description').text()).toBe(description);
    });

    it('applies center alignment', () => {
      const wrapper = mount(() => <NAlert center />);
      expect(wrapper.classes()).toContain('text-center');
    });
  });
});
