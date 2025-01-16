<script lang="ts" setup>
import { h } from 'vue';
import { NMessage } from './../../../packages/components/message/index';

const open = () => {
  NMessage('This is a message.');
};

const openVn = () => {
  NMessage({
    message: h('p', { style: 'line-height: 1; font-size: 14px' }, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
  });
};
</script>

<template>
  <n-button :plain="true" @click="open">Show message</n-button>
  <n-button :plain="true" @click="openVn">VNode</n-button>
</template>
