import { Component, ComputedRef, ExtractPropTypes, Ref } from 'vue';
import { definePropType, iconPropType } from '@nano-ui/shared/props';

import { useSizeProp } from '@nano-ui/hooks/use-size';
import { ComponentSize } from '@nano-ui/shared/constants';
import { buildProps } from '@nano-ui/shared/props/index';

export const buttonTypes = [
  'primary',
  'success',
  'warning',
  'danger',
  'info',
  '',
] as const;

export type ButtonType = (typeof buttonTypes)[number];

export const buttonNativeTypes = ['button', 'submit', 'reset'] as const;

export const buttonProps = buildProps({
  /**
   * @description button size
   */
  size: useSizeProp(),
  /**
   * @description disable the button
   */
  disabled: Boolean,
  /**
   * @description button type
   */
  type: {
    type: String,
    values: buttonTypes,
    default: '',
  },
  /**
   * @description text link button
   */
  link: Boolean,
  /**
   * @description icon component
   */
  icon: {
    type: iconPropType,
  },
  /**
   * @description native button type
   */
  nativeType: {
    type: String,
    values: buttonNativeTypes,
    default: 'button',
  },
  /**
   * @description determine whether it's loading
   */
  loading: Boolean,
  /**
   * @description customize loading icon component
   */
  loadingIcon: {
    type: iconPropType,
    default: () => '图标',
  },
  /**
   * @description determine whether it's a plain button
   */
  plain: Boolean,
  /**
   * @description native button autofocus
   */
  autofocus: Boolean,
  /**
   * @description determine whether it's a round button
   */
  round: Boolean,
  /**
   * @description determine whether it's a circle button
   */
  circle: Boolean,
  /**
   * @description custom element tag
   */
  tag: {
    type: definePropType<string | Component>([String, Object]),
    default: 'button',
  },
  useThrottle: Boolean,
  throttleDuration: Number,
} as const);

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export type ButtonEmits = (e: 'click', val: MouseEvent) => void;
export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>;
  disabled: ComputedRef<boolean>;
  size: ComputedRef<ComponentSize | ''>;
  type: ComputedRef<ButtonType | ''>;
}
