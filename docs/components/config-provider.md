---
title: ConfigProvider 全局配置
description: 为组件提供统一的全局配置
category: Basic 基础组件

next:
  link: /components/button
  text: Button 按钮

prev:
  link: /get-started
  text: 快速开始
---

# ConfigProvider 全局配置

ConfigProvider 组件提供了一个配置中心，承载应用所需的全局配置。

## 基础用法

通过 ConfigProvider 包裹应用，可以配置语言、消息提示等全局属性。

::: preview
demo-preview=../demo/config-provider/Basic.vue
:::

## 国际化配置

通过 `locale` 属性可以配置组件内部文案的语言。Nano-UI 内置了中文、英文和日文的语言配置。

::: preview
demo-preview=../demo/config-provider/Locale.vue
:::

## 消息配置

通过 `message` 属性可以配置消息提示组件的默认行为。

::: preview
demo-preview=../demo/config-provider/Message.vue
:::

## 通知配置

通过 `notification` 属性可以配置通知组件的默认行为。

::: preview
demo-preview=../demo/config-provider/Notification.vue
:::

## API

### Props

| 名称         | 说明                        | 类型                        | 默认值 |
| ------------ | --------------------------- | --------------------------- | ------ |
| locale       | 翻译文本对象                | `Language`                  | -      |
| message      | Message 组件的全局配置      | `MessageConfigContext`      | -      |
| notification | Notification 组件的全局配置 | `NotificationConfigContext` | -      |
| zIndex       | 弹出类组件的初始 z-index    | `number`                    | 2000   |

### Slots

| 插槽名  | 说明     | 作用域参数                          |
| ------- | -------- | ----------------------------------- |
| default | 默认插槽 | `{ config: ConfigProviderContext }` |
