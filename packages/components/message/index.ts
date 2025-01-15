import { withInstallFunction } from '@nano-ui/shared';
import Message from './method';

export * from './message';

export const NMessage = withInstallFunction(Message, '$message');
export default NMessage;
