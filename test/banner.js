#!/usr/bin/env node
// Updates package.json to use a different version of typedoc

const fs = require('fs');

// find the version(s) of typedoc we're testing against
// check environment variable, script argument, or use latest
process.chdir(__dirname);
const package = JSON.parse(fs.readFileSync('./package.json').toString());
const version = package.devDependencies.typedoc;
console.log('***************************************************************************************************');
console.log('*                                                                                                 *');
console.log(`*${versionMessage()}*`);
console.log('*                                                                                                 *');
console.log('***************************************************************************************************');

function versionMessage() {
  let message = `Testing against "typedoc": "${version}"`;
  let before = (97 - message.length) / 2;
  while (--before >= 0) message = ' ' + message;
  while (message.length < 97) message = message + ' ';
  return message;
}
