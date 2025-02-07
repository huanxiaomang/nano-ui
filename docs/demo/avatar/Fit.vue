<template>
  <div class="demo-avatar">
    <div class="demo-avatar-item">
      <span class="demo-avatar-title">fill</span>
      <n-avatar src="../nano.png" fit="fill" />
    </div>
    <div class="demo-avatar-item">
      <span class="demo-avatar-title">contain</span>
      <n-avatar src="../nano.png" fit="contain" />
    </div>
    <div class="demo-avatar-item">
      <span class="demo-avatar-title">cover</span>
      <n-avatar src="../nano.png" fit="cover" />
    </div>
    <div class="demo-avatar-item">
      <span class="demo-avatar-title">none</span>
      <n-avatar src="../nano.png" fit="none" />
    </div>
    <div class="demo-avatar-item">
      <span class="demo-avatar-title">scale-down</span>
      <n-avatar src="../nano.png" fit="scale-down" />
    </div>
  </div>
</template>

<style scoped>
.demo-avatar {
  display: flex;
  gap: 40px;
  align-items: flex-start;
}

.demo-avatar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.demo-avatar-title {
  font-size: 14px;
  color: var(--nano-text-color-secondary);
}
</style>
