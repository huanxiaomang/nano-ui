import { AppContext, createVNode, isVNode, render } from 'vue';
import {
  fromPairs,
  isElement,
  isFunction,
  isNumber,
  isString,
} from 'lodash-unified';
import { debugWarn } from '@nano-ui/shared';
import { notifyConfig } from '@nano-ui/hooks';
import {
  NotificationHandler,
  NotificationOptionsNormalized,
  NotificationParams,
  NotificationPosition,
  NotificationType,
  Notify,
  NotifyFn,
  notificationProps,
  notificationTypes,
} from './notification';
import NotificationConstructor from './notification.vue';
import {
  NotificationContext,
  closeNotification,
  notifications,
} from './instance';

let seed = 1;

const normalizeOptions = (
  options: NotificationParams
): NotificationOptionsNormalized => {
  const notifyDefaults = fromPairs(
    Object.entries(notificationProps).map(([key, prop]) => [key, prop.default])
  );
  if (isString(options) || isVNode(options)) {
    options = { message: options };
  }

  const normalized = {
    ...notifyDefaults,
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

const createNotification = (
  { appendTo, ...options }: NotificationOptionsNormalized,
  context: null | AppContext
): NotificationContext => {
  const id = `nano_notification-${seed++}`;
  const userOnClose = options.onClose;
  const container = document.createElement('div');

  const props = {
    ...options,
    id,
    onClose: () => {
      userOnClose?.();
      closeNotification(id);
    },
    onDestroy: () => {
      render(null, container);
      return true;
    },
  };

  const vnode = createVNode(
    NotificationConstructor,
    props,
    isFunction(props.message) || isVNode(props.message)
      ? {
          default: isFunction(props.message)
            ? props.message
            : () => props.message,
        }
      : null
  );
  vnode.appContext = context ?? null;

  render(vnode, container);
  appendTo.appendChild(container.firstElementChild!);

  const vm = vnode.component!;

  const handler: NotificationHandler = {
    // 这里不要直接调用props.onClose，否则内部声明周期过程会被跳过
    close: () => vm.exposed!.close(),
  };

  const instance: NotificationContext = {
    id,
    vnode,
    vm,
    handler,
    props: (vnode.component as any).props,
  };

  return instance;
};

const notify: NotifyFn & Partial<Notify> = (options, appContext = null) => {
  const normalized = normalizeOptions(options);
  const { position } = normalized;

  if (
    isNumber(notifyConfig.max) &&
    notifications[position].length >= notifyConfig.max
  ) {
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
    const normalized = normalizeOptions(options);
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
