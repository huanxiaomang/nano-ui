<template>
  <n-config-provider :locale="locale">
    <n-button @click="toggleLocale"> 当前语言: {{ currentLocale }} </n-button>
    <n-button @click="open">打开消息</n-button>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NConfigProvider, NMessage } from 'nano-ui-vue';
import { en, ja, zhCn } from '@nano-ui/locale';

const locales = {
  'zh-CN': zhCn,
  'en-US': en,
  'ja-JP': ja,
};

const currentLocale = ref('zh-CN');
const locale = ref(zhCn);

const toggleLocale = () => {
  const localeKeys = Object.keys(locales);
  const currentIndex = localeKeys.indexOf(currentLocale.value);
  const nextIndex = (currentIndex + 1) % localeKeys.length;
  currentLocale.value = localeKeys[nextIndex];
  locale.value = locales[currentLocale.value];
};

const open = () => {
  NMessage('测试国际化配置');
};
</script>
