import { AppContext, createVNode, isVNode, render } from 'vue';
import { fromPairs, isFunction, isNumber, isString } from 'lodash-unified';
import { debugWarn, isElement } from '@nano-ui/shared';
import { messageConfig } from '@nano-ui/hooks';
import {
  Message,
  MessageFn,
  MessageHandler,
  MessageOptions,
  MessageOptionsNormalized,
  type MessageType,
  messageProps,
  messageTypes,
} from './message';
import { MessageContext, closeMessage, instances } from './instance';
import MessageConstructor from './message.vue';

const normalizeOptions = (
  options: MessageOptions
): MessageOptionsNormalized => {
  const messageDefaults = fromPairs(
    Object.entries(messageProps).map(([key, prop]) => [key, prop.default])
  );
  const normalized = {
    ...messageDefaults,
    ...options,
  };

  if (!normalized.appendTo) {
    normalized.appendTo = document.body;
  } else if (isString(normalized.appendTo)) {
    let appendTo = document.querySelector<HTMLElement>(normalized.appendTo);

    if (!isElement) {
      debugWarn(
        'NanoMessage',
        'the appendTo option is not an HTMLElement. Falling back to document.body.'
      );
      appendTo = document.body;
    }

    normalized.appendTo = appendTo!;
  }

  return normalized as MessageOptionsNormalized;
};

let seed = 0;

const createMessage = (
  { appendTo, ...options }: MessageOptionsNormalized,
  context: AppContext | null
): MessageContext => {
  const id = `nano_message-${seed++}`;
  const userOnClose = options.onClose;
  const container = document.createElement('div');

  const props = {
    ...options,
    id,
    onClose: () => {
      userOnClose?.();
      closeMessage(id);
    },
    onDestroy: () => {
      render(null, container);
      return true;
    },
  };

  const vnode = createVNode(
    MessageConstructor,
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

  const handler: MessageHandler = {
    // 这里不要直接调用props.onClose，否则内部声明周期过程会被跳过
    close: () => vm.exposed!.close(),
  };

  const instance: MessageContext = {
    id,
    vnode,
    vm,
    handler,
    props: (vnode.component as any).props,
  };

  return instance;
};

const message: MessageFn & Partial<Message> = (options, appContext = null) => {
  const normalized = normalizeOptions(options);

  if (isNumber(messageConfig.max) && instances.length >= messageConfig.max) {
    return {
      close: () => void 0,
    };
  }

  const instance = createMessage(normalized, appContext);

  instances.push(instance);

  return instance.handler;
};

messageTypes.forEach((type) => {
  message[type] = (options = {}, appContext) => {
    const normalized = normalizeOptions(options);
    return message({ ...normalized, type }, appContext);
  };
});

export function closeAll(type?: MessageType): void {
  for (const instance of instances) {
    if (!type || instance.props.type === type) {
      instance.handler.close();
    }
  }
}

message.closeAll = closeAll;

export default message as Message;
