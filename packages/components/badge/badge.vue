<template>
  <div class="nano-badge">
    <slot />
    <sup
      v-if="!hidden"
      class="nano-badge__content"
      :class="[
        `nano-badge__content--${type}`,
        `is-${position}`,
        {
          'is-dot': isDot,
          'is-fixed': !!$slots.default,
        },
      ]"
      v-text="displayValue"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { badgeProps } from './badge';

defineOptions({
  name: 'NBadge',
});

const props = defineProps(badgeProps);

const displayValue = computed(() => {
  if (props.isDot) return '';

  if (typeof props.value === 'number' && typeof props.max === 'number') {
    return props.value > props.max ? `${props.max}+` : props.value;
  }

  return props.value;
});
</script>

<style scoped>
@import './style.css';
</style>
