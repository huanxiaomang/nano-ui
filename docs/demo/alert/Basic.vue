<template>
  <h2>通过 slot 传入内容</h2>
  <div style="max-width: 600px">
    <n-alert type="success">Success alert</n-alert>
    <n-alert type="info">Info alert</n-alert>
    <n-alert type="warning">Warning alert</n-alert>
    <n-alert type="danger">Error alert</n-alert>
  </div>
  <h2>通过 prop 传入内容</h2>
  <div style="max-width: 600px">
    <n-alert type="success" title="Success alert" />
    <n-alert type="info" title="Info alert" />
    <n-alert type="warning" title="Warning alert" />
    <n-alert type="danger" title="Error alert" />
  </div>
</template>
