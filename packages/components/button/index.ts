import { withInstall } from '@nano-ui/shared';
import Button from './button.vue';
import ButtonGroup from './button-group.vue';
import type { SFCWithInstall } from '@nano-ui/shared';
import type ButtonType from './button.vue';
import type ButtonGroupType from './button-group.vue';

export const NButton: SFCWithInstall<typeof Button> = withInstall(Button);
export const NButtonGroup: SFCWithInstall<typeof ButtonGroup> =
  withInstall(ButtonGroup);
export * from './button';
export * from './button-group';
export type ButtonInstance = InstanceType<typeof ButtonType>;
export type ButtonGroupInstance = InstanceType<typeof ButtonGroupType>;
