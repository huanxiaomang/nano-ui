import { isArray, isObject, isString } from '@vue/shared';
import { isNil } from 'lodash-unified';

export { isPromise } from '@vue/shared';
export { isClient, isIOS } from '@vueuse/core';

export const isEmpty = (val: unknown) =>
  (!val && val !== 0) ||
  (isArray(val) && val.length === 0) ||
  (isObject(val) && !Object.keys(val).length);

export const isElement = (e: unknown): e is Element => {
  if (typeof Element === 'undefined') return false;
  return e instanceof Element;
};

export const isPropAbsent = (prop: unknown): prop is null | undefined =>
  isNil(prop);

export const isStringNumber = (val: string): boolean => {
  if (!isString(val)) {
    return false;
  }
  return !Number.isNaN(Number(val));
};

export const isWindow = (val: unknown): val is Window => val === window;
