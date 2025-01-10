<template>
  <component
    :is="tag !== 'button' ? tag : nativeType"
    class="nano-button"
    :disabled="_disabled"
    :autofocus="autofocus"
    :class="{
      [`nano-button--${type}`]: link ? '' : type,
      [`nano-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
      'is-link': link,
    }"
    @click="useThrottle ? handleClickWithThrottle : handleClick"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { throttle } from 'lodash-unified';
import { buttonProps } from './button';
import type { ButtonEmits } from './button';

defineOptions({
  name: 'NButton',
});

const props = defineProps(buttonProps);

const emits = defineEmits<ButtonEmits>();

const _disabled = computed(() => props.disabled);

const handleClick = (e: MouseEvent) => {
  emits('click', e);
};

const handleClickWithThrottle = throttle(handleClick, props.throttleDuration, {
  trailing: false,
});
</script>

<style scoped>
@import './button.css';
</style>
