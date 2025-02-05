import { withInstallFunction } from '@nano-ui/shared';
import Notify from './method';

export * from './notification';

export const NNotify = withInstallFunction(Notify, '$notification');
export default NNotify;
