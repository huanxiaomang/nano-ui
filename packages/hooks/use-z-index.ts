import { Ref, computed, ref, unref } from 'vue';
import { useGlobalConfig } from './use-global-config';

export const zIndex = ref(0);

export const defaultInitialZIndex = 2000;

export default function useZIndex(
  isUseGlobalConfig = true,
  zIndexOverrides?: Ref<number | undefined> | undefined
) {
  const config = useGlobalConfig();
  zIndexOverrides = isUseGlobalConfig
    ? zIndexOverrides ?? ref(config.value?.zIndex) ?? undefined
    : zIndexOverrides;
  const _initVal = computed(
    () => unref(zIndexOverrides) ?? defaultInitialZIndex
  );
  const currZIndex = computed(() => zIndex.value + _initVal.value);

  const nextZIndex = () => {
    zIndex.value++;
    return currZIndex.value;
  };

  return {
    initialValue: _initVal,
    currZIndex,
    nextZIndex,
  };
}
