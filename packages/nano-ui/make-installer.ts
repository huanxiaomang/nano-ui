import {
  ConfigProviderContext,
  provideGlobalConfig,
} from '@nano-ui/components';
import { INSTALLED_KEY } from '@nano-ui/constants';
import type { App, Plugin } from '@vue/runtime-core';

export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options?: ConfigProviderContext) => {
    if (app[INSTALLED_KEY]) return;

    app[INSTALLED_KEY] = true;
    components.forEach((c) => app.use(c));

    if (options) provideGlobalConfig(options, app, true);
  };

  return {
    install,
  };
};
