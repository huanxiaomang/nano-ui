<template>
  <n-config-provider :z-index="3000">
    <n-button @click="open">打开消息</n-button>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessage } from 'nano-ui-vue';

const open = () => {
  NMessage('这条消息的 z-index 是 3000');
};
</script>
