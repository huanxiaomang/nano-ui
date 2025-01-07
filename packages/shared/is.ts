export const isObject = (val: unknown): val is object =>
  typeof val === 'object' && val !== null;
