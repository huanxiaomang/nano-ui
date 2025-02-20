import { INSTALLED_KEY } from '@nano-ui/constants';

declare module '@vue/runtime-core' {
  export interface App {
    [INSTALLED_KEY]: boolean;
  }
}

export {};
