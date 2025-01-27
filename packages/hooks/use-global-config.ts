import { Ref, computed, getCurrentInstance, inject, ref } from 'vue';
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
  a: ConfigProviderContext,
  b: ConfigProviderContext
): ConfigProviderContext => {
  const keys = [...new Set([...keysOf(a), ...keysOf(b)])];
  return keys.reduce((finalConfig: Record<string, any>, key) => {
    finalConfig[key] = b[key] !== undefined ? b[key] : a[key];
    return finalConfig;
  }, {});
};
