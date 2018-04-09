#!/usr/bin/env node

var pkg = require('./package.json');
var ver = pkg.version;

console.log('Run these commands to publish:\n\n');
console.log('npm run build && git status\n\n');
console.log("git commit -m 'publishing " + ver + "' . && git push\n\n");
console.log('git tag ' + ver + ' && git push origin ' + ver + ' && npm publish\n\n');
