import {
  AppContext,
  Component,
  ComponentInternalInstance,
  VNode,
  createVNode,
  isVNode,
  render,
} from 'vue';
import { isFunction } from 'lodash-unified';
import { Mutable, definePropType } from '..';

export interface CreateToastContext {
  componentConstructor: Component;
  onInstanceClose?: (id: string) => any;
  onInstanceDestroy?: (id: string) => any;
  beforeInstanceClose?: (id: string) => any;
  beforeInstanceDestroy?: (id: string) => any;
}

export type ToastMessage = string | VNode | (() => VNode);

export const ToastMessagePropType = definePropType<ToastMessage>([
  String,
  Object,
  Function,
]);

export interface CompContext<CompProp> {
  id: string;
  vnode: VNode;
  handler: {
    close: () => void;
  };
  vm: ComponentInternalInstance;
  props: Mutable<CompProp>;
}

export const createToastFn = <
  CompProp,
  CompOptions extends {
    message?: ToastMessage;
    onClose?: () => void;
    appendTo: HTMLElement;
  }
>(
  toastContext: CreateToastContext
) => {
  let seed = 0;
  return (
    { appendTo, ...options }: CompOptions,
    context: AppContext | null
  ): CompContext<CompProp> => {
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
        beforeInstanceClose?.(id);
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

    const getMessageVNode = (message: ToastMessage | undefined) => {
      return isFunction(message) || isVNode(message)
        ? { default: isFunction(message) ? message : () => message }
        : null;
    };

    const vnode = createVNode(
      componentConstructor,
      props,
      getMessageVNode(props.message)
    );
    vnode.appContext = context ?? null;

    render(vnode, container);
    appendTo.appendChild(container.firstElementChild!);

    const vm = vnode.component!;

    const handler = {
      // 这里不要直接调用props.onClose，否则内部声明周期过程会被跳过
      close: () => vm.exposed!.close(),
    };

    const instance = {
      id,
      vnode,
      vm,
      handler,
      props: (vnode.component as any).props,
    };

    return instance as CompContext<CompProp>;
  };
};
