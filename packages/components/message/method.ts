import { isVNode } from 'vue';
import { fromPairs, isNumber, isString } from 'lodash-unified';
import {
  CreateToastContext,
  createToastFn,
} from '@nano-ui/shared/component/toast/createToast';
import { useGlobalConfig } from '../config-provider/hooks/use-global-config';
import {
  Message,
  MessageFn,
  MessageProps,
  type MessageType,
  messageProps,
  messageTypes,
} from './message';
import { closeMessage, instances } from './instance';
import MessageConstructor from './message.vue';

const toastContext: CreateToastContext = {
  componentConstructor: MessageConstructor,
  onInstanceClose: (id) => closeMessage(id),
};

const createMessage = createToastFn<MessageProps>(toastContext);

// const createMessage = (
//   { appendTo, ...options }: MessageOptionsNormalized,
//   context: AppContext | null
// ): MessageContext => {
//   const id = `nano_message-${seed++}`;
//   const userOnClose = options.onClose;
//   const container = document.createElement('div');

//   const props = {
//     ...options,
//     id,
//     onClose: () => {
//       userOnClose?.();
//       closeMessage(id);
//     },
//     onDestroy: () => {
//       render(null, container);
//       return true;
//     },
//   };

//   const vnode = createVNode(
//     MessageConstructor,
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

//   const handler: MessageHandler = {
//     // 这里不要直接调用props.onClose，否则内部声明周期过程会被跳过
//     close: () => vm.exposed!.close(),
//   };

//   const instance: MessageContext = {
//     id,
//     vnode,
//     vm,
//     handler,
//     props: (vnode.component as any).props,
//   };

//   return instance;
// };

const message: MessageFn & Partial<Message> = (options, appContext = null) => {
  const messageConfig = useGlobalConfig('message');
  if (isString(options) || isVNode(options)) {
    options = { message: options };
  }
  const messageDefaults = fromPairs(
    Object.entries(messageProps).map(([key, prop]) => [key, prop.default])
  );
  const mergedOptions = {
    ...messageDefaults,
    ...(messageConfig.value ?? {}),
    ...options,
  };
  const max = messageConfig.value?.max;

  if (isNumber(max) && instances.length >= max) {
    return {
      close: () => void 0,
    };
  }

  const instance = createMessage(mergedOptions, appContext);

  instances.push(instance);

  return instance.handler;
};

messageTypes.forEach((type) => {
  message[type] = (options = {}, appContext) => {
    if (isString(options) || isVNode(options)) {
      options = { message: options };
    }
    return message({ ...options, type }, appContext);
  };
});

export function closeAll(type?: MessageType): void {
  for (let i = 0; i < instances.length; i++) {
    const instance = instances[i];
    if (!type || instance.props.type === type) {
      instance.handler.close();
      instances.splice(i, 1);
    }
  }
}

message.closeAll = closeAll;

export default message as Message;
