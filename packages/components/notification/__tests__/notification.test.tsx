import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import Notification from '../notification.vue';

const AXIOM = 'nihao';

describe('Notification.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <Notification>{AXIOM}</Notification>);

    expect(wrapper.text()).toEqual(AXIOM);
  });
});
