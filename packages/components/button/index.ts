import { withInstall } from '@nano-ui/shared';
import Button from './button.vue';
import type { SFCWithInstall } from '@nano-ui/shared';
import type ButtonType from './button.vue';

export const NButton: SFCWithInstall<typeof Button> = withInstall(Button);
export * from './button';
export type ButtonInstance = InstanceType<typeof ButtonType>;
