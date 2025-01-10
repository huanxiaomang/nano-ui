import { withInstall } from '@nano-ui/shared/install';
import Button from './button.vue';
import type ButtonType from './button.vue';

export const NButton = withInstall(Button);
export type ButtonInstance = InstanceType<typeof ButtonType>;
