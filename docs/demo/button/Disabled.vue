<template>
  <div class="demo-button">
    <p>
      <n-button>Default</n-button>
      <n-button type="primary">Primary</n-button>
      <n-button type="success">Success</n-button>
      <n-button type="info">Info</n-button>
      <n-button type="warning">Warning</n-button>
      <n-button type="danger">Danger</n-button>
    </p>
    <p>
      <n-button disabled>Default</n-button>
      <n-button type="primary" disabled>Primary</n-button>
      <n-button type="success" disabled>Success</n-button>
      <n-button type="info" disabled>Info</n-button>
      <n-button type="warning" disabled>Warning</n-button>
      <n-button type="danger" disabled>Danger</n-button>
    </p>
  </div>
</template>

<style scoped>
.demo-button p {
  margin: 0;
  padding: 1rem 0;
}

.demo-button p:not(:last-child) {
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.demo-button .n-button {
  margin: 0 8px 8px 0;
}
</style>
