import { AppContext, Component, createVNode, isVNode, render } from 'vue';
import { isElement, isFunction, isString } from 'lodash-unified';
import { debugWarn } from '../..';
import {
  ToastCompContext,
  ToastCompOptions,
  ToastCompPropType,
  ToastMessage,
} from './types';

export interface CreateToastContext {
  componentConstructor: Component;
  onInstanceClose?: (id: string) => any;
  onInstanceDestroy?: (id: string) => any;
  beforeInstanceClose?: (id: string) => any;
  beforeInstanceDestroy?: (id: string) => any;
}

const getAppendTo = <CompProp extends ToastCompPropType>(
  options: ToastCompOptions<CompProp>
): HTMLElement => {
  const { appendTo } = options;

  // 如果未提供 appendTo，直接返回 document.body
  if (!appendTo) {
    return document.body;
  }

  // 如果 appendTo 是字符串，尝试通过选择器查找元素
  if (isString(appendTo)) {
    const element = document.querySelector<HTMLElement>(appendTo);

    // 如果未找到元素或找到的元素不是 HTMLElement，发出警告并返回 document.body
    if (!element || !isElement(element)) {
      debugWarn(
        'NanoMessage',
        'The appendTo option is not a valid HTMLElement. Falling back to document.body.'
      );
      return document.body;
    }

    return element;
  }

  // 如果 appendTo 是 HTMLElement，直接返回
  if (isElement(appendTo)) {
    return appendTo;
  }

  // 其他情况（如无效类型），返回 document.body
  return document.body;
};

export const getMessageVNode = (message: ToastMessage | undefined) => {
  return isFunction(message) || isVNode(message)
    ? { default: isFunction(message) ? message : () => message }
    : null;
};

export const createToastFn = <CompProp extends ToastCompPropType>(
  toastContext: CreateToastContext
) => {
  let seed = 0;
  return (
    options: ToastCompOptions<CompProp>,
    context: AppContext | null
  ): ToastCompContext<CompProp> => {
    const {
      componentConstructor,
      onInstanceClose,
      onInstanceDestroy,
      beforeInstanceClose,
      beforeInstanceDestroy,
    } = toastContext;
    const id = `nano_${componentConstructor.name}-${seed++}`;
    const userOnClose = options.onClose;
    const container = document.createElement('div');

    const props = {
      ...options,
      id,
      onClose: () => {
        userOnClose?.();
        onInstanceClose?.(id);
      },
      onDestroy: () => {
        beforeInstanceDestroy?.(id);
        render(null, container);
        onInstanceDestroy?.(id);
        return true;
      },
    };

    const vnode = createVNode(
      componentConstructor,
      props,
      getMessageVNode(props.message)
    );
    vnode.appContext = context ?? null;

    render(vnode, container);

    const appendTo = getAppendTo(options);

    appendTo.appendChild(container.firstElementChild!);

    const vm = vnode.component!;

    const handler = {
      // 这里不要直接调用props.onClose，否则内部声明周期过程会被跳过
      close: () => {
        beforeInstanceClose?.(id);
        vm.exposed!.close();
      },
    };

    const instance = {
      id,
      vnode,
      vm,
      handler,
      props: (vnode.component as any).props,
    };

    return instance as ToastCompContext<CompProp>;
  };
};
