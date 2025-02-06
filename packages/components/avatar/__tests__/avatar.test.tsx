import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import Avatar from '../avatar.vue';

describe('Avatar.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Avatar>user</Avatar>);
    expect(wrapper.classes()).toContain('nano-avatar');
  });

  test('size test', () => {
    const wrapper = mount(() => <Avatar size="large">user</Avatar>);
    expect(wrapper.classes()).toContain('nano-avatar--large');
  });

  test('shape test', () => {
    const wrapper = mount(() => <Avatar shape="square">user</Avatar>);
    expect(wrapper.classes()).toContain('nano-avatar--square');
  });

  test('image avatar', () => {
    const wrapper = mount(() => <Avatar src="avatar.jpg" alt="user" />);
    expect(wrapper.find('img').exists()).toBe(true);
  });

  test('icon avatar', () => {
    const wrapper = mount(() => <Avatar icon="user" />);
    expect(wrapper.find('.nano-avatar__icon').exists()).toBe(true);
  });
});
