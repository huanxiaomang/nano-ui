import { withInstall } from '@nano-ui/shared';
import Notification from './notification.vue';
import type { SFCWithInstall } from '@nano-ui/shared';

export const NNotification: SFCWithInstall<typeof Notification> = withInstall(Notification);
export default NNotification;

export * from './notification';
export type NotificationInstance = InstanceType<typeof Notification>;
