import { PropType } from 'vue';

export const componentSizes = ['', 'default', 'small', 'large'] as const;

export type ComponentSize = (typeof componentSizes)[number];

export const buttonProps = {
  size: {
    type: String as PropType<ComponentSize>,
    default: 'default',
  },
};

export const buttonEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent,
};

export type ButtonEmits = typeof buttonEmits;
