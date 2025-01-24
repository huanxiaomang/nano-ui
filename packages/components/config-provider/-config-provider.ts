import {
  Ref,
  defineComponent,
  getCurrentInstance,
  renderSlot,
  watch,
} from 'vue';
import { configProviderProps } from './type';
import { provideGlobalConfig } from './hooks/provide-global-config';
import { ConfigProviderContext } from '.';

const ConfigProvider = defineComponent({
  name: 'NanoConfigProvider',
  props: configProviderProps,

  setup(props, { slots }) {
    let config: Ref<ConfigProviderContext>;
    watch(
      () => props.message || props.notification,
      () => {
        config = provideGlobalConfig(props);
        console.log(getCurrentInstance());
      },
      { immediate: true, deep: true }
    );
    return () => {
      return renderSlot(slots, 'default', { config });
    };
  },
});

export default ConfigProvider;
