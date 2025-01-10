<script setup lang="ts"></script>

<template>
  <div>
    <div>默认按钮，primary 类型</div>
    <n-button type="success" round>--nano-button</n-button>

    <div>禁用按钮</div>
    <n-button disabled>Button</n-button>

    <div>带图标的按钮</div>
    <n-button type="primary" icon="check-circle">按钮11你</n-button>

    <div>加载中状态按钮</div>
    <n-button type="primary" loading>button</n-button>

    <div>纯按钮，plain 类型</div>
    <n-button plain>--nano-button</n-button>

    <div>链接按钮</div>
    <n-button link type="primary">--nano-button</n-button>

    <div>背景色始终开启</div>
    <n-button bg>--nano-button</n-button>

    <div>自动聚焦按钮</div>
    <n-button autofocus>--nano-button</n-button>

    <div>圆角按钮</div>
    <n-button type="primary">--nano-button</n-button>

    <div>圆形按钮</div>
    <n-button circle a>--nano-button</n-button>

    <div>自定义颜色按钮</div>
    <n-button color="#ff5733">--nano-button</n-button>

    <div>深色模式按钮</div>
    <n-button dark>--nano-button</n-button>

    <div>自定义标签按钮</div>
    <n-button tag="a" href="#">--nano-button</n-button>

    <div>禁用按钮，plain 类型</div>
    <n-button plain disabled>--nano-button</n-button>

    <div>按钮，带加载图标</div>
    <n-button loading loadingIcon="spinner">--nano-button</n-button>

    <div>自定义原生按钮类型</div>
    <n-button nativeType="submit">--nano-button</n-button>

    <div>带图标和文字的按钮</div>
    <n-button icon="check-circle" loading>--nano-button</n-button>

    <div>文字按钮，链接，背景开启</div>
    <n-button text link bg>--nano-button</n-button>

    <div>圆角按钮，带自定义颜色</div>
    <n-button round color="#ff5733">--nano-button</n-button>

    <div>深色模式按钮，带图标</div>
    <n-button dark icon="check-circle">--nano-button</n-button>

    <div>自动插入空格按钮，plain</div>
    <n-button plain autoInsertSpace>--nano-button</n-button>

    <div>自定义标签，a标签按钮</div>
    <n-button tag="a" href="#">--nano-button</n-button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
