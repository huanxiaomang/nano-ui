<template>
  <div class="demo-button">
    <p>
      <n-button size="large">Large</n-button>
      <n-button>Default</n-button>
      <n-button size="small">Small</n-button>
      <n-button size="large" icon="search">Search</n-button>
      <n-button icon="search">Search</n-button>
      <n-button size="small" icon="search">Search</n-button>
    </p>

    <p>
      <n-button size="large" round>Large</n-button>
      <n-button round>Default</n-button>
      <n-button size="small" round>Small</n-button>
      <n-button size="large" icon="search" round>Search</n-button>
      <n-button icon="search" round>Search</n-button>
      <n-button size="small" icon="search" round>Search</n-button>
    </p>

    <p>
      <n-button size="large" icon="search" circle />
      <n-button icon="search" circle />
      <n-button size="small" icon="search" circle />
    </p>
  </div>
</template>

<style scoped>
.demo-button p {
  display: flex;
  gap: 5px;
}

.demo-button p:not(:last-child) {
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.demo-button .n-button {
  margin: 0 8px 8px 0;
}
</style>
