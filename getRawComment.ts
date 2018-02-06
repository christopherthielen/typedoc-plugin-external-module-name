/**
 * Contains `getRawComment` copied from typedoc but adjusted to avoid
 * skipping over the only topmost jsdoc block
 *
 * @see https://github.com/christopherthielen/typedoc-plugin-external-module-name/issues/6
 * @see https://github.com/TypeStrong/typedoc/blob/master/src/lib/converter/factories/comment.ts
 */

import * as ts from 'typescript';
import * as _ts from 'typedoc/dist/lib/ts-internal';


function isTopmostModuleDeclaration(node: ts.ModuleDeclaration): boolean {
  if (node.nextContainer && node.nextContainer.kind === ts.SyntaxKind.ModuleDeclaration) {
    let next = <ts.ModuleDeclaration>node.nextContainer;
    if (node.name.end + 1 === next.name.pos) {
      return false;
    }
  }

  return true;
}

function getRootModuleDeclaration(node: ts.ModuleDeclaration): ts.Node {
  while (node.parent && node.parent.kind === ts.SyntaxKind.ModuleDeclaration) {
    let parent = <ts.ModuleDeclaration>node.parent;
    if (node.name.pos === parent.name.end + 1) {
      node = parent;
    } else {
      break;
    }
  }

  return node;
}

export default function getRawComment(node: ts.Node): string {
  if (node.parent && node.parent.kind === ts.SyntaxKind.VariableDeclarationList) {
    node = node.parent.parent;
  } else if (node.kind === ts.SyntaxKind.ModuleDeclaration) {
    if (!isTopmostModuleDeclaration(<ts.ModuleDeclaration>node)) {
      return null;
    } else {
      node = getRootModuleDeclaration(<ts.ModuleDeclaration>node);
    }
  }

  const sourceFile = _ts.getSourceFileOfNode(node);
  const comments = _ts.getJSDocCommentRanges(node, sourceFile.text);
  if (comments && comments.length) {
    let comment: ts.CommentRange;
    if (node.kind === ts.SyntaxKind.SourceFile) {
      /**
       * This is what typedoc uses to skip over the topmost jsdoc block.
       * We want to parse it to look for `@module` and `@preferred` annotations
       */
      // if (comments.length === 1) {
      //   return null;
      // }
      comment = comments[0];
    } else {
      comment = comments[comments.length - 1];
    }

    return sourceFile.text.substring(comment.pos, comment.end);
  } else {
    return null;
  }
}
