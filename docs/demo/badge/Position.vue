<template>
  <div class="demo-badge">
    <n-badge value="1" position="top-right">
      <n-button>右上</n-button>
    </n-badge>
    <n-badge value="2" position="top-left">
      <n-button>左上</n-button>
    </n-badge>
    <n-badge value="3" position="bottom-right">
      <n-button>右下</n-button>
    </n-badge>
    <n-badge value="4" position="bottom-left">
      <n-button>左下</n-button>
    </n-badge>
  </div>
</template>

<style scoped>
.demo-badge {
  display: flex;
  gap: 40px;
}
</style>
