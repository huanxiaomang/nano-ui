import installer from './defaults';
import '@nano-ui/theme/index.css';
export * from '@nano-ui/components';
export * from '@nano-ui/constants';
export * from '@nano-ui/hooks';
export * from './make-installer';

export const install = installer.install;
export default installer;
