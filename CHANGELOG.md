## 4.0.6 (2021-01-04)
[Compare `typedoc-plugin-external-module-name` versions 4.0.5 and 4.0.6](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/4.0.5...4.0.6)

### Bug Fixes

* **preferred:** Fix preferred flag on modules ([83a3281](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/83a3281)), closes [#554](https://github.com/christopherthielen/typedoc-plugin-external-module-name/issues/554)




## 4.0.5 (2020-12-20)
[Compare `typedoc-plugin-external-module-name` versions 4.0.4 and 4.0.5](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/4.0.4...4.0.5)

### Bug Fixes

* Do not crash when typedoc "disableSources" option is true (this turns off automatic module name feature) ([8cfb30c](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/8cfb30c)), closes [#507](https://github.com/christopherthielen/typedoc-plugin-external-module-name/issues/507)




## 4.0.4 (2020-12-17)
[Compare `typedoc-plugin-external-module-name` versions 4.0.3 and 4.0.4](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/4.0.3...4.0.4)

### Bug Fixes

* If automatic name guesses '.', rename to 'root' instead. ([52bb52c](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/52bb52c))
* rootFileNames can be an empty array.  Use current dir as the base path instead of blowing up. ([f3c75dd](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/f3c75dd)), closes [#548](https://github.com/christopherthielen/typedoc-plugin-external-module-name/issues/548)


### Features

* allow .cjs and .mjs extensions for custom mapping function file to accomodate "type": "module" in package.json ([f47f8ec](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/f47f8ec))
* support typedoc 0.19 ([f787640](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/f787640))




## 4.0.3 (2020-06-06)
[Compare `typedoc-plugin-external-module-name` versions 4.0.2 and 4.0.3](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/4.0.2...4.0.3)

### Bug Fixes

* **windows:** when calculating the common prefix, always use path.resolve() to map to native path separator, i.e. "\" ([09b2090](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/09b2090))




## 4.0.2 (2020-06-06)
[Compare `typedoc-plugin-external-module-name` versions 4.0.1 and 4.0.2](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/4.0.1...4.0.2)

### Bug Fixes

* Use the common parent directory of all entrypoints as the relative path to guess module names ([f790eee](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/f790eee))




## 4.0.1 (2020-06-05)
[Compare `typedoc-plugin-external-module-name` versions 4.0.0 and 4.0.1](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/4.0.0...4.0.1)

### Features

* Add a --disableAutoModuleName flag ([a8561e0](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/a8561e0))




# 4.0.0 (2020-05-31)
[Compare `typedoc-plugin-external-module-name` versions 3.1.0 and 4.0.0](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/3.1.0...4.0.0)

### Bug Fixes

* fix createChildReflection ReflectionKind for typedoc < 0.17 (now creates a 0.17 Module, not a Namespace) ([fc6b2b4](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/fc6b2b4))


### Features

* Bump package to 4.0.0 ([aec9638](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/aec9638))
* merge modules from the same directory into a single module by default ([fd03f0b](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/fd03f0b))
* Support a .typedoc-plugin-external-module-name.js file for custom generation of module names based on the reflection itself ([ca0a9c7](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/ca0a9c7)), closes [#423](https://github.com/christopherthielen/typedoc-plugin-external-module-name/issues/423)


### BREAKING CHANGES

*     This plugin now automatically applies a Module Name based on the file path.




# 3.1.0 (2020-04-27)
[Compare `typedoc-plugin-external-module-name` versions 3.0.0 and 3.1.0](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/3.0.0...3.1.0)

### Bug Fixes

* < 0.17.0 fix isModuleOrNamespace compat ([1ef1ad3](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/1ef1ad3))
* Re-add compatibility for typedoc < 0.17.0 ([c255f1e](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/c255f1e))


### Features

* build with typedoc 0.17 and expand peerDependency semver range to include 0.17.x ([00f0f96](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/00f0f96))




# 3.0.0 (2020-01-16)
[Compare `typedoc-plugin-external-module-name` versions 2.2.1 and 3.0.0](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/2.2.1...3.0.0)

### Bug Fixes

* **emptycomment:** Remove empty comments on source reflections that are being merged, just in case.. not sure if this is even necessary! ([bd9b5cd](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/bd9b5cd))
* **typedoc0.16:** Some fixes for 0.16.x (WIP) ([0089d19](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/0089d19))


### Features

* **typedoc0.16.4:** Support typedoc 0.16.4 ([02aa15a](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/02aa15a))




## 2.2.1 (2020-01-15)
[Compare `typedoc-plugin-external-module-name` versions 2.1.0 and 2.2.1](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/2.1.0...2.2.1)

### Bug Fixes

* **module:** Remove empty comment blocks of merge target modules ([c800a22](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/c800a22)), closes [#142](https://github.com/christopherthielen/typedoc-plugin-external-module-name/issues/142)
* **reflections:** Update symbol mappings for merged modules ([248b806](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/248b806)), closes [#313](https://github.com/christopherthielen/typedoc-plugin-external-module-name/issues/313) [#193](https://github.com/christopherthielen/typedoc-plugin-external-module-name/issues/193)
* **typedoc-0.14:** Improve typedoc 0.14.0 compatibility to account for api change ([68fc6e1](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/68fc6e1))




# 2.2.0 (2020-01-15)
[Compare `typedoc-plugin-external-module-name` versions 2.1.0 and 2.2.0](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/2.1.0...2.2.0)

### Bug Fixes

* **module:** Remove empty comment blocks of merge target modules ([c800a22](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/c800a22)), closes [#142](https://github.com/christopherthielen/typedoc-plugin-external-module-name/issues/142)
* **reflections:** Update symbol mappings for merged modules ([248b806](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/248b806)), closes [#313](https://github.com/christopherthielen/typedoc-plugin-external-module-name/issues/313) [#193](https://github.com/christopherthielen/typedoc-plugin-external-module-name/issues/193)
* **typedoc-0.14:** Improve typedoc 0.14.0 compatibility to account for api change ([68fc6e1](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/68fc6e1))




# 2.1.0 (2019-05-06)
[Compare `typedoc-plugin-external-module-name` versions 2.0.0 and 2.1.0](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/2.0.0...2.1.0)

### Features

* Support submodules (modules are separated by '.') ([793d0ae](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/793d0ae))




# 2.0.0 (2019-01-09)
[Compare `typedoc-plugin-external-module-name` versions 1.1.3 and 2.0.0](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/1.1.3...2.0.0)

### Bug Fixes

* Switch to emitting ES2015 to account for Typedoc emitting ES2015 in https://github.com/TypeStrong/typedoc/pull/845 ([00a4ae8](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/00a4ae8))




## 1.1.3 (2018-07-21)
[Compare `typedoc-plugin-external-module-name` versions 1.1.1 and 1.1.3](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/1.1.1...1.1.3)

### Features

* **module:** Allow `.` (dot) in module names. ([26af2af](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/26af2af))




## 1.1.2 (2018-04-13)

[Compare `typedoc-plugin-external-module-name` versions 1.1.1 and 1.1.2](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/1.1.1...1.1.2)

### Features

* **module:** Allow `.` (dot) in module names. ([26af2af](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/26af2af))

## 1.1.1 (2018-02-07)

[Compare `typedoc-plugin-external-module-name` versions 1.1.0 and 1.1.1](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/1.1.0...1.1.1)

### Bug Fixes

* **doublecomment:** Null check 'result' ([2b51576](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/2b51576))

# 1.1.0 (2018-02-07)

[Compare `typedoc-plugin-external-module-name` versions 1.0.10 and 1.1.0](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/1.0.10...1.1.0)

### Bug Fixes

* **doublecomment:** Monkey patch getJSDocCommentRanges instead of duplicating all of getRawComment ([c39c924](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/c39c924))

## 1.0.10 (2017-10-27)

[Compare `typedoc-plugin-external-module-name` versions 1.0.9 and 1.0.10](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/1.0.9...1.0.10)

### Bug Fixes

* **doublecomment:** Do not use 'getRawComment': better fix for not requiring a second comment block. ([a469ed4](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/a469ed4)), closes [#6](https://github.com/christopherthielen/typedoc-plugin-external-module-name/issues/6)
* **peerDependencies:** Fix node v4 ([edaa68f](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/edaa68f))

## 1.0.9 (2017-03-21)

[Compare `typedoc-plugin-external-module-name` versions 1.0.8 and 1.0.9](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/1.0.8...1.0.9)

## 1.0.8 (2017-01-17)

[Compare `typedoc-plugin-external-module-name` versions 1.0.7 and 1.0.8](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/1.0.7...1.0.8)

### Bug Fixes

* **regexp:** Fix the module match regexp. ([db4232d](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/db4232d))

## 1.0.7 (2017-01-01)

[Compare `typedoc-plugin-external-module-name` versions 1.0.6 and 1.0.7](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/1.0.6...1.0.7)

## 1.0.6 (2017-01-01)

[Compare `typedoc-plugin-external-module-name` versions 1.0.5 and 1.0.6](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/1.0.5...1.0.6)

## 1.0.5 (2016-12-11)

[Compare `typedoc-plugin-external-module-name` versions 1.0.4 and 1.0.5](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/1.0.4...1.0.5)

### Features

* Remove tags from docs after processing ([ec6892c](https://github.com/christopherthielen/typedoc-plugin-external-module-name/commit/ec6892c))

## 1.0.4 (2016-10-16)

[Compare `typedoc-plugin-external-module-name` versions 1.0.3 and 1.0.4](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/1.0.3...1.0.4)

## 1.0.3 (2016-10-16)

[Compare `typedoc-plugin-external-module-name` versions 1.0.2 and 1.0.3](https://github.com/christopherthielen/typedoc-plugin-external-module-name/compare/1.0.2...1.0.3)

## 1.0.2 (2016-07-13)
