import { isVNode } from 'vue';
import { fromPairs, isElement, isNumber, isString } from 'lodash-unified';
import { debugWarn } from '@nano-ui/shared';
import { useGlobalConfig } from '@nano-ui/hooks';
import {
  CreateToastContext,
  createToastFn,
} from '@nano-ui/shared/component/createToast';
import {
  NotificationConfigContext,
  NotificationOptionsNormalized,
  NotificationParams,
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

const normalizeOptions = (
  options: NotificationParams,
  notificationConfig?: NotificationConfigContext
): NotificationOptionsNormalized => {
  const notifyDefaults = fromPairs(
    Object.entries(notificationProps).map(([key, prop]) => [key, prop.default])
  );
  if (isString(options) || isVNode(options)) {
    options = { message: options };
  }

  const normalized = {
    ...notifyDefaults,
    ...(notificationConfig ?? {}),
    ...options,
  };

  if (!normalized.appendTo) {
    normalized.appendTo = document.body;
  } else if (isString(normalized.appendTo)) {
    let appendTo = document.querySelector<HTMLElement>(normalized.appendTo);

    if (!isElement) {
      debugWarn(
        'NanoNotification',
        'the appendTo option is not an HTMLElement. Falling back to document.body.'
      );
      appendTo = document.body;
    }

    normalized.appendTo = appendTo!;
  }

  return normalized as NotificationOptionsNormalized;
};

const toastContext: CreateToastContext = {
  componentConstructor: NotificationConstructor,
  onInstanceClose: (id) => closeNotification(id),
};

const createNotification = createToastFn<
  NotificationOptionsNormalized,
  NotificationProps
>(toastContext);

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

  const normalized =
    notifyConfig.value !== undefined
      ? normalizeOptions(options, notifyConfig.value)
      : normalizeOptions(options);
  const { position } = normalized;
  const max = notifyConfig.value?.max;

  if (isNumber(max) && notifications[position].length >= max) {
    return {
      close: () => void 0,
    };
  }

  const instance = createNotification(normalized, appContext);

  notifications[position].push(instance);

  return instance.handler;
};

notificationTypes.forEach((type) => {
  notify[type] = (options = {}, appContext) => {
    const notifyConfig = useGlobalConfig('notification');
    const normalized =
      notifyConfig.value !== undefined
        ? normalizeOptions(options, notifyConfig.value)
        : normalizeOptions(options);
    return notify({ ...normalized, type }, appContext);
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
