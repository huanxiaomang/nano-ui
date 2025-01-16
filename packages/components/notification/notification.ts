import { buildProps } from '@nano-ui/shared';

import type { ExtractPropTypes } from 'vue';

export const notificationProps = buildProps({} as const);
export type NotificationProps = ExtractPropTypes<typeof notificationProps>;

export const notificationEmits = {};
export type NotificationEmits = typeof notificationEmits;
