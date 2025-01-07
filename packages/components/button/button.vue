<template>
  <div class="nano-button text-red-700">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { toRaw } from 'vue';
import { buttonProps } from './button';

const props = defineProps(buttonProps);
console.log(toRaw(props));
</script>

<style scoped></style>
