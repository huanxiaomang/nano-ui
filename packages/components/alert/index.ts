import { withInstall } from '@nano-ui/shared';
import Alert from './alert.vue';
import type { SFCWithInstall } from '@nano-ui/shared';

export const NAlert: SFCWithInstall<typeof Alert> = withInstall(Alert);
export default NAlert;

export * from './alert';
export type AlertInstance = InstanceType<typeof Alert>;
