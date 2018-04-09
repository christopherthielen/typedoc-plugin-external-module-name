/**
 * Monkey patches getJSDocCommentRanges to make `getRawComment` return a
 * comment for a module even if there is only one comment
 *
 * @see https://github.com/christopherthielen/typedoc-plugin-external-module-name/issues/6
 * @see https://github.com/TypeStrong/typedoc/blob/master/src/lib/converter/factories/comment.ts
 */

import * as ts from 'typescript';
import * as _ts from 'typedoc/dist/lib/ts-internal';
import { getRawComment as realGetRawComment } from 'typedoc/dist/lib/converter/factories/comment';

function monkeyPatch() {
  const realGetJSDocCommentRanges = _ts.getJSDocCommentRanges;

  function patchedGetJSDocCommentRanges() {
    const result = realGetJSDocCommentRanges.apply(this, arguments);
    if (result && result.length === 1) {
      result.push(null);
    }
    return result;
  }

  const tsinternal = _ts as any;
  tsinternal.getJSDocCommentRanges = patchedGetJSDocCommentRanges;

  return function unMonkeyPatch() {
    tsinternal.getJSDocCommentRanges = realGetJSDocCommentRanges;
  };
}

function getRawComment(node: ts.Node): string {
  let unpatch = monkeyPatch();
  try {
    return realGetRawComment(node);
  } finally {
    unpatch();
  }
}

export { getRawComment };
