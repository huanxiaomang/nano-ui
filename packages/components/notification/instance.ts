import {
  ComponentInternalInstance,
  Reactive,
  VNode,
  shallowReactive,
} from 'vue';
import { Mutable } from '@nano-ui/shared';
import {
  NotificationHandler,
  NotificationPosition,
  NotificationProps,
} from './notification';

export type NotificationContext = {
  id: string;
  vnode: VNode;
  handler: NotificationHandler;
  vm: ComponentInternalInstance;
  props: Mutable<NotificationProps>;
};

export const notifications: Record<
  NotificationPosition,
  Reactive<NotificationContext[]>
> = {
  'top-left': shallowReactive([]),
  'top-right': shallowReactive([]),
  'bottom-left': shallowReactive([]),
  'bottom-right': shallowReactive([]),
};

export const getInstance = (
  id: string
): {
  current: NotificationContext | undefined;
  prev: NotificationContext | undefined;
} => {
  for (const instances of Object.values(notifications)) {
    const idx = instances.findIndex((instance) => instance.id === id);
    if (idx !== -1) {
      const current = instances[idx];
      let prev: NotificationContext | undefined;
      if (idx > 0) {
        prev = instances[idx - 1];
      }
      return { current, prev }; // 在找到后直接返回
    }
  }
  return {
    current: undefined,
    prev: undefined,
  };
};

export const getLastBottomOffset = (id: string): number => {
  const { prev } = getInstance(id);
  if (!prev) return 0;
  return prev.vm.exposed!.bottomOffset.value;
};

export const getOffset = (
  id: string,
  position: NotificationPosition,
  offset: number
) => {
  const isFirst =
    notifications[position].findIndex((instance) => instance.id === id) === -1;
  console.log(1, isFirst);
  return isFirst ? offset : 16;
};

export const closeNotification = (id: string) => {
  for (const instances of Object.values(notifications)) {
    const idx = instances.findIndex((instance) => instance.id === id);
    if (idx !== -1) {
      const { handler } = instances[idx];
      handler.close();
      instances.splice(idx, 1);
      break;
    }
  }
};
