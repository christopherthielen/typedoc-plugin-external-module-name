#!node

var pkg = require('./package.json');
let ver = pkg.version;

console.log("Run this command to publish:\n\n")
console.log("git tag " + ver + " && git push origin " + ver + " && npm publish\n\n\n");
