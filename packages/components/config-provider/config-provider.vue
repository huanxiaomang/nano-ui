<template>
  <slot />
</template>

<script setup lang="ts">
import { getCurrentInstance, watch } from 'vue';
import { configProviderProps } from './type';
import { provideGlobalConfig } from './hooks/provide-global-config';

const props = defineProps(configProviderProps);
watch(
  () => props.message || props.notification,
  () => {
    const config = provideGlobalConfig(props);
    console.log(getCurrentInstance(), config);
  },
  { immediate: true, deep: true }
);
</script>

<style scoped></style>
