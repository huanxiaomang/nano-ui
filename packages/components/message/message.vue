<template>
  <Transition name="fade-up" @before-leave="onClose" @after-leave="destroy">
    <div
      v-show="visible"
      ref="messageRef"
      class="nano-message"
      :class="{
        [`nano-message--${type}`]: type,
        'is-close': showClose,
        'text-center': center,
      }"
      role="alert"
      :style="nativeStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <n-icon class="nano-message__icon" :icon="iconName" />
      <div class="nano-message__content">
        <slot>
          <template v-if="dangerouslyUseHTMLString">
            <p v-html="message" />
          </template>
          <template v-else>
            <p>{{ message }}</p>
          </template>
        </slot>
      </div>
      <div v-if="showClose" class="nano-message__close">
        <n-icon icon="xmark" @click.stop="close" />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, readonly, ref } from 'vue';
import { useEventListener, useResizeObserver } from '@vueuse/core';
import { delay } from 'lodash-unified';
import { typeIconMap } from '@nano-ui/shared';
import { useGlobalComponentSettings } from '@nano-ui/hooks';
import { messageEmits, messageProps } from './message';
import { getLastBottomOffset, getOffset } from './instance';
import NIcon from './../icon/icon.vue';
import type { CSSProperties } from 'vue';

defineOptions({
  name: 'NMessage',
});

const props = defineProps(messageProps);
const emit = defineEmits(messageEmits);

const visible = ref(false);
const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info');
const height = ref(0);
const messageRef = ref<HTMLDivElement>();

const { currZIndex, nextZIndex } = useGlobalComponentSettings();
const lastOffset = computed(() => getLastBottomOffset(props.id));

const offset = computed(
  (): number => getOffset(props.id, props.offset) + lastOffset.value
);

const bottomOffset = computed((): number => height.value + offset.value);

const nativeStyle = computed<CSSProperties>(() => ({
  top: `${offset.value}px`,
  zIndex: currZIndex.value,
}));

let timer: number;
const startTimer = () => {
  if (props.duration === 0) return;
  timer = delay(close, props.duration);
};

const clearTimer = () => {
  clearTimeout(timer);
};

const close = () => {
  visible.value = false;
};

const cleanup = useEventListener(document, 'keydown', (e: Event) => {
  const { code } = e as KeyboardEvent;
  if (code === 'Escape') close();
});

onMounted(() => {
  visible.value = true;
  startTimer();
  nextZIndex();
});

const destroy = () => {
  emit('destroy');
  clearTimer();
  cleanup();
};

useResizeObserver(messageRef, () => {
  height.value = messageRef.value!.getBoundingClientRect().height;
});

defineExpose({
  getVisible: () => readonly(visible),
  close,
  bottomOffset,
});
</script>

<style scoped>
@import './style.css';
</style>
