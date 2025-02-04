import { type SFCWithInstall, withInstall } from '@nano-ui/shared';
import ConfigProvider from './config-provider.vue';

export * from './constants';
export * from './type';
export * from './hooks/provide-global-config';

export const NConfigProvider: SFCWithInstall<typeof ConfigProvider> =
  withInstall(ConfigProvider);
export default NConfigProvider;

export type ConfigProviderInstance = InstanceType<typeof ConfigProvider>;
