<script setup lang="ts">
import NButton from './../../packages/components/button/button.vue';
import NButtonGroup from './../../packages/components/button/button-group.vue';
import NIcon from './../../packages/components/icon/icon.vue';
import NAlert from './../../packages/components/alert/alert.vue';
import ConfigProvider from './../../packages/components/config-provider/config-provider.vue';
import { NMessage } from './../../packages/components/message';
import { NNotify } from './../../packages/components/notification';
import { en, ja, zhCn } from '@nano-ui/locale';
import NAvatar from './../../packages/components/avatar/avatar.vue';
</script>

<template>
  <div>
    <config-provider
      :locale="ja"
      :zIndex="6666"
      :message="{
        max: 10,
        showClose: true,
      }"
      :notification="{
        max: 10,
      }"
    >
    </config-provider>
    <div class="demo-button">
      <p>
        <n-button>Default</n-button>
        <n-button type="primary">Primary</n-button>
        <n-button type="success">Success</n-button>
        <n-button type="info">Info</n-button>
        <n-button type="warning">Warning</n-button>
        <n-button type="danger">Danger</n-button>
      </p>

      <p>
        <n-button plain>Plain</n-button>
        <n-button type="primary" plain>Primary</n-button>
        <n-button type="success" plain>Success</n-button>
        <n-button type="info" plain>Info</n-button>
        <n-button type="warning" plain>Warning</n-button>
        <n-button type="danger" plain>Danger</n-button>
      </p>

      <p>
        <n-button round>Round</n-button>
        <n-button type="primary" round>Primary</n-button>
        <n-button type="success" round>Success</n-button>
        <n-button type="info" round>Info</n-button>
        <n-button type="warning" round>Warning</n-button>
        <n-button type="danger" round>Danger</n-button>
      </p>

      <p>
        <n-button icon="search" circle />
        <n-button type="primary" icon="edit" circle />
        <n-button type="success" icon="check" circle />
        <n-button type="info" icon="message" circle />
        <n-button type="warning" icon="star" circle />
        <n-button type="danger" icon="trash" circle />
      </p>
    </div>
    <div>
      <!-- Success Alert with default configuration -->
      <n-alert
        title="Success Alert"
        description="This is a success alert with default configuration."
        type="success"
        closable
        effect="light"
        center
        showIcon
      />
      <n-alert
        title="Success Alert"
        description="This is a success alert with default configuration."
        type="success"
        closable
        effect="dark"
        center
        showIcon
      />
      <!-- Info Alert with custom description -->
      <n-alert
        title="Info Alert"
        description="This is an info alert with a custom description."
        type="info"
        closable
        center
        showIcon
      />
      <n-alert
        title="Info Alert"
        description="This is an info alert with a custom description."
        type="info"
        closable
        center
        showIcon
        effect="dark"
      />
      <!-- Warning Alert with no icon and no center alignment -->
      <n-alert
        title="Warning Alert"
        description="This is a warning alert without an icon and centered text."
        type="warning"
        closable
        effect="light"
      />
      <n-alert
        title="Warning Alert"
        description="This is a warning alert without an icon and centered text."
        type="warning"
        closable
        effect="dark"
      />
      <!-- Danger Alert with no closable -->
      <n-alert
        title="Danger Alert"
        description="This is a danger alert without a close button."
        type="danger"
        effect="light"
        center
        showIcon
      />
      <n-alert
        title="Danger Alert"
        description="This is a danger alert without a close button."
        type="danger"
        effect="dark"
        center
        showIcon
      />

      <!-- Success Alert with custom title -->
      <n-alert
        title="Custom Success Alert"
        description="This is a custom success alert."
        type="success"
        closable
        effect="light"
        center
        showIcon
      />
      <n-alert
        title="Custom Success Alert"
        description="This is a custom success alert."
        type="success"
        closable
        effect="dark"
        center
        showIcon
      />
    </div>
    <n-button-group type="primary" disabled size="small">
      <n-button type="primary" icon="share">--nano-button1</n-button>
      <n-button type="primary" icon="share">--nano-button2</n-button>
      <n-button type="primary" icon="share">--nano-button3</n-button>
      <n-button type="primary" icon="share">--nano-button4</n-button>
    </n-button-group>
    <div>默认按钮，primary 类型</div>
    <n-icon icon="share" />
    <n-button type="primary" icon="share" @click="console.log(1)">
      --nano-button1
    </n-button>

    <div>禁用按钮</div>
    <n-button :disabled="true">Button</n-button>

    <div>带图标的按钮</div>
    <n-button type="" icon="check-circle">按钮11你</n-button>

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
    <n-button tag="a" href="baod">--nano-button</n-button>

    <h3>基础用法</h3>
    <div class="demo-avatar">
      <n-avatar>U</n-avatar>
      <n-avatar src="https://avatars.githubusercontent.com/u/113403693?v=4" />
      <n-avatar icon="user" />
    </div>

    <h3>不同尺寸</h3>
    <div class="demo-avatar">
      <n-avatar size="small">S</n-avatar>
      <n-avatar>D</n-avatar>
      <n-avatar size="large">L</n-avatar>
      <n-avatar :size="60">60</n-avatar>
    </div>

    <h3>不同形状</h3>
    <div class="demo-avatar">
      <n-avatar shape="circle">圆</n-avatar>
      <n-avatar shape="square">方</n-avatar>
    </div>

    <h3>图标头像</h3>
    <div class="demo-avatar">
      <n-avatar icon="user" />
      <n-avatar icon="star" type="primary" />
      <n-avatar icon="heart" type="success" />
      <n-avatar icon="bell" type="warning" />
      <n-avatar icon="trash" type="danger" />
    </div>
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

.demo-avatar {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid var(--nano-border-color-lighter);
  border-radius: var(--nano-border-radius-base);
}

h3 {
  margin: 20px 0 10px;
  color: var(--nano-text-color-primary);
  font-weight: 500;
}
</style>
