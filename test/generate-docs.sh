#!/usr/bin/env bash
echo "Generating docs..."

function generate {
  TYPE=$1
  TSCONFIG="tsconfig.${TYPE}.json"
  echo "Copying $TSCONFIG to tsconfig.json"
  cp tsconfig.${TYPE}.json tsconfig.json
  echo "Building docs into dist/${TYPE}"

  # Typedoc 0.9 and 0.10 required a source file on the command line
  if [[ "$TYPEDOC_VERSION" == "0.9.0" ]] || [[ "$TYPEDOC_VERSION" == "0.10.0" ]] ; then
    SRCDIR=(${TYPE//-*/});
    echo SRCDIR= $SRCDIR
    npx typedoc --out dist/${TYPE} src/${SRCDIR}/index.ts
  else
    npx typedoc --out dist/${TYPE}
  fi

  echo "Deleting tsconfig.json"
  rm tsconfig.json
}

echo "generate annotations"
generate annotations
echo "generate automatic"
generate automatic
echo "generate automatic-nofiles"
generate automatic-nofiles
echo "generate custom"
generate custom
