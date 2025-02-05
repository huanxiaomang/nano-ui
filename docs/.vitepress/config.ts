import { defineConfig } from 'vitepress';
import {
  componentPreview,
  containerPreview,
} from '@vitepress-demo-preview/plugin';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'nano-ui',
  description: '一个vue3的组件库',
  base: '/nano-ui/',
  appearance: false,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '开始使用', link: '/get-started' },
      { text: '组件', link: '/components/button' },
    ],
    search: {
      provider: 'local',
    },
    sidebar: [
      {
        text: '指南',
        collapsed: false,
        items: [{ text: '快速开始', link: '/get-started' }],
      },
      {
        text: '配置组件',
        collapsed: false,
        items: [{ text: 'ConfigProvider', link: 'components/config-provider' }],
      },
      {
        text: '基础组件',
        collapsed: false,
        items: [{ text: 'Button', link: 'components/button' }],
      },
      {
        text: '反馈组件',
        collapsed: false,
        items: [
          { text: 'Alert', link: 'components/alert' },
          { text: 'Message', link: 'components/message' },
          { text: 'Notification', link: 'components/notification' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/huanxiaomang/nano-ui' },
    ],
  },
  markdown: {
    config: (md) => {
      md.use(containerPreview);
      md.use(componentPreview);
    },
  },
});
