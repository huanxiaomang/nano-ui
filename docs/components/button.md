---
title: Button 按钮
description: 常用的操作按钮
category: Basic 基础组件

next:
  link: /components/input
  text: Input 输入框

prev:
  link: /get-started
  text: 快速开始
---

# Button 按钮

常用的操作按钮。

## 基础用法

基础的按钮用法。使用 `type`、`plain`、`round` 和 `circle` 属性来定义按钮的样式。

::: preview
demo-preview=../demo/button/Basic.vue
:::

## 禁用状态

你可以使用 `disabled` 属性来定义按钮是否被禁用。

::: preview
demo-preview=../demo/button/Disabled.vue
:::

## 图标按钮

带图标的按钮可增强辨识度（有文字）或节省空间（无文字）。

::: preview
demo-preview=../demo/button/Icon.vue
:::

## 按钮组

以按钮组的方式出现，常用于多项类似操作。使用 `<n-button-group>` 标签来嵌套你的按钮。

::: preview
demo-preview=../demo/button/Group.vue
:::

## 加载中

点击按钮后进行数据加载操作，在按钮上显示加载状态。

::: preview
demo-preview=../demo/button/Loading.vue
:::

## 不同尺寸

除了默认尺寸，按钮组件还提供了额外的尺寸供选择。

::: preview
demo-preview=../demo/button/Size.vue
:::

## API

### Button Props

| 名称        | 说明           | 类型                                                        | 默认值    |
| ----------- | -------------- | ----------------------------------------------------------- | --------- |
| type        | 类型           | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | -         |
| size        | 尺寸           | `'large' \| 'default' \| 'small'`                           | 'default' |
| plain       | 是否朴素按钮   | `boolean`                                                   | false     |
| round       | 是否圆角按钮   | `boolean`                                                   | false     |
| circle      | 是否圆形按钮   | `boolean`                                                   | false     |
| loading     | 是否加载中状态 | `boolean`                                                   | false     |
| disabled    | 是否禁用状态   | `boolean`                                                   | false     |
| icon        | 图标组件       | `string`                                                    | -         |
| autofocus   | 是否默认聚焦   | `boolean`                                                   | false     |
| native-type | 原生 type 属性 | `'button' \| 'submit' \| 'reset'`                           | 'button'  |

### Button Events

| 事件名 | 说明               | 类型                          |
| ------ | ------------------ | ----------------------------- |
| click  | 点击按钮时触发     | `(event: MouseEvent) => void` |
| focus  | 按钮获得焦点时触发 | `(event: FocusEvent) => void` |
| blur   | 按钮失去焦点时触发 | `(event: FocusEvent) => void` |

### Button Slots

| 插槽名  | 说明             | 作用域参数 |
| ------- | ---------------- | ---------- |
| default | 按钮的内容       | -          |
| icon    | 自定义图标       | -          |
| loading | 自定义加载中图标 | -          |

### Button Expose

| 名称  | 说明           | 类型                     |
| ----- | -------------- | ------------------------ |
| ref   | 按钮元素的引用 | `Ref<HTMLButtonElement>` |
| focus | 使按钮获得焦点 | `() => void`             |
| blur  | 使按钮失去焦点 | `() => void`             |

### Button Group Props

| 名称 | 说明                         | 类型                              | 默认值    |
| ---- | ---------------------------- | --------------------------------- | --------- |
| size | 用于控制该按钮组内按钮的大小 | `'large' \| 'default' \| 'small'` | 'default' |

### Button Group Slots

| 插槽名  | 说明                         | 作用域参数 |
| ------- | ---------------------------- | ---------- |
| default | 按钮组的内容，通常是多个按钮 | -          |

### 样式变量

| 变量名                              | 说明         | 默认值                             |
| ----------------------------------- | ------------ | ---------------------------------- |
| --nano-button-font-size             | 字体大小     | var(--nano-font-size-base)         |
| --nano-button-font-weight           | 字重         | 500                                |
| --nano-button-border-radius         | 圆角         | var(--nano-border-radius-base)     |
| --nano-button-padding-vertical      | 垂直内边距   | 8px                                |
| --nano-button-padding-horizontal    | 水平内边距   | 15px                               |
| --nano-button-hover-text-color      | 悬浮文字颜色 | var(--nano-color-primary)          |
| --nano-button-hover-bg-color        | 悬浮背景色   | var(--nano-color-primary-light-9)  |
| --nano-button-hover-border-color    | 悬浮边框色   | var(--nano-color-primary-light-7)  |
| --nano-button-active-text-color     | 激活文字颜色 | var(--nano-color-primary-dark-2)   |
| --nano-button-disabled-text-color   | 禁用文字颜色 | var(--nano-text-color-placeholder) |
| --nano-button-disabled-bg-color     | 禁用背景色   | var(--nano-fill-color-blank)       |
| --nano-button-disabled-border-color | 禁用边框色   | var(--nano-border-color-lighter)   |
