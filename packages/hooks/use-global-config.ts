import { Ref, computed, getCurrentInstance, inject, ref } from 'vue';
import { isObject } from 'lodash-unified';
import {
  ConfigProviderContext,
  configProviderContextKey,
} from '@nano-ui/components/config-provider/constants';
import { keysOf } from '@nano-ui/shared';

export const globalConfig = ref<ConfigProviderContext>({});

export function useGlobalConfig(): Ref<ConfigProviderContext>;
export function useGlobalConfig<
  K extends keyof ConfigProviderContext,
  D extends ConfigProviderContext[K]
>(
  key: K,
  defaultValue?: D
): Ref<Exclude<ConfigProviderContext[K], undefined> | D>;
export function useGlobalConfig(
  key?: keyof ConfigProviderContext,
  defaultValue = undefined
) {
  const config = getCurrentInstance()
    ? inject(configProviderContextKey, globalConfig)
    : globalConfig;
  if (!key) return config;
  return computed(() => config.value?.[key] ?? defaultValue);
}

export const mergeConfig = (
  ...configs: ConfigProviderContext[]
): ConfigProviderContext => {
  const merge = (a: object, b: object): object => {
    const allKeys = [...new Set([...keysOf(a), ...keysOf(b)])];
    const mergedConfig: Record<string, any> = {};

    allKeys.forEach((key) => {
      if (isObject(mergedConfig[key])) {
        mergedConfig[key] = merge(a[key], b[key]);
      } else {
        mergedConfig[key] = b[key] !== undefined ? b[key] : a[key];
      }
    });

    return mergedConfig;
  };
  return configs.reduce(
    (finalConfig, config) => merge(finalConfig, config),
    {}
  );
};
