<template>
  <slot :config="config" />
</template>

<script setup lang="ts">
import { configProviderProps } from './type';
import { provideGlobalConfig } from './hooks/provide-global-config';

const props = defineProps(configProviderProps);
const config = provideGlobalConfig(props);
</script>

<style scoped></style>
