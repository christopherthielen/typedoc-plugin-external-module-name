# typedoc-plugin-external-module-name

<img src="https://api.travis-ci.org/christopherthielen/typedoc-plugin-external-module-name.svg?branch=master">

## What

A [Typedoc](http://typedoc.org) plugin which allows code doc to be organized into custom Modules.

By default, Typedoc creates a "Module" for each ESM Module (each typescript file).

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
