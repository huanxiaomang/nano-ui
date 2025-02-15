<template>
  <div class="demo-badge">
    <n-badge :value="12">
      <n-button>评论</n-button>
    </n-badge>
    <n-badge :value="3" type="primary">
      <n-button>回复</n-button>
    </n-badge>
    <n-badge :value="1" type="warning">
      <n-button>消息</n-button>
    </n-badge>
    <n-badge :value="2" type="info">
      <n-button>通知</n-button>
    </n-badge>
  </div>
</template>

<style scoped>
.demo-badge {
  display: flex;
  gap: 40px;
}
</style>
