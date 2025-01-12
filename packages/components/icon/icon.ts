import { ExtractPropTypes, PropType } from 'vue';
import { buildProps, definePropType } from '@nano-ui/shared/vue/props';

export const flipTypes = ['horizontal', 'vertical', 'both'] as const;
export type FlipType = (typeof flipTypes)[number];

export const rotationTypes = [90, 180, 270, '90', '180', '270'] as const;
export type RotationType = (typeof rotationTypes)[number];

export const iconSizes = [
  '2xs',
  'xs',
  'sm',
  'lg',
  'xl',
  '2xl',
  '1x',
  '2x',
  '3x',
  '4x',
  '5x',
  '6x',
  '7x',
  '8x',
  '9x',
  '10x',
] as const;

export type IconSize = (typeof iconSizes)[number];

export const typeTypes = [
  'primary',
  'success',
  'warning',
  'danger',
  'info',
] as const;
export type TypeType = (typeof typeTypes)[number];

export const iconProps = buildProps({
  /**
   * @description Adds a border around the icon
   */
  border: Boolean,
  /**
   * @description Makes the icon have a fixed width
   */
  fixedWidth: Boolean,
  /**
   * @description Flip direction of the icon
   */
  flip: {
    type: String as PropType<FlipType>,
  },
  /**
   * @description Icon object or definition
   */
  icon: {
    type: definePropType<object | Array<string> | string>([
      Object,
      Array,
      String,
    ]),
    required: true,
  },
  /**
   * @description Mask to apply on the icon
   */
  mask: {
    type: definePropType<object | Array<string> | string>([
      Object,
      Array,
      String,
    ]),
  },
  /**
   * @description If the icon is a list item
   */
  listItem: Boolean,
  /**
   * @description Pull direction of the icon
   */
  pull: {
    type: String as PropType<'right' | 'left'>,
  },
  /**
   * @description Adds a pulse animation to the icon
   */
  pulse: Boolean,
  /**
   * @description Rotation of the icon
   */
  rotation: {
    type: [Number, String] as PropType<RotationType>,
  },
  /**
   * @description Swaps the opacity of the icon
   */
  swapOpacity: Boolean,
  /**
   * @description Size of the icon
   */
  size: {
    type: String as PropType<IconSize>,
  },
  /**
   * @description Adds a spin animation to the icon
   */
  spin: Boolean,
  /**
   * @description Transform properties of the icon
   */
  transform: {
    type: definePropType<object | string>([Object, String]),
  },
  /**
   * @description Symbol or ID for the icon
   */
  symbol: {
    type: [Boolean, String] as PropType<boolean | string>,
  },
  /**
   * @description Title for the icon
   */
  title: String,
  /**
   * @description Inverse the color of the icon
   */
  inverse: Boolean,
  /**
   * @description Adds bounce animation to the icon
   */
  bounce: Boolean,
  /**
   * @description Adds shake animation to the icon
   */
  shake: Boolean,
  /**
   * @description Adds beat animation to the icon
   */
  beat: Boolean,
  /**
   * @description Adds fade animation to the icon
   */
  fade: Boolean,
  /**
   * @description Adds beat-fade animation to the icon
   */
  beatFade: Boolean,
  /**
   * @description Adds a pulse animation with spin
   */
  spinPulse: Boolean,
  /**
   * @description Reverses the spin animation
   */
  spinReverse: Boolean,
  /**
   * @description Type of the icon
   */
  type: {
    type: String as PropType<TypeType>,
  },
  /**
   * @description Color of the icon
   */
  color: String,
} as const);

export type IconProps = ExtractPropTypes<typeof iconProps>;
