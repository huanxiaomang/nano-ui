import { buildProps } from '@nano-ui/shared';

import type { ExtractPropTypes } from 'vue';

export const alertProps = buildProps({} as const);
export type AlertProps = ExtractPropTypes<typeof alertProps>;

export const alertEmits = {};
export type AlertEmits = typeof alertEmits;
