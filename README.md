## typedoc-plugin-external-module-name

<img src="https://api.travis-ci.org/christopherthielen/typedoc-plugin-external-module-name.svg?branch=master">

### What

A plugin for [Typedoc](http://typedoc.org)

When using ES6 modules in Typedoc, each file gets its own listing in "External Modules", i.e., "Globals".
This can be annoying, for projects that utilize one file per class, for instance.

Suppose your source files are organized like this:

```
thing1/foo.ts
thing1/bar.ts
thing2/baz.ts
thing2/qux.ts
```

Typedoc will create four "External Modules":

- `thing1/foo`
- `thing1/bar`
- `thing2/baz`
- `thing2/qux`

This plugin allows each file to specify the Typedoc External Module its code should belong to.
If multiple files belong to the same module, they are merged.

This allows more control over the modules that Typedoc generates.
Instead of the four modules above, we could group them into two:

- `thing1`
- `thing2`

### Installing

Typedoc has the ability to discover and load typedoc plugins found in node_modules.
Simply install the plugin and run typedoc.

```
npm install -D typedoc-plugin-external-module-name
typedoc
```

### Using

Add a comment block at the top of the file (ES6 module).
Specify the Typedoc External Module using the `@module` annotation.
Mark the comment block as `@packageDocumentation` to let typedoc know that this is documentation for the file itself
(see: [Typedoc Docs](https://typedoc.org/guides/doccomments/#files)).

#### thing1/foo.ts

```js
/**
 * @packageDocumentation
 * @module thing1
 */

// foo stuff
```

#### thing1/bar.ts

```js
/**
 * @packageDocumentation
 * @module thing1
 */

// bar stuff
```

#### thing2/baz.ts

```js
/**
 * @packageDocumentation
 * @module thing2
 */

// baz stuff
```

Multiple files may point to the same typedoc module.
To specify the which file's comment block will be used to document the Typedoc Module page, use `@preferred`

#### thing2/qux.ts

```js
/**
 * This comment will be used to document the "thing2" module.

 * @packageDocumentation
 * @module thing2
 * @preferred
 */

// qux stuff
```
