<template>
  <n-config-provider
    :message="{
      max: 3,
      duration: 5000,
      showClose: true,
    }"
  >
    <n-button @click="open">显示多条消息</n-button>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, NMessage } from 'nano-ui-vue';

const open = () => {
  NMessage('消息 1');
  NMessage('消息 2');
  NMessage('消息 3');
  NMessage('消息 4'); // 由于 max: 3，这条消息不会显示
};
</script>
