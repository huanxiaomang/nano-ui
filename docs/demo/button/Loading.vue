<template>
  <div class="demo-button">
    <n-button type="primary" loading>Loading</n-button>
    <n-button type="primary" loading-icon="circle-notch" loading
      >Loading</n-button
    >
    <n-button type="primary" loading>
      <template #loading>
        <n-icon style="margin-right: 6px" icon="star" spin />
      </template>
      Loading
    </n-button>
  </div>
</template>

<style scoped>
.demo-button .n-button {
  margin: 0 8px 8px 0;
}

.demo-button {
  display: flex;
  gap: 5px;
}
</style>
