import { isString } from 'lodash-unified';

class NanoUIError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = 'NanoUIError';
  }
}

function createNanoUIError(scope: string, msg: string) {
  return new NanoUIError(`[${scope}]:${msg}`);
}

export function throwError(scope: string, msg: string) {
  throw createNanoUIError(scope, msg);
}

export function debugWarn(error: Error): void;
export function debugWarn(scope: string, msg: string): void;
export function debugWarn(scope: string | Error, msg?: string) {
  if (process.env.NODE_ENV !== 'production') {
    const err = isString(scope) ? createNanoUIError(scope, msg!) : scope;
    // eslint-disable-next-line no-console
    console.warn(err);
  }
}
