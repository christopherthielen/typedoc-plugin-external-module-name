#!/usr/bin/env node
// Updates package.json to use a different version of typedoc

const fs = require('fs');

// find the version(s) of typedoc we're testing against
// check environment variable, script argument, or use latest
process.chdir(__dirname);
const version = process.env.TYPEDOC_VERSION || process.argv[2] || 'latest';
const testPackageJson = JSON.parse(fs.readFileSync('./package.json').toString());
testPackageJson.dependencies.typedoc = version;
fs.writeFileSync('./package.json', JSON.stringify(testPackageJson, null, 2));
