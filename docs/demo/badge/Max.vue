<template>
  <div class="demo-badge">
    <n-badge :value="200" :max="99">
      <n-button>评论</n-button>
    </n-badge>
    <n-badge :value="100" :max="10">
      <n-button>回复</n-button>
    </n-badge>
  </div>
</template>

<style scoped>
.demo-badge {
  display: flex;
  gap: 40px;
}
</style>
