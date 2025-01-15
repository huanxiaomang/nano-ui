import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
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

  it('closable', async () => {
    const wrapper = mount(() => <NAlert closable />);
    const closeButton = wrapper.find('.nano-alert__close');
    await closeButton.trigger('click');
    await nextTick();
    expect(wrapper.vm.visable).toBe(false);
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

  it('open method', async () => {
    const wrapper = mount(() => <NAlert />);
    await nextTick();
    const alert = wrapper.vm;
    alert.close(new MouseEvent('click'));
    expect(wrapper.isVisible()).toBe(false);
    alert.open();
    expect(wrapper.isVisible()).toBe(true);
  });

  it('emit close event', async () => {
    const closeHandler = vi.fn();
    const wrapper = mount(() => <NAlert onClose={closeHandler} />);
    await wrapper.find('.nano-alert__close').trigger('click');
    expect(closeHandler).toHaveBeenCalledTimes(1);
  });
});
