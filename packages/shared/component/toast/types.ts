import { ComponentInternalInstance, VNode } from 'vue';
import { definePropType } from '@nano-ui/shared/props';
import { Mutable } from '@nano-ui/shared';

export type ToastMessage = string | VNode | (() => VNode);

export const ToastMessagePropType = definePropType<ToastMessage>([
  String,
  Object,
  Function,
]);

export interface ToastCompPropType {
  message?: ToastMessage;
  onClose?: () => void;
}

export interface ToastCompContext<CompProp extends ToastCompPropType> {
  id: string;
  vnode: VNode;
  handler: {
    close: () => void;
  };
  vm: ComponentInternalInstance;
  props: Mutable<CompProp>;
}

export type ToastCompOptions<CompProp extends ToastCompPropType> = Partial<
  Mutable<
    Omit<CompProp, 'id'> & {
      appendTo?: HTMLElement | string;
    }
  >
>;

export type ToastParams<CompProp extends ToastCompPropType> =
  | Partial<ToastCompOptions<CompProp>>
  | string
  | VNode;
