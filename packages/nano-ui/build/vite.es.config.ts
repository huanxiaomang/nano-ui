import { resolve } from 'path';
import { promises as fs, readdirSync } from 'fs';
import { PluginOption, defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import terser from '@rollup/plugin-terser';
import { hooksPlugin as hooks } from './hooksPlugin';

const TRY_MOVE_STYLES_DELAY = 800;

const env = {
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',
};

function getDirectoriesSync(basePath: string) {
  const entries = readdirSync(basePath, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

async function moveStyles() {
  try {
    await fs.access('./dist/es/theme');
    await fs.rename('./dist/es/theme', './dist/theme');
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      setTimeout(moveStyles, TRY_MOVE_STYLES_DELAY);
    }
  }
}

function getComponentChunkName(id: string) {
  const dirNames = getDirectoriesSync('../components');
  for (const dirName of dirNames) {
    if (id.includes(`/packages/components/${dirName}`)) {
      return dirName;
    }
  }
  return null;
}

function getPlugins(): PluginOption[] {
  return [
    vue(),
    visualizer({
      filename: 'dist/stats.es.html',
      gzipSize: true,
      brotliSize: true,
    }),
    dts({
      tsconfigPath: '../../tsconfig.build.json',
      outDir: 'dist/types',
    }) as PluginOption,
    hooks({
      rmFiles: ['./dist/umd', './dist/index.css'],
      afterBuild: moveStyles,
    }) as PluginOption,
    terser({
      compress: {
        sequences: env.isProd,
        arguments: env.isProd,
        drop_console: env.isProd && ['log'],
        drop_debugger: env.isProd,
        passes: env.isProd ? 4 : 1,
        pure_getters: env.isProd,
        unsafe_methods: env.isProd,
        module: true,
        global_defs: {
          '@DEV': JSON.stringify(env.isDev),
          '@PROD': JSON.stringify(env.isProd),
          '@TEST': JSON.stringify(env.isTest),
        },
      },
      format: {
        semicolons: false,
        shorthand: env.isProd,
        braces: !env.isProd,
        beautify: !env.isProd,
        comments: !env.isProd,
      },
      mangle: {
        toplevel: env.isProd,
        eval: env.isProd,
        keep_classnames: env.isDev,
        keep_fnames: env.isDev,
      },
    }),
  ];
}

export default defineConfig({
  plugins: getPlugins(),
  build: {
    outDir: 'dist/es',
    minify: false,
    cssCodeSplit: true,
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
      external: [
        'vue',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/vue-fontawesome',
        '@popperjs/core',
        'async-validator',
        /^@babel\/runtime/,
      ],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'index.css';
          if (
            assetInfo.type === 'asset' &&
            /\.css$/i.test(assetInfo.name as string)
          ) {
            return 'theme/[name].[ext]';
          }
          return assetInfo.name as string;
        },
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
          if (id.includes('/packages/hooks')) {
            return 'hooks';
          }
          if (id.includes('/packages/constants')) {
            return 'constants';
          }
          if (
            id.includes('/packages/shared') ||
            id.includes('plugin-vue:export-helper')
          ) {
            return 'shared';
          }
          return getComponentChunkName(id);
        },
      },
    },
    lib: {
      entry: resolve(__dirname, '../index.ts'),
      name: 'NanoUI',
      fileName: 'index',
      formats: ['es'],
    },
  },
});
