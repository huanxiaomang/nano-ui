import { Mutable, buildProps, definePropType } from '@nano-ui/shared';

import type { AppContext, ExtractPropTypes, VNode } from 'vue';

export const notificationTypes = [
  'success',
  'info',
  'warning',
  'error',
] as const;

export type NotificationType = (typeof notificationTypes)[number];

export const notificationPositions = [
  'top-right',
  'top-left',
  'bottom-right',
  'bottom-left',
] as const;

export type NotificationPosition = (typeof notificationPositions)[number];

export const notificationProps = buildProps({
  position: {
    type: String,
    values: notificationPositions,
    default: 'top-right',
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: false,
  },
  duration: {
    type: Number,
    default: 3000,
  },
  icon: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    default: '',
  },
  onClick: {
    type: definePropType<() => void>(Function),
    default: () => undefined,
  },
  onClose: {
    type: definePropType<() => void>(Function),
    default: undefined,
  },
  showClose: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    values: notificationTypes,
    default: 'info',
  },
  title: {
    type: String,
    default: '',
  },
  zIndex: {
    type: Number,
    default: null,
  },
  message: {
    type: definePropType<string | VNode | (() => VNode)>([
      String,
      Object,
      Function,
    ]),
    default: '',
  },
  topOffset: {
    type: Number,
    default: 16,
  },
} as const);
export type NotificationProps = ExtractPropTypes<typeof notificationProps>;

export const notificationEmits = {
  destroy: () => true,
};
export type NotificationEmits = typeof notificationEmits;

export type NotificationOptions = Partial<
  Mutable<
    Omit<NotificationProps, 'id'> & {
      appendTo?: HTMLElement | string;
    }
  >
>;

export interface NotificationConfigContext {
  max?: number;
  duration?: number;
  topOffset?: number;
  showClose?: boolean;
}

export type NotificationOptionsTyped = Omit<NotificationOptions, 'type'>;

export type NotificationParams = Partial<NotificationOptions> | string | VNode;
export type NotificationParamsTyped =
  | Partial<NotificationOptionsTyped>
  | string
  | VNode;

export type NotificationOptionsNormalized = NotificationOptions & {
  appendTo: HTMLElement;
  position: NotificationPosition;
};

export type NotificationHandler = {
  close: () => void;
};

export interface NotifyFn {
  (
    options: NotificationParams,
    appContext?: null | AppContext
  ): NotificationHandler;
  closeAll: (type: NotificationType) => void;
}

export type NotifyTypedFn = (
  options?: NotificationParamsTyped,
  appContext?: null | AppContext
) => NotificationHandler;

export interface Notify extends NotifyFn {
  success: NotifyTypedFn;
  warning: NotifyTypedFn;
  error: NotifyTypedFn;
  info: NotifyTypedFn;
}
