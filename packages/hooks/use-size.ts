import { buildProp } from '@nano-ui/shared/buildProps';

import { componentSizes } from '@nano-ui/shared';

export const useSizeProp = () =>
  buildProp({
    type: String,
    values: componentSizes,
    required: false,
  });
