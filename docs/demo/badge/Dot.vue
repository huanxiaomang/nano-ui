<template>
  <div class="demo-badge">
    <n-badge is-dot>
      <n-button>消息</n-button>
    </n-badge>
    <n-badge is-dot type="primary">
      <n-button>评论</n-button>
    </n-badge>
    <n-badge is-dot type="success">
      <n-button>回复</n-button>
    </n-badge>
    <n-badge is-dot type="warning">
      <n-button>通知</n-button>
    </n-badge>
    <n-badge is-dot type="info">
      <n-button>提醒</n-button>
    </n-badge>
  </div>
</template>

<style scoped>
.demo-badge {
  display: flex;
  gap: 40px;
}
</style>
