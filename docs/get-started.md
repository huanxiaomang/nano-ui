---
search: false
next:
  link: /components/button
  text: Button 按钮
---

# Nano-UI

名字来源于《日常》及其衍生作品中的登场角色东云名乃(Shinonome Nano、東雲 なの)。

## 安装

```bash
npm i nano-ui-vue --save
```

## 开始使用

**全局使用**

```js
// 引入所有组件
import NanoUI from 'nano-ui-vue';
// 引入样式
import 'nano-ui-vue/dist/index.css';

import App from './App.vue';
// 全局使用
createApp(App).use(NanoUI).mount('#app');
```

```vue
<template>
  <n-button>我是 Button</n-button>
</template>
```

**单个导入**

Nano-UI 提供了基于 ES Module 的开箱即用的 Tree Shaking 功能。

```vue
<template>
  <n-button>我是 Button</n-button>
</template>
<script>
import { NButton } from ' nano-ui-vue';
export default {
  components: { NButton },
};
</script>
```
