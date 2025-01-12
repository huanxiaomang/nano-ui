<template>
  <i
    class="nano-icon"
    :class="[`nano-icon-${props.type}`]"
    :style="customStyles"
    v-bind="$attrs"
  >
    <font-awesome-icon v-bind="nativeProps" />
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { omit } from 'lodash-unified';
import { iconProps } from './icon';

defineOptions({
  name: 'NIcon',
  inheritAttrs: false,
});

const props = defineProps(iconProps);

const nativeProps = computed(() => omit(props, ['type', 'color']));
const customStyles = computed(() => ({ color: props.color ?? void 0 }));
</script>

<style scoped>
@import './style.css';
</style>
