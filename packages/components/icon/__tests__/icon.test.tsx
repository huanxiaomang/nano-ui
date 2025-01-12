import { mount } from '@vue/test-utils';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import NIcon from '../icon.vue';

beforeAll(() => {
  library.add(fas);
});

afterAll(() => {
  library.reset();
});

describe('NIcon.vue', () => {
  it('create', () => {
    const wrapper = mount(() => <NIcon icon="check-circle" />);
    expect(wrapper.classes()).toContain('nano-icon');
  });

  it('should render with the correct type', () => {
    const wrapper = mount(() => <NIcon icon="check-circle" type="primary" />);
    expect(wrapper.classes()).toContain('nano-icon-primary');
  });

  it('should apply custom color', () => {
    const wrapper = mount(() => <NIcon icon="check-circle" color="red" />);
    expect(wrapper.attributes('style')).toContain('color: red');
  });
});
