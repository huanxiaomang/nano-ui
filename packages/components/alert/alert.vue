<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { alertEmits, alertProps } from './alert';

defineOptions({
  name: 'NAlert',
});

const props = defineProps(alertProps);
const emit = defineEmits(alertEmits);
</script>

<style scoped>
@import './button.css';
</style>
