import { mount } from '@vue/test-utils';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import NButton from '../button.vue';
import NButtonGroup from '../button-group.vue';
import NIcon from '../../icon/icon.vue';

beforeAll(() => {
  library.add(fas);
});

afterAll(() => {
  library.reset();
});

describe('NButton.vue', () => {
  it('create', () => {
    const wrapper = mount(() => <NButton type="primary" />);
    expect(wrapper.classes()).toContain('nano-button--primary');
  });

  it('icon', () => {
    const wrapper = mount(() => <NButton icon="search" />);
    expect(wrapper.findComponent(NIcon).exists()).toBeTruthy();
  });

  it('loading', () => {
    const wrapper = mount(() => <NButton loading />);
    expect(wrapper.classes()).toContain('is-loading');
  });

  it('size', () => {
    const wrapper = mount(() => <NButton size="large" />);
    expect(wrapper.classes()).toContain('nano-button--large');
  });

  it('plain', () => {
    const wrapper = mount(() => <NButton plain />);
    expect(wrapper.classes()).toContain('is-plain');
  });

  it('round', () => {
    const wrapper = mount(() => <NButton round />);
    expect(wrapper.classes()).toContain('is-round');
  });

  it('disabled', () => {
    const wrapper = mount(() => <NButton disabled />);
    expect(wrapper.classes()).toContain('is-disabled');
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  it('should render correct tag when tag is provided', () => {
    const wrapper = mount(() => <NButton tag="a" />);
    expect(wrapper.element.tagName).toBe('A');
  });

  it('should render as button by default when no tag is provided', () => {
    const wrapper = mount(() => <NButton />);
    expect(wrapper.element.tagName).toBe('BUTTON');
  });

  it('should inherit disabled state from NButtonGroup', () => {
    const wrapper = mount(() => (
      <NButtonGroup disabled>
        <NButton />
      </NButtonGroup>
    ));
    const button = wrapper.findComponent(NButton);
    expect(button.classes()).toContain('is-disabled');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('should respect the disabled prop when not inside NButtonGroup', () => {
    const wrapper = mount(() => <NButton disabled />);
    expect(wrapper.classes()).toContain('is-disabled');
    expect(wrapper.attributes('disabled')).toBeDefined();
  });

  it('should apply correct marginRight style based on default slot', () => {
    const wrapperWithSlot = mount(() => (
      <NButton icon="check-circle">Click Me</NButton>
    ));
    const iconStyleWithSlot = wrapperWithSlot
      .findComponent(NIcon)
      .attributes('style');
    expect(iconStyleWithSlot).toContain('margin-right: 6px');
  });

  it('click event', async () => {
    const clickHandler = vi.fn();
    const wrapper = mount(() => <NButton onClick={clickHandler} />);
    await wrapper.trigger('click');
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it('throttle', async () => {
    const clickHandler = vi.fn();
    const wrapper = mount(() => (
      <NButton useThrottle throttleDuration={300} onClick={clickHandler} />
    ));
    await wrapper.trigger('click');
    await wrapper.trigger('click');
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});

describe('NButtonGroup.vue', () => {
  it('should pass size prop to buttons', () => {
    const wrapper = mount(() => (
      <NButtonGroup size="large">
        <NButton />
        <NButton />
      </NButtonGroup>
    ));

    const buttons = wrapper.findAllComponents(NButton);
    buttons.forEach((button) => {
      expect(button.classes()).toContain('nano-button--large');
    });
  });

  it('should pass type prop to buttons', () => {
    const wrapper = mount(() => (
      <NButtonGroup type="primary">
        <NButton />
        <NButton />
      </NButtonGroup>
    ));

    const buttons = wrapper.findAllComponents(NButton);
    buttons.forEach((button) => {
      expect(button.classes()).toContain('nano-button--primary');
    });
  });

  it('should pass disabled prop to buttons', () => {
    const wrapper = mount(() => (
      <NButtonGroup disabled>
        <NButton />
        <NButton />
      </NButtonGroup>
    ));

    const buttons = wrapper.findAllComponents(NButton);
    buttons.forEach((button) => {
      expect(button.classes()).toContain('is-disabled');
      expect(button.attributes('disabled')).toBeDefined();
    });
  });

  it('should provide context to child buttons', () => {
    const wrapper = mount(() => (
      <NButtonGroup size="small" type="warning" disabled>
        <NButton />
      </NButtonGroup>
    ));

    const button = wrapper.findComponent(NButton);
    expect(button.classes()).toContain('nano-button--small');
    expect(button.classes()).toContain('nano-button--warning');
    expect(button.classes()).toContain('is-disabled');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('should handle button click event', async () => {
    const clickHandler = vi.fn();
    const wrapper = mount(() => (
      <NButtonGroup>
        <NButton onClick={clickHandler} />
      </NButtonGroup>
    ));

    const button = wrapper.findComponent(NButton);
    await button.trigger('click');
    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it('should pass the icon prop to buttons', () => {
    const wrapper = mount(() => (
      <NButtonGroup>
        <NButton icon="search" />
      </NButtonGroup>
    ));

    const button = wrapper.findComponent(NButton);
    expect(button.findComponent(NIcon).exists()).toBeTruthy();
  });

  it('should pass the loading state to buttons', () => {
    const wrapper = mount(() => (
      <NButtonGroup>
        <NButton loading />
      </NButtonGroup>
    ));

    const button = wrapper.findComponent(NButton);
    expect(button.classes()).toContain('is-loading');
  });
});
