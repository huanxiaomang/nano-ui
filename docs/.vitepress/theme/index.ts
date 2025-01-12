import { ElementPlusContainer } from '@vitepress-demo-preview/component';
import DefaultTheme from 'vitepress/theme';
import NanoUI from 'nano-ui-vue';
import type { App } from 'vue';

import '@vitepress-demo-preview/component/dist/style.css';
import 'nano-ui-vue/dist/index.css';

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('DemoPreview', ElementPlusContainer);
    app.use(NanoUI);
  },
};
