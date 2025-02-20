import {
  App,
  Ref,
  computed,
  getCurrentInstance,
  provide,
  ref,
  unref,
} from 'vue';
import { MaybeRef } from '@vueuse/core';
import { debugWarn } from '@nano-ui/shared';
import { ConfigProviderContext, configProviderContextKey } from '../constants';
import {
  globalConfig,
  mergeConfig,
  useGlobalConfig,
} from './use-global-config';
export const provideGlobalConfig = (
  config: MaybeRef<ConfigProviderContext>,
  app?: App,
  global = false
): Ref<ConfigProviderContext> => {
  const inSetup = !!getCurrentInstance();
  const oldConfig = inSetup ? useGlobalConfig() : undefined;
  const configRaw = unref(config);

  const provideFn = app?.provide ?? (inSetup ? provide : undefined);
  if (!provideFn) {
    debugWarn(
      'provideGlobalConfig',
      'provideGlobalConfig() can only be used inside setup() when the app parameter is not provided.'
    );

    return ref({});
  }

  const context = computed(() => {
    if (!oldConfig?.value) return configRaw;
    return mergeConfig(oldConfig.value, configRaw);
  });
  provideFn(configProviderContextKey, context);

  if (global || !globalConfig.value) {
    globalConfig.value = context.value;
  }

  globalConfig.value = mergeConfig(
    globalConfig.value,
    { message: configRaw.message ?? {} },
    { notification: configRaw.notification ?? {} }
  );

  return context;
};
