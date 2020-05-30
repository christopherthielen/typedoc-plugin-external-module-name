import * as ts from 'typescript';
import * as path from 'path';

import { Component, ConverterComponent } from 'typedoc/dist/lib/converter/components';
import { Context } from 'typedoc/dist/lib/converter/context';
import { Converter } from 'typedoc/dist/lib/converter/converter';
import { Comment } from 'typedoc/dist/lib/models';
import { Reflection, ReflectionKind } from 'typedoc/dist/lib/models/reflections/abstract';
import { ContainerReflection } from 'typedoc/dist/lib/models/reflections/container';
import { DeclarationReflection } from 'typedoc/dist/lib/models/reflections/declaration';
import {
  createChildReflection,
  isModuleOrNamespace,
  removeReflection,
  removeTags,
  updateSymbolMapping,
} from './typedocVersionCompatibility';
import { getRawComment } from './getRawComment';

/**
 * This plugin allows an ES6 module to specify its TypeDoc name.
 * It also allows multiple ES6 modules to be merged together into a single TypeDoc module.
 *
 * @usage
 * At the top of an ES6 module, add a "dynamic module comment".  Insert "@module typedocModuleName" to
 * specify that this ES6 module should be merged with module: "typedocModuleName".
 *
 * Similar to the [[DynamicModulePlugin]], ensure that there is a comment tag (even blank) for the
 * first symbol in the file.
 *
 * @example
 * ```
 *
 * &#47;**
 *  * @module newModuleName
 *  *&#47;
 * &#47;** for typedoc &#47;
 * import {foo} from "../foo";
 * export let bar = "bar";
 * ```
 *
 * Also similar to [[DynamicModulePlugin]], if @preferred is found in a dynamic module comment, the comment
 * will be used as the module comment, and documentation will be generated from it (note: this plugin does not
 * attempt to count lengths of merged module comments in order to guess the best one)
 */
@Component({ name: 'external-module-name' })
export class ExternalModuleNamePlugin extends ConverterComponent {
  /** List of module reflections which are models to rename */
  private moduleRenames: ModuleRename[] = [];
  private entryPoints = [];

  initialize() {
    this.listenTo(this.owner, {
      [Converter.EVENT_BEGIN]: this.onBegin,
      [Converter.EVENT_CREATE_DECLARATION]: this.onDeclaration,
      [Converter.EVENT_RESOLVE_BEGIN]: this.onBeginResolve,
    });
  }

  /**
   * Get the program entry points
   */
  private onBegin(context: Context) {
    const dir = context.program.getCurrentDirectory();
    this.entryPoints = context.program.getRootFileNames().map((entry) => path.dirname(path.resolve(dir, entry)));
  }

