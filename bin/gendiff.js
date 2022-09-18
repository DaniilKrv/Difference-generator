#!/usr/bin/env node
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format: stylish, plain, json', 'stylish')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2, options) => {
    return genDiff(filepath1, filepath2 ,options.format)
  })
  .parse(process.argv);
