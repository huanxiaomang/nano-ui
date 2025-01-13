export * from './props';
export * from './install';

export const componentSizes = ['', 'default', 'small', 'large'] as const;

export type ComponentSize = (typeof componentSizes)[number];

export const typeIconMap = new Map([
  ['info', 'circle-info'],
  ['success', 'check-circle'],
  ['warning', 'circle-exclamation'],
  ['danger', 'circle-xmark'],
  ['error', 'circle-xmark'],
]);
