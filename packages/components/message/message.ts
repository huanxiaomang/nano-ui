import { buildProps, definePropType } from '@nano-ui/shared';

import type { ExtractPropTypes, VNode } from 'vue';

export const messageTypes = ['success', 'info', 'warning', 'error'] as const;

export const messageProps = buildProps({
  center: {
    type: Boolean,
    default: false,
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
    values: messageTypes,
    default: 'info',
  },
  message: {
    type: definePropType<string | VNode | (() => VNode)>([
      String,
      Object,
      Function,
    ]),
    default: '',
  },
} as const);
export type MessageProps = ExtractPropTypes<typeof messageProps>;

export const messageEmits = {
  destroy: () => true,
};
export type MessageEmits = typeof messageEmits;

export interface MessageHandler {
  /**
   * @description close the Message
   */
  close: () => void;
}
