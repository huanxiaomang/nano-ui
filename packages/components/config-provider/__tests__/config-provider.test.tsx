import { defineComponent, ref } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { useGlobalConfig } from '@nano-ui/hooks';
import { zhCn } from '@nano-ui/locale';
import ConfigProvider from '../config-provider.vue';

const TestComponent = defineComponent({
  setup() {
    const config = useGlobalConfig();
    return () => <div>{JSON.stringify(config.value)}</div>;
  },
});

describe('ConfigProvider', () => {
  describe('basic rendering', () => {
    it('renders default slot', () => {
      const wrapper = mount(() => (
        <ConfigProvider>
          <div>test content</div>
        </ConfigProvider>
      ));
      expect(wrapper.text()).toBe('test content');
    });

    it('provides config to slot', () => {
      const wrapper = mount(() => (
        <ConfigProvider
          zIndex={2000}
          v-slots={{
            default: ({ config }: { config: { zIndex: number } }) => (
              <div>{config.zIndex}</div>
            ),
          }}
        />
      ));
      expect(wrapper.text()).toBe('2000');
    });
  });

  describe('config inheritance', () => {
    it('provides locale config to child components', () => {
      const wrapper = mount(() => (
        <ConfigProvider locale={zhCn}>
          <TestComponent />
        </ConfigProvider>
      ));
      expect(wrapper.text()).toContain('"locale"');
    });

    it('provides message config to child components', () => {
      const messageConfig = {
        max: 3,
        duration: 3000,
        showClose: true,
      };
      const wrapper = mount(() => (
        <ConfigProvider message={messageConfig}>
          <TestComponent />
        </ConfigProvider>
      ));
      expect(wrapper.text()).toContain('"message"');
      expect(wrapper.text()).toContain('3000');
    });

    it('provides notification config to child components', () => {
      const notificationConfig = {
        duration: 4500,
        position: 'top-right' as const,
      };
      const wrapper = mount(() => (
        <ConfigProvider notification={notificationConfig}>
          <TestComponent />
        </ConfigProvider>
      ));
      expect(wrapper.text()).toContain('"notification"');
      expect(wrapper.text()).toContain('4500');
    });

    it('handles nested providers', () => {
      const wrapper = mount(() => (
        <ConfigProvider zIndex={2000}>
          <ConfigProvider zIndex={3000}>
            <TestComponent />
          </ConfigProvider>
        </ConfigProvider>
      ));
      expect(wrapper.text()).toContain('"zIndex":3000');
    });
  });

  describe('reactivity', () => {
    it('updates when zIndex changes', async () => {
      const zIndex = ref(2000);
      const wrapper = mount(() => (
        <ConfigProvider zIndex={zIndex.value}>
          <TestComponent />
        </ConfigProvider>
      ));

      expect(wrapper.text()).toContain('"zIndex":2000');

      zIndex.value = 3000;
      await wrapper.vm.$nextTick();
      expect(wrapper.text()).toContain('"zIndex":3000');
    });

    it('updates when message config changes', async () => {
      const duration = ref(3000);
      const wrapper = mount(() => (
        <ConfigProvider
          message={{
            duration: duration.value,
            showClose: true,
          }}
        >
          <TestComponent />
        </ConfigProvider>
      ));

      expect(wrapper.text()).toContain('3000');

      duration.value = 4500;
      await wrapper.vm.$nextTick();
      expect(wrapper.text()).toContain('4500');
    });
  });
});
