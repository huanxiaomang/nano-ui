<template>
  <n-button plain @click="open1">成功</n-button>
  <n-button plain @click="open2">警告</n-button>
  <n-button plain @click="open3">消息</n-button>
  <n-button plain @click="open4">错误</n-button>
</template>

<script setup lang="ts">
import { NNotify } from 'nano-ui-vue';

const open1 = () => {
  NNotify.success({
    title: '成功',
    message: '这是一条成功的提示消息',
  });
};

const open2 = () => {
  NNotify.warning({
    title: '警告',
    message: '这是一条警告的提示消息',
  });
};

const open3 = () => {
  NNotify.info({
    title: '消息',
    message: '这是一条消息的提示消息',
  });
};

const open4 = () => {
  NNotify.error({
    title: '错误',
    message: '这是一条错误的提示消息',
  });
};
</script>
