import { ExtractPropTypes } from 'vue';
import { componentSizes } from '@nano-ui/shared';
import { buildProps } from '@nano-ui/shared/props';

export const buttonTypes = [
  'primary',
  'success',
  'warning',
  'danger',
  'info',
] as const;

export type ButtonTypes = (typeof buttonTypes)[number];

export const buttonProps = buildProps({
  size: {
    type: String,
    values: componentSizes,
    required: true,
  },
  type: {
    type: String,
    values: buttonTypes,
    required: false,
  },
  plain: {
    type: Boolean,
    default: false,
    required: false,
  },
} as const);

export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export const buttonEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent,
};

export type ButtonEmits = typeof buttonEmits;
