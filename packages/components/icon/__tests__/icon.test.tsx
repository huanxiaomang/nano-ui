import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import NIcon from '../icon.vue';
import { typeTypes } from '../icon';

describe('Icon', () => {
  describe('rendering', () => {
    it('renders with base class', () => {
      const wrapper = mount(() => <NIcon icon="check-circle" />);
      expect(wrapper.classes()).toContain('nano-icon');
    });

    it('renders with different types', () => {
      typeTypes.forEach((type) => {
        const wrapper = mount(() => <NIcon icon="check-circle" type={type} />);
        expect(wrapper.classes()).toContain(`nano-icon-${type}`);
      });
    });
  });

  describe('styling', () => {
    it('applies custom color', () => {
      const color = 'rgb(255, 0, 0)';
      const wrapper = mount(() => <NIcon icon="check-circle" color={color} />);
      expect(wrapper.attributes('style')).toContain(`color: ${color}`);
    });

    it('inherits color when no color prop is provided', () => {
      const wrapper = mount(() => <NIcon icon="check-circle" />);
      expect(wrapper.attributes('style')).toBe(undefined);
    });
  });

  describe('props forwarding', () => {
    it('forwards native props to font-awesome-icon', () => {
      const wrapper = mount(() => (
        <NIcon icon="check-circle" spin fixedWidth border />
      ));
      const faIcon = wrapper.findComponent({ name: 'FontAwesomeIcon' });
      expect(faIcon.props('spin')).toBe(true);
      expect(faIcon.props('fixedWidth')).toBe(true);
      expect(faIcon.props('border')).toBe(true);
    });
  });
});
