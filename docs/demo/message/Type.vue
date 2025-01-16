<script lang="ts" setup>
import { NMessage } from 'nano-ui-vue';

const open1 = () => {
  NMessage('This is a message.');
};
const open2 = () => {
  NMessage({
    message: 'Congrats, this is a success message.',
    type: 'success',
  });
};
const open3 = () => {
  NMessage({
    message: 'Warning, this is a warning message.',
    type: 'warning',
  });
};
const open4 = () => {
  NMessage.error('Oops, this is a error message.');
};
</script>

<template>
  <n-button :plain="true" @click="open2">Success</n-button>
  <n-button :plain="true" @click="open3">Warning</n-button>
  <n-button :plain="true" @click="open1">Message</n-button>
  <n-button :plain="true" @click="open4">Error</n-button>
</template>
