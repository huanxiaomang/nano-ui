/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { each, isFunction } from 'lodash-unified';
import shell from 'shelljs';

export function hooksPlugin({
  rmFiles = [],
  beforeBuild,
  afterBuild,
}: {
  rmFiles?: string[];
  beforeBuild?: Function;
  afterBuild?: Function;
}) {
  return {
    name: 'hooks-plugin',
    buildStart() {
      each(rmFiles, (fName) => shell.rm('-rf', fName));
      isFunction(beforeBuild) && beforeBuild();
    },
    buildEnd(err?: Error) {
      if (!err && isFunction(afterBuild)) {
        afterBuild();
      }
    },
  };
}
