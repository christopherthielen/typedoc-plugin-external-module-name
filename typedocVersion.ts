import { memoize } from 'lodash';
import { satisfies } from 'semver';

const typedocVersion = require('typedoc/package.json').version;

function checkTypedocVersion(semverString: string) {
  return satisfies(typedocVersion, semverString);
}

export const isTypedocVersion = memoize(checkTypedocVersion);
