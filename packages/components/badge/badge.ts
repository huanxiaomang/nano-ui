import { buildProps } from '@nano-ui/shared';
import type { ExtractPropTypes, PropType } from 'vue';

export const badgeTypes = [
  'primary',
  'success',
  'warning',
  'danger',
  'info',
] as const;

export const badgeProps = buildProps({
  /**
   * @description badge type
   */
  type: {
    type: String as PropType<(typeof badgeTypes)[number]>,
    default: 'danger',
  },
  /**
   * @description badge value
   */
  value: {
    type: [String, Number],
    default: '',
  },
  /**
   * @description maximum value, shows '{max}+' when exceeded. Only works if value is a number
   */
  max: {
    type: Number,
    default: 99,
  },
  /**
   * @description if a dot badge should be displayed
   */
  isDot: {
    type: Boolean,
    default: false,
  },
  /**
   * @description hidden badge
   */
  hidden: {
    type: Boolean,
    default: false,
  },
  /**
   * @description badge position
   */
  position: {
    type: String as PropType<
      'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
    >,
    default: 'top-right',
  },
} as const);

export type BadgeProps = ExtractPropTypes<typeof badgeProps>;