  /**
   * Gets the module name for a reflection
   *
   * Order of precedence:
   * 1) custom function found in .typedoc-plugin-external-module-name.js
   * 2) explicit @module tag
   * 3) auto-create a module name based on the directory
   */
  private getModuleName(context: Context, reflection: Reflection, node): [string, boolean] {
    let comment = getRawComment(node);
    let preferred = /@preferred/.exec(comment) != null;
    // Look for @module
    let [, match] = /@module\s+([\w\u4e00-\u9fa5\.\-_/@"]+)/.exec(comment) || [];

    // Make a guess based on enclosing directory structure
    const filename = reflection.sources[0].file.fullFileName;
    const pathsRelativeToEntrypoints = this.entryPoints
      .map((entry) => path.dirname(path.relative(entry, filename)))
      .filter((x) => !x.includes('../'))
      .sort((a, b) => a.length - b.length);
    // Find shortest path relative to the entry points
    const guess = pathsRelativeToEntrypoints.pop();

    return [match || guess, preferred];
  }

  /**
   * Process a reflection.
   * Determine the module name and add it to a list of renames
   */
  private onDeclaration(context: Context, reflection: Reflection, node?) {
    if (isModuleOrNamespace(reflection)) {
      const [moduleName, preferred] = this.getModuleName(context, reflection, node);
      if (moduleName) {
        // Set up a list of renames operations to perform when the resolve phase starts
        this.moduleRenames.push({
          renameTo: moduleName,
          preferred: preferred != null,
          symbol: node.symbol,
          reflection: <ContainerReflection>reflection,
        });
      }
    }

    // Remove the tags
    if (reflection.comment) {
      removeTags(reflection.comment, 'module');
      removeTags(reflection.comment, 'preferred');
      if (isEmptyComment(reflection.comment)) {
        delete reflection.comment;
      }
    }
  }

  /**
   * OK, we saw all the reflections.
   * Now process the renames
   */
  private onBeginResolve(context: Context) {
    let projRefs = context.project.reflections;
    let refsArray: Reflection[] = Object.values(projRefs);

    // Process each rename
    this.moduleRenames.forEach((item) => {
      let renaming = item.reflection as ContainerReflection;

      // Find or create the module tree until the child's parent (each level is separated by .)
      let nameParts = item.renameTo.split('.');
      let parent: ContainerReflection = context.project;
      for (let i = 0; i < nameParts.length - 1; ++i) {
        let child: DeclarationReflection = parent.children.filter((ref) => ref.name === nameParts[i])[0];
        if (!child) {
          child = createChildReflection(parent, nameParts[i]);
          child.parent = parent;
          child.children = [];
          context.project.reflections[child.id] = child;
          parent.children.push(child);
        }
        parent = child;
      }

      // Find an existing module with the child's name in the last parent. Use it as the merge target.
      let mergeTarget = parent.children.filter(
        (ref) => ref.kind === renaming.kind && ref.name === nameParts[nameParts.length - 1],
      )[0] as ContainerReflection;

      // If there wasn't a merge target, change the name of the current module, connect it to the right parent and exit.
      if (!mergeTarget) {
        renaming.name = nameParts[nameParts.length - 1];
        let oldParent = <ContainerReflection>renaming.parent;
        for (let i = 0; i < oldParent.children.length; ++i) {
          if (oldParent.children[i] === renaming) {
            oldParent.children.splice(i, 1);
            break;
          }
        }
        item.reflection.parent = parent;
        parent.children.push(<DeclarationReflection>renaming);
        updateSymbolMapping(context, item.symbol, parent);
        return;
      }

      updateSymbolMapping(context, item.symbol, mergeTarget);
      if (!mergeTarget.children) {
        mergeTarget.children = [];
      }

      // Since there is a merge target, relocate all the renaming module's children to the mergeTarget.
      let childrenOfRenamed = refsArray.filter((ref) => ref.parent === renaming);
      childrenOfRenamed.forEach((ref: Reflection) => {
        // update links in both directions
        ref.parent = mergeTarget;
        mergeTarget.children.push(<any>ref);
      });

      // If @preferred was found on the current item, update the mergeTarget's comment
      // with comment from the renaming module
      if (item.preferred) mergeTarget.comment = renaming.comment;

      // Now that all the children have been relocated to the mergeTarget, delete the empty module
      // Make sure the module being renamed doesn't have children, or they will be deleted
      if (renaming.children) renaming.children.length = 0;
      removeReflection(context.project, renaming);

      // Remove @module and @preferred from the comment, if found.
      if (mergeTarget.comment) {
        removeTags(mergeTarget.comment, 'module');
        removeTags(mergeTarget.comment, 'preferred');
      }
      if (isEmptyComment(mergeTarget.comment)) {
        delete mergeTarget.comment;
      }
    });
  }
}

function isEmptyComment(comment: Comment) {
  return !comment || (!comment.text && !comment.shortText && (!comment.tags || comment.tags.length === 0));
}

interface ModuleRename {
  renameTo: string;
  preferred: boolean;
  symbol: ts.Symbol;
  reflection: ContainerReflection;
}
