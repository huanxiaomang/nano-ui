<template>
  <n-config-provider
    :notification="{
      duration: 5000,
      position: 'top-right',
      max: 4,
    }"
  >
    <n-button @click="open">显示通知</n-button>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NNotify } from 'nano-ui-vue';

const open = () => {
  NNotify({
    title: '通知标题',
    message: '这是一条通知消息',
  });
};
</script>
