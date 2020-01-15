#!/bin/bash
cd `dirname $0`;
cd typedoc-latest;
yarn clean;
tar -czf ../typedoc-latest.tgz .
cd ..
