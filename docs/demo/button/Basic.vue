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
      <n-button plain>Plain</n-button>
      <n-button type="primary" plain>Primary</n-button>
      <n-button type="success" plain>Success</n-button>
      <n-button type="info" plain>Info</n-button>
      <n-button type="warning" plain>Warning</n-button>
      <n-button type="danger" plain>Danger</n-button>
    </p>

    <p>
      <n-button round>Round</n-button>
      <n-button type="primary" round>Primary</n-button>
      <n-button type="success" round>Success</n-button>
      <n-button type="info" round>Info</n-button>
      <n-button type="warning" round>Warning</n-button>
      <n-button type="danger" round>Danger</n-button>
    </p>

    <p>
      <n-button icon="search" circle />
      <n-button type="primary" icon="edit" circle />
      <n-button type="success" icon="check" circle />
      <n-button type="info" icon="message" circle />
      <n-button type="warning" icon="star" circle />
      <n-button type="danger" icon="trash" circle />
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
