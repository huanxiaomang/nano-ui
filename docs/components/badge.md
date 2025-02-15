---
title: Badge 徽章
description: 出现在按钮、图标旁的数字或状态标记。
category: Basic 基础组件
---

# Badge 徽章

出现在按钮、图标旁的数字或状态标记。

## 基础用法

展示新消息数量。

::: preview
demo-preview=../demo/badge/Basic.vue
:::

## 最大值

可自定义最大值。

::: preview
demo-preview=../demo/badge/Max.vue
:::

## 自定义内容

可以显示数字以外的文本内容。

::: preview
demo-preview=../demo/badge/Custom.vue
:::

## 小圆点

以红点的形式标注需要关注的内容。

::: preview
demo-preview=../demo/badge/Dot.vue
:::

## 不同位置

可以在组件的四个角显示徽章。

::: preview
demo-preview=../demo/badge/Position.vue
:::

## API

### Props

| 名称     | 说明     | 类型                                                           | 默认值      |
| -------- | -------- | -------------------------------------------------------------- | ----------- |
| value    | 显示值   | `string \| number`                                             | ''          |
| max      | 最大值   | `number`                                                       | 99          |
| type     | 类型     | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'`    | 'danger'    |
| is-dot   | 小圆点   | `boolean`                                                      | false       |
| hidden   | 隐藏标记 | `boolean`                                                      | false       |
| position | 位置     | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | 'top-right' |

### Slots

| 插槽名  | 说明       |
| ------- | ---------- |
| default | 徽章的内容 |

### 样式变量

| 变量名                     | 说明     | 默认值                   |
| -------------------------- | -------- | ------------------------ |
| --nano-badge-bg-color      | 背景颜色 | var(--nano-color-danger) |
| --nano-badge-text-color    | 文字颜色 | var(--nano-color-white)  |
| --nano-badge-font-size     | 字体大小 | 12px                     |
| --nano-badge-size          | 徽章大小 | 18px                     |
| --nano-badge-dot-size      | 圆点大小 | 8px                      |
| --nano-badge-padding       | 内边距   | 0 6px                    |
| --nano-badge-border-radius | 圆角大小 | 10px                     |
