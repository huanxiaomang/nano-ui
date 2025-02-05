<template>
  <n-button plain @click="open"> 打开通知 </n-button>
</template>

<script setup lang="ts">
import { NNotify } from 'nano-ui-vue';

const open = () => {
  NNotify({
    title: '标题',
    message: '这是一条通知',
  });
};
</script>
