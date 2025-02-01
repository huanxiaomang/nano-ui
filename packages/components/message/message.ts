import { type AppContext, type ExtractPropTypes, type VNode } from 'vue';
import { Mutable, buildProps, definePropType } from '@nano-ui/shared';

export const messageTypes = ['success', 'info', 'warning', 'error'] as const;

export type MessageType = (typeof messageTypes)[number];

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
  offset: {
    type: Number,
    default: 16,
  },
} as const);
export type MessageProps = ExtractPropTypes<typeof messageProps>;

export const messageEmits = {
  destroy: () => true,
};
export type MessageEmits = typeof messageEmits;

export type MessageOptions = Partial<
  Mutable<
    Omit<MessageProps, 'id'> & {
      appendTo?: HTMLElement | string;
    }
  >
>;

export type MessageOptionsNormalized = MessageOptions & {
  appendTo: HTMLElement;
};
export type MessageOptionsTyped = Omit<MessageOptions, 'type'>;

export type MessageParams = Partial<MessageOptions> | string | VNode;
export type MessageParamsTyped = Partial<MessageOptionsTyped> | string | VNode;

export interface MessageConfigContext {
  max?: number;
  duration?: number;
  offset?: number;
  showClose?: boolean;
}

export type MessageHandler = {
  close: () => void;
};

export type MessageFn = {
  (options: MessageParams, appContext?: null | AppContext): MessageHandler;
  closeAll: (type: MessageType) => void;
};

export type MessageTypedFn = (
  options?: MessageParamsTyped,
  appContext?: null | AppContext
) => MessageHandler;

export interface Message extends MessageFn {
  success: MessageTypedFn;
  warning: MessageTypedFn;
  info: MessageTypedFn;
  error: MessageTypedFn;
}
