<template>
  <div class="demo-avatar">
    <n-avatar icon="user" />
    <n-avatar icon="star" type="primary" />
    <n-avatar icon="heart" type="success" />
    <n-avatar icon="bell" type="warning" />
    <n-avatar icon="trash" type="danger" />
  </div>
</template>

<style scoped>
.demo-avatar {
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>
