import { componentSizes } from '@nano-ui/shared/component';
import { buildProp } from '@nano-ui/shared/vue/props';

export const useSizeProp = () =>
  buildProp({
    type: String,
    values: componentSizes,
    required: false,
  });
