import { defineComponent, renderSlot, watch } from 'vue';
import { configProviderProps } from './type';
import { provideGlobalConfig } from './hooks/provide-global-config';

const ConfigProvider = defineComponent({
  name: 'NanoConfigProvider',
  props: configProviderProps,

  setup(props, { slots }) {
    watch(
      () => props.message || props.notification,
      () => {
        provideGlobalConfig(props);
      }
    );
    return () => renderSlot(slots, 'default');
  },
});

export default ConfigProvider;
