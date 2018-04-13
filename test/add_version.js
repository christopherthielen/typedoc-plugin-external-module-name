#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const { execSync } = require('child_process');

const version = process.argv[2];
if (!version) {
  console.error('Please specify the version, i.e., 0.20.0');
  process.exit(1);
}

const DIR = `typedoc-${version}`;
const DOWNSTREAMS = '../../downstream_projects.json';
const PACKAGEJSON = 'package.json';

fs.mkdirSync(DIR);
process.chdir(DIR);
execSync('tar -xzf ../typedoc-latest.tgz');

const package = JSON.parse(fs.readFileSync(PACKAGEJSON));
package.name = package.name.replace('latest', version);
package.description = package.description.replace('latest', version);
package.devDependencies.typedoc = version;
fs.writeFileSync(PACKAGEJSON, JSON.stringify(package, null, 2));

const downstreams = JSON.parse(fs.readFileSync(DOWNSTREAMS));
downstreams.projects = downstream.projects || {};
downstreams.projects[DIR] = `./test/${DIR}`;
fs.writeFileSync(DOWNSTREAMS, JSON.stringify(downstreams, null, 2));
