# typedoc-plugin-external-module-name

<img src="https://api.travis-ci.org/christopherthielen/typedoc-plugin-external-module-name.svg?branch=master">

## What

A [Typedoc](http://typedoc.org) plugin which allows code documentation to be organized into custom Modules.

_Note: In Typedoc 0.17.0 and above, Module refers to an ES6 Module._
_In Typedoc 0.16.x and below, an ES6 Module was called an [External Module](https://github.com/TypeStrong/TypeDoc/issues/109)._
_Although the plugin's name includes "External Module", it modifies Modules (ES6 Modules)_

By default, Typedoc creates a Module for each ES6 Module (each file).

This plugin allows documentation to be moved to arbitrary modules.
It also supports merging multiple modules into a single module.
By default, all Modules in a given directory will be merged into a single module.

Suppose your source files are organized like this:

```
thing1/foo.ts
thing1/bar.ts
thing2/baz.ts
thing2/qux.ts
```

By default, Typedoc would create four Modules:

- `thing1/foo`: contains `foo` documentation
- `thing1/bar`: contains `bar` documentation
- `thing2/baz`: contains `baz` documentation
- `thing2/qux`: contains `qux` documentation

With this plugin, Typedoc creates two Modules:

- `thing1`: contains `foo` and `bar` documentation
- `thing2`: contains `baz` and `qux` documentation

## Installing

Typedoc has the ability to discover and load typedoc plugins found in node_modules.
Simply install the package usng your package manager and run typedoc.

```
npm install -D typedoc-plugin-external-module-name
typedoc
```

## Using

### Directory Based

This plugin will combine documentation from the files in each given directory into a new Module.
The new module name is generated from the directory's location in the source tree.

### Explicit via Annotation

You can explicitly specify a Module name using the `@module` annotation.
Add a comment block at the top of a Typescript file with `@module modulename`.
Mark the comment block as `@packageDocumentation` to let typedoc know that this is documentation for the file (Module) itself
(see: [Typedoc Docs](https://typedoc.org/guides/doccomments/#files)).

```js
/**
 * @packageDocumentation
 * @module module1
 */
```

### Top level module comments

When multiple modules are merged, the merged module summary is chosen arbitrarily from the first file processed.
To use a specific file's comment block as the Module page summary, use `@preferred`.

```js
/**
 * This comment will be used as the summary for the "thing2" module.

 * @packageDocumentation
 * @module thing2
 * @preferred
 */
```

### Custom Module Name Generation

Create a file named `.typedoc-plugin-external-module-name.js` in the folder you launch typedoc from.
Create a custom mapping function in that file and export it using CommonJS.
For each Module, the plugin will call your function and use the return value as the Module Name.

```
module.exports = function customMappingFunction() {
  return "custom" // everything goes into "custom"
}
```

The Function should have the following signature:

```
type CustomModuleNameMappingFn = (
  explicitModuleAnnotation: string,
  implicitFromDirectory: string,
  path: string,
  reflection: Reflection,
  context: Context,
) => string;

```

The arguments are:

- `moduleAnnotation`: If the module has an explicit annotation, i.e., `@module explicit`
- `implicitFromDirectory`: The plugin's default mapping
- `path`: The path to the file
- `reflection`: The Module [`ContainerReflection`](https://typedoc.org/api/classes/containerreflection.html)
- `context`: The typedoc [`Context`](https://typedoc.org/api/classes/context.html)

Example:

```
const subpackage = new RegExp("packages/([^/]+)/");
module.exports = function customMappingFunction(explicit, implicit, path, reflection, context) {
  // extract the monorepo package from the path
  const package = subpackage.match(path)[1];
  // build the module name
  return `${package}/${implicit}`;
}
```
