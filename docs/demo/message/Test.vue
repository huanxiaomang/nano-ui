<script lang="ts" setup>
import { NMessage } from 'nano-ui-vue';

const open1 = () => {
  NMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  });
};
const open2 = () => {
  NMessage.success('Congrats, this is a success message.');
};
</script>
<template>
  <div>
    <n-button @click="open1">插件式调用</n-button>
    <n-button @click="open2">函数式调用</n-button>
    <n-button @click="$message.success('Congrats, this is a success message.')"
      >全局方法调用</n-button
    >
  </div>
</template>
