<template>
  <n-button plain @click="open"> 隐藏关闭按钮 </n-button>
</template>

<script setup lang="ts">
import { NNotify } from 'nano-ui-vue';

const open = () => {
  NNotify({
    title: '无法关闭',
    message: '这是一条不能手动关闭的通知',
    showClose: false,
  });
};
</script>
