---
title: Notification 通知
description: 悬浮出现在页面角落的通知提醒
category: Feedback 反馈组件

next:
  link: /components/message-box
  text: MessageBox 消息弹框

prev:
  link: /components/message
  text: Message 消息提示
---

# Notification 通知

悬浮出现在页面角落的通知提醒，常用于较复杂的通知内容。

## 基础用法

适用性广泛的通知栏。

::: preview
demo-preview=../demo/notification/Basic.vue
:::

## 不同类型

用来显示「成功、警告、消息、错误」类的系统消息。

::: preview
demo-preview=../demo/notification/Types.vue
:::

## 自定义位置

可以让 Notification 从屏幕四角中的任意一角弹出。

::: preview
demo-preview=../demo/notification/Position.vue
:::

## 带有图标

带有图标让信息更加醒目。

::: preview
demo-preview=../demo/notification/WithIcon.vue
:::

## 隐藏关闭按钮

可以不显示关闭按钮。

::: preview
demo-preview=../demo/notification/HideClose.vue
:::

## 使用方式

### 全局方法

Notification 组件提供了全局方法 `$notify`，在 Vue 实例中可以作为 `this.$notify` 使用。

```ts
// 挂载全局方法
app.use(NanoUI);

// 使用方式
this.$notify({
  title: '标题',
  message: '这是一条通知',
});

// 或者
this.$notify.success({
  title: '成功',
  message: '这是一条成功的提示消息',
});
```

### 单独引用

```ts
import { NNotify } from 'nano-ui-vue';

// 基础用法
NNotify({
  title: '标题',
  message: '这是一条通知',
});

// 成功提示
NNotify.success({
  title: '成功',
  message: '这是一条成功的提示消息',
});

// 警告提示
NNotify.warning({
  title: '警告',
  message: '这是一条警告的提示消息',
});

// 错误提示
NNotify.error({
  title: '错误',
  message: '这是一条错误的提示消息',
});
```

## API

### Notification Options

| 名称      | 说明                                        | 类型                                                           | 默认值      |
| --------- | ------------------------------------------- | -------------------------------------------------------------- | ----------- |
| title     | 标题                                        | `string`                                                       | -           |
| message   | 通知内容                                    | `string \| VNode`                                              | -           |
| type      | 通知类型                                    | `'success' \| 'warning' \| 'info' \| 'error'`                  | 'info'      |
| duration  | 显示时间，单位为毫秒。设为 0 则不会自动关闭 | `number`                                                       | 4500        |
| position  | 自定义弹出位置                              | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | 'top-right' |
| showClose | 是否显示关闭按钮                            | `boolean`                                                      | true        |
| offset    | 偏移距离，单位为 px                         | `number`                                                       | 16          |
| onClick   | 点击通知时的回调函数                        | `() => void`                                                   | -           |
| onClose   | 关闭通知时的回调函数                        | `() => void`                                                   | -           |

### Notification 方法

调用 `NNotify` 会返回一个用于关闭通知的方法：

```ts
const close = NNotify({
  title: '标题',
  message: '这是一条通知',
});

// 关闭通知
close();
```

### 样式变量

| 变量名                                | 说明           | 默认值                           |
| ------------------------------------- | -------------- | -------------------------------- |
| --nano-notification-padding           | 内边距         | 14px 26px 14px 13px              |
| --nano-notification-width             | 宽度           | 330px                            |
| --nano-notification-border-radius     | 圆角           | var(--nano-border-radius-base)   |
| --nano-notification-shadow            | 阴影           | 0 4px 12px rgba(0, 0, 0, 0.15)   |
| --nano-notification-title-font-size   | 标题字体大小   | 16px                             |
| --nano-notification-content-font-size | 内容字体大小   | 14px                             |
| --nano-notification-icon-size         | 图标大小       | 24px                             |
| --nano-notification-close-size        | 关闭按钮大小   | 16px                             |
| --nano-notification-close-hover-color | 关闭按钮悬浮色 | var(--nano-text-color-secondary) |
