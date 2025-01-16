<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { notificationEmits, notificationProps } from './notification';

defineOptions({
  name: 'NNotification',
});

const props = defineProps(notificationProps);
const emit = defineEmits(notificationEmits);


</script>

<style scoped>
@import './style.css';
</style>
