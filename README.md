## typedoc-plugin-external-module-name

[![Greenkeeper badge](https://badges.greenkeeper.io/christopherthielen/typedoc-plugin-external-module-name.svg)](https://greenkeeper.io/)

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

* "thing1/foo"
* "thing1/bar"
* "thing2/baz"
* "thing2/qux"

This plugin allows each file to specify the Typedoc External Module its code should belong to.
If multiple files belong to the same module, they are merged.

This allows more control over the modules that Typedoc generates.
Instead of the four modules above, we could group them into two:

* thing1
* thing2

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

#### thing1/foo.ts

```js
/**
 * @module thing1
 */

// foo stuff
```

#### thing1/bar.ts

```js
/**
 * @module thing1
 */

// bar stuff
```

#### thing2/baz.ts

```js
/**
 * @module thing2
 */

// baz stuff
```

Multiple files may point to the same ES6 module.
To specify the which file's comment block will be used to document the Typedoc Module page, use `@preferred`

#### thing2/qux.ts

```js
/**
 * @module thing2
 * @preferred
 *
 * This comment will be used to document the "thing2" module.
 */

// qux stuff
```

### Caveats

The `@module` annotation should be in the first comment of the file.
For example, if your source files have license comments, they should be below the comment with `@module`.
See [this issue](https://github.com/christopherthielen/typedoc-plugin-external-module-name/issues/21) for details.
