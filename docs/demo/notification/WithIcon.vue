<template>
  <n-button plain @click="open"> 带图标的通知 </n-button>
</template>

<script setup lang="ts">
import { NNotify } from 'nano-ui-vue';

const open = () => {
  NNotify({
    title: '带图标的标题',
    message: '这是一条带图标的通知',
    type: 'success',
    showIcon: true,
  });
};
</script>
