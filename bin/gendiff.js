#!/usr/bin/env node
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-undef */
import { program } from 'commander';
import genDiff from '../src/index.js';

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format: stylish, plain, json', 'stylish')
  .action((filepath1, filepath2, options) => {
    console.log(genDiff(filepath1, filepath2 ,options.format));
  })
  .parse(process.argv);
