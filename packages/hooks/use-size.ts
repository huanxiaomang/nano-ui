import { buildProp, componentSizes } from '@nano-ui/shared';

export const useSizeProp = () =>
  buildProp({
    type: String,
    values: componentSizes,
    required: false,
  });
