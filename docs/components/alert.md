---
title: Alert 警告
description: 用于页面中展示重要的提示信息
category: Feedback 反馈组件

next:
  link: /components/loading
  text: Loading 加载

prev:
  link: /components/dropdown
  text: Dropdown 下拉菜单
---

# Alert 警告

用于页面中展示重要的提示信息。

## 基础用法

Alert 组件不属于浮层元素，不会自动消失或关闭。Alert 组件提供四种类型，由 `type` 属性指定，为 `success | warning | danger | info`，默认值为 `info`。

::: preview
demo-preview=../demo/alert/Basic.vue
:::

## 主题

Alert 组件提供了两个不同的主题：`light` 和 `dark`。通过设置 `effect` 属性来改变主题，默认为 `light`。

::: preview
demo-preview=../demo/alert/Theme.vue
:::

## 可关闭的警告

可以设置 Alert 组件是否为可关闭状态，`closable` 属性决定 Alert 组件是否可关闭，该属性接受一个 `Boolean`，默认为 `false`。

::: preview
demo-preview=../demo/alert/Close.vue
:::

## 带有图标

通过设置 `show-icon` 属性来显示 Alert 的图标，这能更有效地向用户展示你的显示意图。

::: preview
demo-preview=../demo/alert/ShowIcon.vue
:::

## 文字居中

使用 `center` 属性让文字水平居中。

::: preview
demo-preview=../demo/alert/TextCenter.vue
:::

## 带有辅助性文字介绍

除了必填的 `title` 属性外，你可以设置 `description` 属性来帮助你更好地介绍，我们称之为辅助性文字。

::: preview
demo-preview=../demo/alert/Desc.vue
:::

## 带有图标和辅助性文字介绍

在具有辅助性文字介绍时，可以同时使用 `show-icon` 属性来展示图标。

::: preview
demo-preview=../demo/alert/IconDesc.vue
:::

## API

### Props

| 名称        | 说明         | 类型                                           | 默认值  |
| ----------- | ------------ | ---------------------------------------------- | ------- |
| title       | 标题         | `string`                                       | -       |
| type        | 类型         | `'success' \| 'warning' \| 'info' \| 'danger'` | 'info'  |
| description | 辅助性文字   | `string`                                       | -       |
| closable    | 是否可关闭   | `boolean`                                      | false   |
| center      | 文字是否居中 | `boolean`                                      | false   |
| show-icon   | 是否显示图标 | `boolean`                                      | false   |
| effect      | 主题         | `'light' \| 'dark'`                            | 'light' |

### Events

| 事件名 | 说明                    | 回调参数 |
| ------ | ----------------------- | -------- |
| close  | 关闭 Alert 时触发的事件 | -        |

### Slots

| 插槽名  | 说明       |
| ------- | ---------- |
| default | Alert 内容 |
| title   | 标题的内容 |

### 样式变量

| 变量名                         | 说明         | 默认值                         |
| ------------------------------ | ------------ | ------------------------------ |
| --nano-alert-padding           | 内边距       | 12px 16px                      |
| --nano-alert-margin            | 外边距       | 20px 0 0                       |
| --nano-alert-font-size         | 字体大小     | var(--nano-font-size-base)     |
| --nano-alert-line-height       | 行高         | 1.4                            |
| --nano-alert-border-radius     | 圆角         | var(--nano-border-radius-base) |
| --nano-alert-icon-size         | 图标大小     | 16px                           |
| --nano-alert-icon-margin       | 图标外边距   | 8px                            |
| --nano-alert-title-font-size   | 标题字体大小 | var(--nano-font-size-base)     |
| --nano-alert-title-line-height | 标题行高     | 24px                           |
| --nano-alert-title-font-weight | 标题字重     | 700                            |
| --nano-alert-desc-font-size    | 描述字体大小 | var(--nano-font-size-base)     |
| --nano-alert-desc-line-height  | 描述行高     | 21px                           |
| --nano-alert-desc-margin       | 描述外边距   | 5px 0 0                        |
| --nano-alert-close-size        | 关闭按钮大小 | 16px                           |
