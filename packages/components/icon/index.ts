import { withInstall } from '@nano-ui/shared';
import Icon from './icon.vue';
import type IconType from './icon.vue';

export const NIcon = withInstall(Icon);
export type IconInstance = InstanceType<typeof IconType>;
