<template>
  <Transition name="nano-alert-fade">
    <div
      v-show="visible"
      class="nano-alert"
      role="alert"
      :class="{
        [`nano-alert__${type}`]: type,
        [`nano-alert__${effect}`]: effect,
        'text-center': center,
      }"
    >
      <n-icon
        v-if="showIcon"
        class="nano-alert__icon"
        :class="{ 'big-icon': withDescription }"
        :icon="iconName"
      />

      <div class="nano-alert__content">
        <span
          class="nano-alert__title"
          :class="{ 'with-desc': withDescription }"
          :style="{ display: center && !showIcon ? 'flow' : 'inline' }"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="nano-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <div v-if="closable" class="nano-alert__close">
          <n-icon icon="xmark" @click.stop="close" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { typeIconMap } from '@nano-ui/shared';
import { alertEmits, alertProps } from './alert';
import NIcon from './../icon/icon.vue';

defineOptions({
  name: 'NAlert',
});

const props = defineProps(alertProps);
const emit = defineEmits(alertEmits);
const slots = defineSlots();

const visible = ref(true);

const close = (ev: MouseEvent) => {
  visible.value = false;
  emit('close', ev);
};

const open = () => {
  visible.value = true;
};

const iconName = computed(() =>
  props.type ? typeIconMap.get(props.type)! : 'circle-info'
);
const withDescription = computed(() => props.description || slots.default);

defineExpose({
  close,
  open,
  visible,
});
</script>

<style scoped>
@import './style.css';
</style>
