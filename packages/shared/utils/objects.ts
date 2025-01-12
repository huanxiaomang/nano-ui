import type { Entries } from 'type-fest';

export const keysOf = <T extends object>(arr: T) =>
  Object.keys(arr) as Array<keyof T>;
export const entriesOf = <T extends object>(arr: T) =>
  Object.entries(arr) as Entries<T>;
export { hasOwn } from '@vue/shared';
