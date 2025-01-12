import { ElementPlusContainer } from '@vitepress-demo-preview/component';
import DefaultTheme from 'vitepress/theme';
import NanoUI from 'nano-ui-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import type { App } from 'vue';

import '@vitepress-demo-preview/component/dist/style.css';
import 'nano-ui-vue/dist/index.css';

export default {
  ...DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    library.add(fas);
    app.component('DemoPreview', ElementPlusContainer);
    app.use(NanoUI);
  },
};
