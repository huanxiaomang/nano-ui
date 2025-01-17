import { buildProps, definePropType } from '@nano-ui/shared';

import type { ExtractPropTypes, VNode } from 'vue';

export const notificationTypes = [
  'success',
  'info',
  'warning',
  'error',
] as const;

export const notificationProps = buildProps({
  position: {
    type: String,
    values: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
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
  zIndex: Number,
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

export const notificationEmits = {};
export type NotificationEmits = typeof notificationEmits;
