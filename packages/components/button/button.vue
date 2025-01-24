<template>
  <component
    :is="tag ?? 'button'"
    class="nano-button"
    :disabled="_disabled"
    :autofocus="autofocus"
    :class="{
      [`nano-button--${_type}`]: _type,
      [`nano-button--${_size}`]: _size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': _disabled,
      'is-loading': loading,
      'is-link': link,
    }"
    @click="handleClick"
  >
    <template v-if="loading">
      <slot name="loading">
        <n-icon :icon="props.loadingIcon" :style="iconStyle" size="1x" spin />
      </slot>
    </template>
    <template v-if="props.icon && !loading">
      <n-icon :icon="props.icon" :style="iconStyle" size="1x" />
    </template>
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { throttle } from 'lodash-unified';
import { buttonProps } from './button';
import NIcon from './../icon/icon.vue';
import { buttonGroupContextKey } from './constants';

import type { ButtonEmits } from './button';

defineOptions({
  name: 'NButton',
});

const props = defineProps(buttonProps);
const slots = defineSlots();
const emits = defineEmits<ButtonEmits>();
const ctx = inject(buttonGroupContextKey, void 0);

const _disabled = computed(() => ctx?.disabled ?? props?.disabled ?? false);
const _type = computed(() => ctx?.type ?? (props?.link ? '' : props?.type));
const _size = computed(() => ctx?.size ?? props?.size);
const iconStyle = computed(() => ({
  marginRight: slots.default ? '6px' : '0px',
}));
const { useThrottle } = props;
const emitClick = (e: MouseEvent) => {
  emits('click', e);
};

const handleClickWithThrottle = throttle(emitClick, props.throttleDuration, {
  trailing: false,
});
const handleClick = computed(() =>
  useThrottle ? handleClickWithThrottle : emitClick
);
</script>

<style scoped>
@import './button.css';
</style>
