import { buildProps } from '@nano-ui/shared';

import type { ExtractPropTypes } from 'vue';

export const alertTypes = ['success', 'info', 'warning', 'danger'] as const;

export type AlertType = (typeof alertTypes)[number];

export const alertEffects = ['light', 'dark'] as const;

export const alertProps = buildProps({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    values: alertTypes,
  },
  closable: {
    type: Boolean,
    default: true,
  },
  center: Boolean,
  showIcon: Boolean,
  effect: {
    type: String,
    values: alertEffects,
    default: 'light',
  },
} as const);

export type AlertProps = ExtractPropTypes<typeof alertProps>;

export const alertEmits = {
  close: (ev: MouseEvent) => ev instanceof MouseEvent,
};
export type AlertEmits = typeof alertEmits;
