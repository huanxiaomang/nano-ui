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
import { globalConfig, mergeConfig, useGlobalConfig } from '@nano-ui/hooks';
import { ConfigProviderContext, configProviderContextKey } from '../constants';

export const provideGlobalConfig = (
  config: MaybeRef<ConfigProviderContext>,
  app?: App,
  global = false
): Ref<ConfigProviderContext> => {
  const inSetup = !!getCurrentInstance();
  const oldConfig = inSetup ? useGlobalConfig() : undefined;

  const provideFn = app?.provide ?? (inSetup ? provide : undefined);
  if (!provideFn) {
    debugWarn(
      'provideGlobalConfig',
      'provideGlobalConfig() can only be used inside setup() when the app parameter is not provided.'
    );

    return ref({});
  }

  const context = computed(() => {
    const configRaw = unref(config);
    if (!oldConfig?.value) return configRaw;
    return mergeConfig(oldConfig.value, configRaw);
  });
  provideFn(configProviderContextKey, context);

  if (global || !globalConfig.value) {
    globalConfig.value = context.value;
  }

  return context;
};
