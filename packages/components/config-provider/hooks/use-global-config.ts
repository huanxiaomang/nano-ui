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
  const merge = <T extends object, U extends object>(a: T, b: U): T & U => {
    const allKeys = [...new Set([...keysOf(a), ...keysOf(b)])] as (keyof (T &
      U))[];
    const mergedConfig = {} as T & U;

    allKeys.forEach((key) => {
      const aVal = a[key as keyof T];
      const bVal = b[key as keyof U];
      if (isObject(aVal) && isObject(bVal)) {
        mergedConfig[key] = merge(aVal, bVal) as any;
      } else {
        mergedConfig[key] = (bVal !== undefined ? bVal : aVal) as any;
      }
    });

    return mergedConfig;
  };
  return configs.reduce(
    (finalConfig, config) => merge(finalConfig, config),
    {} as ConfigProviderContext
  );
};
