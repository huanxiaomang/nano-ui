<template>
  <div>
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
