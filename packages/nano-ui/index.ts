import '@nano-ui/theme/index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import installer from './defaults';

library.add(fas);
export * from '@nano-ui/components';
export * from '@nano-ui/constants';
export * from '@nano-ui/hooks';
export * from './make-installer';

export const install = installer.install;
export default installer;
