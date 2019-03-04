#!/bin/bash
for i in `ls -d *0.*  | sed -e 's/typedoc-//'` ; do rm -rf typedoc-$i ; ./add_version.js $i ; done
