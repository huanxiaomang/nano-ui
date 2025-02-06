---
title: Avatar 头像
description: 用于展示用户头像、图标或文字的组件
category: Basic 基础组件

next:
  link: /components/button
  text: Button 按钮

prev:
  link: /components/alert
  text: Alert 警告
---

# Avatar 头像

Avatar 组件用于展示用户头像、图标或文字的场景。

## 基础用法

支持三种类型：图片、图标和文字。

::: preview
demo-preview=../demo/avatar/Basic.vue
:::

## 不同尺寸

Avatar 组件提供三种尺寸：small、default、large，也支持自定义尺寸。

::: preview
demo-preview=../demo/avatar/Size.vue
:::

## 不同形状

Avatar 支持两种形状：circle(默认)、square。

::: preview
demo-preview=../demo/avatar/Shape.vue
:::

## 图标头像

可以使用 icon 属性来显示不同类型的图标。

::: preview
demo-preview=../demo/avatar/Icon.vue
:::

## 图片填充

当使用图片作为头像时，可以设置 fit 来指定图片的填充方式。

::: preview
demo-preview=../demo/avatar/Fit.vue
:::

## API

### Props

| 名称  | 说明                                                | 类型                                                       | 默认值  |
| ----- | --------------------------------------------------- | ---------------------------------------------------------- | ------- |
| size  | 头像大小，可选值为 small、default、large 或具体数字 | `'small' \| 'default' \| 'large' \| number`                | default |
| shape | 头像形状                                            | `'circle' \| 'square'`                                     | circle  |
| icon  | 设置头像的图标类型                                  | `string`                                                   | -       |
| src   | 图片头像的资源地址                                  | `string`                                                   | -       |
| alt   | 图片头像的替代文本                                  | `string`                                                   | -       |
| fit   | 当展示类型为图片时，设置图片如何适应容器            | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | cover   |

### Events

| 事件名 | 说明                       | 类型                 |
| ------ | -------------------------- | -------------------- |
| error  | 图片类型头像加载失败时触发 | `(e: Event) => void` |

### Slots

| 插槽名  | 说明           | 作用域参数 |
| ------- | -------------- | ---------- |
| default | 自定义头像内容 | -          |

### 样式变量

| 变量名                          | 说明                   | 默认值                         |
| ------------------------------- | ---------------------- | ------------------------------ |
| --nano-avatar-bg-color          | 头像背景色             | var(--nano-fill-color-lighter) |
| --nano-avatar-text-color        | 头像文字颜色           | var(--nano-text-color-regular) |
| --nano-avatar-border-radius     | 方形头像的圆角大小     | var(--nano-border-radius-base) |
| --nano-avatar-size-large        | 大尺寸头像的大小       | 56px                           |
| --nano-avatar-size-default      | 默认尺寸头像的大小     | 40px                           |
| --nano-avatar-size-small        | 小尺寸头像的大小       | 24px                           |
| --nano-avatar-font-size-large   | 大尺寸头像的字体大小   | var(--nano-font-size-large)    |
| --nano-avatar-font-size-default | 默认尺寸头像的字体大小 | var(--nano-font-size-base)     |
| --nano-avatar-font-size-small   | 小尺寸头像的字体大小   | var(--nano-font-size-small)    |
| --nano-avatar-icon-size-large   | 大尺寸头像的图标大小   | 28px                           |
| --nano-avatar-icon-size-default | 默认尺寸头像的图标大小 | 20px                           |
| --nano-avatar-icon-size-small   | 小尺寸头像的图标大小   | 12px                           |
