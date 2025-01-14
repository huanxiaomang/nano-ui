<template>
  <Transition @before-leave="onClose" @after-leave="destroy">
    <div
      v-if="visible"
      ref="messageRef"
      class="nano-message"
      :class="{
        [`nano-message--${type}`]: type,
        'is-close': showClose,
        'text-center': center,
      }"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <n-icon class="nano-message__icon" :icon="iconName" />
      <div class="nano-message__content">
        <template v-if="dangerouslyUseHTMLString">
          <p v-html="message" />
        </template>
        <template v-else>
          <p>{{ message }}</p>
        </template>
      </div>
      <div v-if="showClose" class="nano-message__close">
        <n-icon icon="xmark" @click.stop="close" />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useEventListener } from '@vueuse/core';
import { delay } from 'lodash-unified';
import { typeIconMap } from '@nano-ui/shared';
import { messageEmits, messageProps } from './message';

defineOptions({
  name: 'NMessage',
});

const props = defineProps(messageProps);
const emit = defineEmits(messageEmits);

const visible = ref(true);
const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info');

let timer: number;
const startTimer = () => {
  if (props.duration === 0) return;
  timer = delay(close, props.duration);
};

const clearTimer = () => {
  clearTimeout(timer);
};

const destroy = () => {
  emit('destroy');
  clearTimer();
  cleanup();
};

const close = () => {
  visible.value = false;
};

const cleanup = useEventListener(document, 'keydown', (e: Event) => {
  const { code } = e as KeyboardEvent;
  if (code === 'Escape') close();
});

onMounted(() => {
  startTimer();
});

defineExpose({
  visible,
  close,
});
</script>

<style scoped>
@import './style.css';
</style>
