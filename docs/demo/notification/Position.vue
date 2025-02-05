<template>
  <n-button plain @click="topRight">右上角</n-button>
  <n-button plain @click="topLeft">左上角</n-button>
  <n-button plain @click="bottomRight">右下角</n-button>
  <n-button plain @click="bottomLeft">左下角</n-button>
</template>

<script setup lang="ts">
import { NNotify } from 'nano-ui-vue';

const topRight = () => {
  NNotify({
    title: '右上角',
    message: '这是一条通知',
    position: 'top-right',
  });
};

const topLeft = () => {
  NNotify({
    title: '左上角',
    message: '这是一条通知',
    position: 'top-left',
  });
};

const bottomRight = () => {
  NNotify({
    title: '右下角',
    message: '这是一条通知',
    position: 'bottom-right',
  });
};

const bottomLeft = () => {
  NNotify({
    title: '左下角',
    message: '这是一条通知',
    position: 'bottom-left',
  });
};
</script>
