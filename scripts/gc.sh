#! /bin/bash

NAME=$(echo $1 | sed -E "s/([A-Z])/-\1/g" | sed -E "s/^-//g" | sed -E "s/_/-/g" | tr "A-Z" "a-z")

FILE_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")/../packages" && pwd)

re="[[:space:]]+"

if [ "$#" -ne 1 ] || [[ $NAME =~ $re ]] || [ "$NAME" == "" ]; then
  echo "Usage: pnpm gen \${name} with no space"
  exit 1
fi

DIRNAME="$FILE_PATH/components/$NAME"
INPUT_NAME=$NAME

if [ -d "$DIRNAME" ]; then
  echo "$NAME component already exists, please change it"
  exit 1
fi

NAME=$(echo $NAME | awk -F'-' '{ for(i=1; i<=NF; i++) { $i = toupper(substr($i,1,1)) tolower(substr($i,2)) } print $0 }' OFS='')
PROP_NAME=$(echo "${NAME:0:1}" | tr '[:upper:]' '[:lower:]')${NAME:1}

mkdir -p "$DIRNAME"
mkdir -p "$DIRNAME/__tests__"

cat > $DIRNAME/$INPUT_NAME.vue <<EOF
<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ${PROP_NAME}Emits, ${PROP_NAME}Props } from './$INPUT_NAME';

defineOptions({
  name: 'N$NAME',
});

const props = defineProps(${PROP_NAME}Props);
const emit = defineEmits(${PROP_NAME}Emits);


</script>

<style scoped>
@import './style.css';
</style>
EOF

cat > $DIRNAME/$INPUT_NAME.ts <<EOF
import { buildProps } from '@nano-ui/shared';

import type { ExtractPropTypes } from 'vue';

export const ${PROP_NAME}Props = buildProps({} as const);
export type ${NAME}Props = ExtractPropTypes<typeof ${PROP_NAME}Props>;

export const ${PROP_NAME}Emits = {};
export type ${NAME}Emits = typeof ${PROP_NAME}Emits;
EOF

cat <<EOF >"$DIRNAME/index.ts"
import { withInstall } from '@nano-ui/shared';
import $NAME from './$INPUT_NAME.vue';
import type { SFCWithInstall } from '@nano-ui/shared';

export const N$NAME: SFCWithInstall<typeof $NAME> = withInstall($NAME);
export default N$NAME;

export * from './$INPUT_NAME';
export type ${NAME}Instance = InstanceType<typeof $NAME>;
EOF

cat > $DIRNAME/__tests__/$INPUT_NAME.test.tsx <<EOF
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import $NAME from '../$INPUT_NAME.vue';

const AXIOM = 'nihao';

describe('$NAME.vue', () => {
  test('render test', () => {
    const wrapper = mount(() => <$NAME>{AXIOM}</$NAME>);

    expect(wrapper.text()).toEqual(AXIOM);
  })
})
EOF


cat > $DIRNAME/style.css <<EOF
.nano-$INPUT_NAME{

}
EOF
