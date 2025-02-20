import { resolve } from 'path';
import { access, cp } from 'node:fs/promises';
import { PluginOption, defineConfig } from 'vite';
import { compression } from 'vite-plugin-compression2';
import { visualizer } from 'rollup-plugin-visualizer';
import vue from '@vitejs/plugin-vue';
import terser from '@rollup/plugin-terser';
import { hooksPlugin as hooks } from './hooksPlugin';

const TRY_MOVE_STYLES_DELAY = 800;

const env = {
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',
};

/**
 * 移动样式文件
 */
async function moveStyles() {
  try {
    await access('./dist/umd/index.css.gz');
    await cp('./dist/umd/index.css', './dist/index.css');
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      setTimeout(moveStyles, TRY_MOVE_STYLES_DELAY);
    } else {
      console.error('Failed to move styles:', err);
    }
  }
}

function getPlugins(): PluginOption[] {
  return [
    vue(),
    visualizer({
      filename: 'dist/stats.umd.html',
    }),
    compression({
      include: /.(cjs|css)$/i,
    }),
    terser({
      compress: {
        drop_console: ['log'],
        drop_debugger: true,
        passes: 3,
        global_defs: {
          '@DEV': JSON.stringify(env.isDev),
          '@PROD': JSON.stringify(env.isProd),
          '@TEST': JSON.stringify(env.isTest),
        },
      },
    }),
    hooks({
      rmFiles: ['./dist/umd', './dist/index.css'],
      afterBuild: moveStyles,
    }) as PluginOption,
  ];
}

export default defineConfig({
  plugins: getPlugins(),
  build: {
    outDir: 'dist/umd',
    lib: {
      entry: resolve(__dirname, '../index.ts'),
      name: 'NanoUI',
      fileName: 'index',
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css';
          return assetInfo.name as string;
        },
      },
    },
  },
  resolve: {
    alias: {
      '@nano-ui/constants': resolve(__dirname, '../../constants/index.ts'),
    },
  },
});
