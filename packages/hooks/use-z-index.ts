import { Ref, computed, ref, unref } from 'vue';

const zIndex = ref(0);

export const defaultInitialZIndex = 2000;

export default function useZIndex(zIndexOverrides?: Ref<number>) {
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
