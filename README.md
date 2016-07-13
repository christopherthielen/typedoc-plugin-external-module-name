#### typedoc-plugin-external-module-name

A plugin for http://typedoc.io

When using ES6 modules in Typedoc, each file gets its own listing in "External Modules", i.e., "Globals".
This can be annoying, for projects that utilize one file per class, for instance.

This plugin allows each file to specify the Typedoc External Module its code should belong to.

### Installing

Typedoc 0.4 has the ability to discover and load typedoc plugins found in node_modules.
Simply install the plugin and run typedoc.

```
npm install --save typedoc-plugin-external-module-name
typedoc
```

### Using

Add a comment block at the top of the file (ES6 module).
Specify the Typedoc External Module using the `@module` annotation.
A known issue: The comment block must be followed by another comment block for some reason (?).

```js
/**
 * @module foo
 */ 
/** second comment block */
```

Multiple files may point to the same ES6 module.
To specify the which file's comment block will be used to document the Typedoc Module page, use `@preferred`

```js
/**
 * @module foo
 * @preferred
 *
 * This comment will be used to document the "foo" module.
 */ 
/** second comment block */
```
