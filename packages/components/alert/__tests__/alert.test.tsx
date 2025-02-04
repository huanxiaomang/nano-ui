import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import NAlert from '../alert.vue';
import NIcon from '../../icon/icon.vue';

describe('NAlert.vue', () => {
  it('create', () => {
    const wrapper = mount(() => <NAlert />);
    expect(wrapper.classes()).toContain('nano-alert');
    expect(wrapper.isVisible()).toBe(true);
  });

  it('type', () => {
    const wrapper = mount(() => <NAlert type="success" />);
    expect(wrapper.classes()).toContain('nano-alert__success');
  });

  it('effect', () => {
    const wrapper = mount(() => <NAlert effect="dark" />);
    expect(wrapper.classes()).toContain('nano-alert__dark');
  });

  it('showIcon', () => {
    const wrapper = mount(() => <NAlert showIcon />);
    expect(wrapper.findComponent(NIcon).exists()).toBeTruthy();
  });

  it('default slot', () => {
    const wrapper = mount(() => <NAlert>Custom Content</NAlert>);
    expect(wrapper.text()).toContain('Custom Content');
  });

  it('title slot', () => {
    const wrapper = mount(() => (
      <NAlert>
        {{
          title: () => 'Alert Title',
        }}
      </NAlert>
    ));
    expect(wrapper.find('.nano-alert__title').text()).toBe('Alert Title');
  });

  it('description slot', () => {
    const wrapper = mount(() => <NAlert description="This is a description" />);
    expect(wrapper.find('.nano-alert__description').text()).toBe(
      'This is a description'
    );
  });

  it('center', () => {
    const wrapper = mount(() => <NAlert center />);
    expect(wrapper.classes()).toContain('text-center');
  });
});
