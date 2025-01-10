import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'nano-ui-vue/dist/index.css'

import NanoUI from 'nano-ui-vue';


const app = createApp(App);
app.use(NanoUI);
app.mount('#app')
