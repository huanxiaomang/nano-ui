import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
// import 'nano-ui-vue/dist/index.css'

import NanoUI from 'nano-ui-vue';

import './../../packages/theme/index.css'
library.add(fas);

const app = createApp(App);
app.use(NanoUI);
app.mount('#app');
