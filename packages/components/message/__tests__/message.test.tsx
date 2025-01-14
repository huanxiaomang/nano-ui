import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import Message from '../message.vue';

const AXIOM = 'nihao';

describe('Message.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Message>{AXIOM}</Message>);

    expect(wrapper.text()).toEqual(AXIOM);
  })
})
