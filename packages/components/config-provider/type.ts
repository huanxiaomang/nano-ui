import { ExtractPropTypes } from 'vue';
import { Language } from '@nano-ui/locale';
import { buildProps, definePropType } from '@nano-ui/shared';
import { MessageConfigContext } from '../message';
import { NotificationConfigContext } from '../notification';

export const configProviderProps = buildProps({
  locale: {
    type: definePropType<Language>(Object),
  },
  message: {
    type: definePropType<MessageConfigContext>(Object),
  },
  notification: {
    type: definePropType<NotificationConfigContext>(Object),
  },
  zIndex: Number,
} as const);

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>;
