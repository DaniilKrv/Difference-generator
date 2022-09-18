import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildASTtree from './builderASTtree.js';
import formatOutput from './formatters/index.js';

const getExtension = (filepath) => path.extname(filepath);
const getAbsolutePath = (filepath) => path.resolve(filepath);
const readFileSync = (filepath) => fs.readFileSync(filepath, 'utf-8');

export default (fpath1, fpath2, formatName = 'stylish') => {
  const ext1 = getExtension(fpath1);
  const ext2 = getExtension(fpath2);

  const parsedFile1 = parse(readFileSync(getAbsolutePath(fpath1)), ext1);
  const parsedFile2 = parse(readFileSync(getAbsolutePath(fpath2)), ext2);

  const ASTtree = buildASTtree(parsedFile1, parsedFile2);
  return formatOutput(ASTtree, formatName);
};