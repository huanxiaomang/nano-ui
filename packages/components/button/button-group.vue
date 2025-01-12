<template>
  <div class="nano-button-group">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide, reactive, toRef } from 'vue';
import { buttonGroupProps } from './button-group';
import { buttonGroupContextKey } from './constants';

defineOptions({
  name: 'NButtonGroup',
});

const props = defineProps(buttonGroupProps);

provide(
  buttonGroupContextKey,
  reactive({
    size: toRef(props, 'size'),
    type: toRef(props, 'type'),
    disabled: toRef(props, 'disabled'),
  })
);
</script>

<style scoped>
@import './button.css';
</style>
