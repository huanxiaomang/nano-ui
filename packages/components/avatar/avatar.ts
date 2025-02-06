import { buildProps, componentSizes } from '@nano-ui/shared';

import type { ExtractPropTypes, PropType } from 'vue';

export const avatarProps = buildProps({
  /**
   * @description Avatar size
   */
  size: {
    type: [Number, String] as PropType<
      number | (typeof componentSizes)[number]
    >,
    default: 'default',
  },
  /**
   * @description Avatar shape
   */
  shape: {
    type: String as PropType<'circle' | 'square'>,
    default: 'circle',
  },
  /**
   * @description Avatar icon
   */
  icon: {
    type: String,
  },
  /**
   * @description Avatar src
   */
  src: {
    type: String,
    default: '',
  },
  /**
   * @description Avatar alt
   */
  alt: {
    type: String,
    default: '',
  },
  /**
   * @description Avatar fit mode
   */
  fit: {
    type: String as PropType<
      'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
    >,
    default: 'cover',
  },
} as const);

export type AvatarProps = ExtractPropTypes<typeof avatarProps>;

export const avatarEmits = {
  error: (evt: Event) => evt instanceof Event,
};

export type AvatarEmits = typeof avatarEmits;
