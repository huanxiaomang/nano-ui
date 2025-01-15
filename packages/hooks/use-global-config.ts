import { reactive, ref } from 'vue';
import { MessageConfigContext } from '@nano-ui/components/message';

const zIndex = ref(3000);
export const messageConfig = reactive<MessageConfigContext>({
  max: 500,
});

export function useGlobalComponentSettings() {
  const nextZIndex = () => zIndex.value++;

  return {
    currZIndex: zIndex,
    nextZIndex,
    messageConfig,
  };
}
