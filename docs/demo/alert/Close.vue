<script setup>
import { NMessage } from 'nano-ui-vue';

function handleClose() {
  NMessage.info('close callback');
}
</script>
<template>
  <div class="basic block">
    <n-alert title="Unclosable alert" type="success" :closable="false" />
    <n-alert title="Alert with callback" type="warning" @close="handleClose" />
  </div>
</template>
