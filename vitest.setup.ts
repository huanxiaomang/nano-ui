import { config } from '@vue/test-utils';
import { afterAll, beforeAll, vi } from 'vitest';
import ResizeObserver from 'resize-observer-polyfill';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

beforeAll(() => {
  library.add(fas);
});

afterAll(() => {
  library.reset();
});

vi.stubGlobal('ResizeObserver', ResizeObserver);
config.global.stubs = {};
