import { InjectionKey, Ref } from 'vue';
import { ConfigProviderProps } from './type';

export type ConfigProviderContext = Partial<ConfigProviderProps>;

export const configProviderContextKey: InjectionKey<
  Ref<ConfigProviderContext>
> = Symbol('configProviderContextKey');
