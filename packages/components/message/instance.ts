import { shallowReactive } from 'vue';
import { ToastCompContext } from '@nano-ui/shared/component/toast';
import { MessageProps } from './message';

export type MessageContext = ToastCompContext<MessageProps>;

export const instances: MessageContext[] = shallowReactive([]);

export const getInstance = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id);
  const current = instances[idx];
  let prev: MessageContext | undefined;
  if (idx > 0) {
    prev = instances[idx - 1];
  }
  return { current, prev };
};

export const getLastBottomOffset = (id: string): number => {
  const { prev } = getInstance(id);
  if (!prev) return 0;
  return prev.vm.exposed!.bottomOffset.value;
};

export const getOffset = (id: string, offset: number) => {
  const isFirst = instances.findIndex((instance) => instance.id === id) === -1;
  return isFirst ? offset : 16;
};

export const closeMessage = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id);
  if (idx === -1) return;

  const { handler } = instances[idx];
  handler.close();
  instances.splice(idx, 1);
};
