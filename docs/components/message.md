---
title: Message 消息提示
description: 常用于主动操作后的反馈提示
category: Feedback 反馈组件

next:
  link: /components/messagebox
  text: MessageBox 消息弹出框

prev:
  link: /components/loading
  text: Loading 加载
---

# Message 消息提示

常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。

## 基础用法

从顶部出现，3 秒后自动消失。

::: preview
demo-preview=../demo/message/Basic.vue
:::

## 不同类型

用来显示「成功、警告、消息、错误」类的操作反馈。通过 `type` 属性来配置。

::: preview
demo-preview=../demo/message/Type.vue
:::

## 可关闭的消息

默认的 Message 是不可以被人工关闭的。如果你需要手动关闭功能，你可以把 `showClose` 设置为 true。此外，Message 拥有可控的 `duration`，默认的关闭时间为 3000 毫秒，当把这个属性的值设置为 0 便表示该消息不会被自动关闭。

::: preview
demo-preview=../demo/message/Closeable.vue
:::

## 文字居中

使用 `center` 属性让文字水平居中。

::: preview
demo-preview=../demo/message/Center.vue
:::

## 使用方式

### 全局方法

Message 组件提供了全局方法 `$message`，在 Vue 实例中可以作为 `this.$message` 使用。

```ts
// 挂载全局方法
app.use(NanoUI);

// 使用方式
this.$message('这是一条消息提示');

// 或者
this.$message({
  message: '这是一条消息提示',
  type: 'success',
});
```

### 单独引用

```ts
import { NMessage } from 'nano-ui-vue';

// 基础用法
NMessage('这是一条消息提示');

// 成功提示
NMessage.success('这是一条成功消息');

// 警告提示
NMessage.warning('这是一条警告消息');

// 错误提示
NMessage.error('这是一条错误消息');

// 配置选项
NMessage({
  message: '这是一条消息提示',
  type: 'success',
  duration: 5000,
  showClose: true,
});
```

## API

### Message Options

| 名称      | 说明                                  | 类型                                          | 默认值 |
| --------- | ------------------------------------- | --------------------------------------------- | ------ |
| message   | 消息文字                              | `string \| VNode`                             | -      |
| type      | 消息类型                              | `'success' \| 'warning' \| 'info' \| 'error'` | 'info' |
| duration  | 显示时间(毫秒)，设为 0 则不会自动关闭 | `number`                                      | 3000   |
| showClose | 是否显示关闭按钮                      | `boolean`                                     | false  |
| center    | 文字是否居中                          | `boolean`                                     | false  |
| offset    | Message 距离窗口顶部的偏移量(px)      | `number`                                      | 20     |

### Message 方法

调用 `NMessage` 会返回一个关闭消息的方法，可以手动调用该方法关闭消息。

```ts
const close = NMessage('这是一条消息提示');
// 关闭消息
close();
```

### 样式变量

| 变量名                       | 说明           | 默认值                         |
| ---------------------------- | -------------- | ------------------------------ |
| --nano-message-padding       | 内边距         | 12px 20px                      |
| --nano-message-min-width     | 最小宽度       | 300px                          |
| --nano-message-max-width     | 最大宽度       | calc(100% - 32px)              |
| --nano-message-font-size     | 字体大小       | 14px                           |
| --nano-message-line-height   | 行高           | 1.4                            |
| --nano-message-border-radius | 圆角           | var(--nano-border-radius-base) |
| --nano-message-icon-size     | 图标大小       | 16px                           |
| --nano-message-icon-margin   | 图标外边距     | 10px                           |
| --nano-message-close-size    | 关闭按钮大小   | 16px                           |
| --nano-message-close-margin  | 关闭按钮外边距 | 0 0 0 12px                     |
| --nano-message-shadow        | 阴影           | 0 2px 12px rgba(0, 0, 0, 0.1)  |
