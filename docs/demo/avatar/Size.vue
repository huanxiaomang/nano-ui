<template>
  <div class="demo-avatar">
    <n-avatar size="small">S</n-avatar>
    <n-avatar>D</n-avatar>
    <n-avatar size="large">L</n-avatar>
    <n-avatar :size="60">60</n-avatar>
  </div>
</template>

<style scoped>
.demo-avatar {
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>
