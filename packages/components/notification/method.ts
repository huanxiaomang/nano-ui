import { isVNode } from 'vue';
import { fromPairs, isNumber, isString } from 'lodash-unified';
import { useGlobalConfig } from '@nano-ui/hooks';
import {
  CreateToastContext,
  createToastFn,
} from '@nano-ui/shared/component/toast/createToast';
import {
  NotificationPosition,
  NotificationProps,
  NotificationType,
  Notify,
  NotifyFn,
  notificationProps,
  notificationTypes,
} from './notification';
import NotificationConstructor from './notification.vue';
import { closeNotification, notifications } from './instance';

const toastContext: CreateToastContext = {
  componentConstructor: NotificationConstructor,
  onInstanceClose: (id) => closeNotification(id),
};

const createNotification = createToastFn<NotificationProps>(toastContext);

// const createNotification = (
//   { appendTo, ...options }: NotificationOptionsNormalized,
//   context: null | AppContext
// ): NotificationContext => {
//   const id = `nano_notification-${seed++}`;
//   const userOnClose = options.onClose;
//   const container = document.createElement('div');

//   const props = {
//     ...options,
//     id,
//     onClose: () => {
//       userOnClose?.();
//       closeNotification(id);
//     },
//     onDestroy: () => {
//       render(null, container);
//       return true;
//     },
//   };

//   const vnode = createVNode(
//     NotificationConstructor,
//     props,
//     isFunction(props.message) || isVNode(props.message)
//       ? {
//           default: isFunction(props.message)
//             ? props.message
//             : () => props.message,
//         }
//       : null
//   );
//   vnode.appContext = context ?? null;

//   render(vnode, container);
//   appendTo.appendChild(container.firstElementChild!);

//   const vm = vnode.component!;

//   const handler: NotificationHandler = {
//     // 这里不要直接调用props.onClose，否则内部声明周期过程会被跳过
//     close: () => vm.exposed!.close(),
//   };

//   const instance: NotificationContext = {
//     id,
//     vnode,
//     vm,
//     handler,
//     props: (vnode.component as any).props,
//   };

//   return instance;
// };

const notify: NotifyFn & Partial<Notify> = (options, appContext = null) => {
  const notifyConfig = useGlobalConfig('notification');
  if (isString(options) || isVNode(options)) {
    options = { message: options };
  }
  const notifyDefaults = fromPairs(
    Object.entries(notificationProps).map(([key, prop]) => [key, prop.default])
  );
  const mergedOptions = {
    ...notifyDefaults,
    ...(notifyConfig.value ?? {}),
    ...options,
  };
  const { position } = mergedOptions;
  const max = notifyConfig.value?.max;

  if (isNumber(max) && notifications[position!].length >= max) {
    return {
      close: () => void 0,
    };
  }

  const instance = createNotification(mergedOptions, appContext);

  notifications[position!].push(instance);

  return instance.handler;
};

notificationTypes.forEach((type) => {
  notify[type] = (options = {}, appContext) => {
    if (isString(options) || isVNode(options)) {
      options = { message: options };
    }
    return notify({ ...options, type }, appContext);
  };
});

export function closeAll(
  type?: NotificationType,
  position?: NotificationPosition
): void {
  for (const instances of Object.values(notifications)) {
    for (let i = 0; i < instances.length; i++) {
      const { props, handler } = instances[i];
      if (
        (!position && !type) ||
        props.position === position ||
        props.type === type
      ) {
        handler.close();
        instances.splice(i, 1);
        i--;
      }
    }
  }
}

notify.closeAll = closeAll;

export default notify as Notify;
