<template>
  <Transition
    name="nano-notification-fade"
    @before-leave="onClose"
    @after-leave="destroy"
  >
    <div
      v-show="visible"
      ref="notifyRef"
      class="nano-notification"
      :class="{
        [`nano-notification--${type}`]: type,
        'show-close': showClose,
        [horizontalClass]: true,
      }"
      role="alert"
      :style="nativeStyle"
      @click="onClick"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <n-icon class="nano-notification__icon" :icon="iconName" />
      <div class="nano-notification__text">
        <div class="nano-notification__title">{{ title }}</div>
        <div class="nano-notification__content">
          <slot>
            <template v-if="dangerouslyUseHTMLString">
              <p v-html="message" />
            </template>
            <template v-else>
              <p>{{ message }}</p>
            </template>
          </slot>
        </div>
      </div>
      <div v-if="showClose" class="nano-notification__close">
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
import { EVENT_CODE } from '@nano-ui/constants';
import { notificationEmits, notificationProps } from './notification';
import { getLastBottomOffset, getOffset } from './instance';
import NIcon from './../icon/icon.vue';
import type { CSSProperties } from 'vue';

defineOptions({
  name: 'NNotification',
});

const props = defineProps(notificationProps);
const emit = defineEmits(notificationEmits);

const visible = ref(false);
const iconName = computed(() => typeIconMap.get(props.type) ?? 'circle-info');
const height = ref(0);
const notifyRef = ref<HTMLDivElement>();

const { currZIndex, nextZIndex } = useGlobalComponentSettings().zIndex;
const lastOffset = computed(() => getLastBottomOffset(props.id));

const topOffset = computed(
  (): number =>
    getOffset(props.id, props.position, props.topOffset) + lastOffset.value
);

const horizontalClass = computed(() =>
  props.position.endsWith('right') ? 'right' : 'left'
);

const verticalProperty = computed(() =>
  props.position.startsWith('top') ? 'top' : 'bottom'
);

const bottomOffset = computed((): number => height.value + topOffset.value);

const nativeStyle = computed<CSSProperties>(() => ({
  [verticalProperty.value]: `${topOffset.value}px`,
  zIndex: props.zIndex ?? currZIndex.value,
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

  if (code === EVENT_CODE.delete || code === EVENT_CODE.backspace) clearTimer();
  if (code === EVENT_CODE.esc) close();
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

useResizeObserver(notifyRef, () => {
  height.value = notifyRef.value!.getBoundingClientRect().height;
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
