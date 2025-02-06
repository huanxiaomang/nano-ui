<template>
  <div
    class="nano-avatar"
    :class="[
      `nano-avatar--${shape}`,
      typeof size === 'string' ? `nano-avatar--${size}` : '',
    ]"
    :style="avatarStyle"
  >
    <img
      v-if="src"
      :src="src"
      :alt="alt"
      :style="{ objectFit: fit }"
      @error="handleError"
    />
    <span v-else-if="$slots.default" class="nano-avatar__text">
      <slot />
    </span>
    <n-icon v-else-if="icon" :icon="icon" class="nano-avatar__icon" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import NIcon from '../icon/icon.vue';
import { avatarEmits, avatarProps } from './avatar';

defineOptions({
  name: 'NAvatar',
});

const props = defineProps(avatarProps);
const emit = defineEmits(avatarEmits);

const avatarStyle = computed(() => {
  if (typeof props.size === 'number') {
    return {
      width: `${props.size}px`,
      height: `${props.size}px`,
      lineHeight: `${props.size}px`,
    };
  }
  return {};
});

const handleError = (e: Event) => {
  emit('error', e);
};
</script>

<style scoped>
@import './style.css';
</style>
