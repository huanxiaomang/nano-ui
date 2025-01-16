<script setup>
function handleBtnClick() {
  console.log('btn click');
}
</script>

<template>
  <p>
    <n-button use-throttle throttle-duration="3000" @click="handleBtnClick">
      with throttle</n-button
    >
    <n-button :use-throttle="false" @click="handleBtnClick"
      >without throttle</n-button
    >
  </p>
</template>
