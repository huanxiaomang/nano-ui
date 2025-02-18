import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import VueMacros from 'unplugin-vue-macros/vite';

export default defineConfig({
  plugins: [
    VueMacros({
      setupComponent: false,
      setupSFC: false,
      plugins: {
        vue: Vue(),
        vueJsx: VueJsx(),
      },
    }),
  ],
  optimizeDeps: {
    disabled: true,
  },
  test: {
    clearMocks: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    reporters: ['default'],
    testTransformMode: {
      web: ['*.{ts,tsx}'],
    },
    coverage: {
      reporter: ['text', 'json-summary', 'json'],
      exclude: [
        'play/**',
        'docs/**',
        'typings/**',
        'packages/locale/lang/**',
        'packages/constants',
        'packages/components/*/style/**',
        '**/dist/**',
        '**/**.config.ts',
        '**/index.ts',
        '**/true/coverage/**',
        '**/coverage/**',
        '**/node_modules/**',
        '**/**.js',
        'postcss.config.cjs',
        'vitest.config.mts',
        'vitest.workspace.ts',
      ],
    },
  },
});
