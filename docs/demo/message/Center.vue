<script lang="ts" setup>
import { NMessage } from 'nano-ui-vue';

const openCenter = () => {
  NMessage({
    showClose: true,
    message: 'Centered text',
    center: true,
  });
};
</script>

<template>
  <n-button plain @click="openCenter">Centered text</n-button>
</template>
