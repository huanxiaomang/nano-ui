import { withInstall } from '@nano-ui/shared';
import Avatar from './avatar.vue';
import type AvatarType from './avatar.vue';

export const NAvatar = withInstall(Avatar);

export type AvatarInstance = InstanceType<typeof AvatarType>;

export * from './avatar';
