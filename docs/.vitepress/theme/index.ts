import { ElementPlusContainer } from '@vitepress-demo-preview/component';
import DefaultTheme from 'vitepress/theme';
import NanoUI from 'nano-ui-vue';
import type { App } from 'vue';

import 'vitepress-preview-component/style.css';
import '@nano-ui/theme/index.css';

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.component('DemoPreview', ElementPlusContainer);
    app.use(NanoUI);
  },
};
