#!/usr/bin/env node
import { program } from 'commander';
import fs from 'fs';
import _ from 'lodash';

const compare = (filepath1, filepath2) => {
  const file1 = JSON.parse(fs.readFileSync(filepath1, {encoding:'utf8'}));
  const file2 = JSON.parse(fs.readFileSync(filepath2, {encoding:'utf8'}));
  const firstKeys = Object.keys(file1);
  const secondKeys = Object.keys(file2);
  const keys = firstKeys.concat(secondKeys); 
  keys.sort();
  const result = {};
  for (const key of keys) {
    if (file1.hasOwnProperty(key)) {
      if (file2.hasOwnProperty(key)) {
        if (file1[key] === file2[key]) {
          result[key] = file1[key];
        } else {
          result[`- ${key}`] = file1[key];
          result[`+ ${key}`] = file2[key];
        }
      } else {
        result[`- ${key}`] = file1[key];
      }
    } else {
      result[`+ ${key}`] = file2[key];
    }
  }
  console.log(result);
  return result;
};


program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    return compare(filepath1, filepath2)
  })
  .parse(process.argv);
