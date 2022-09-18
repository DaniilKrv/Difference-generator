/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import compare from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');
const filepath3 = getFixturePath('file3.yml');
const filepath4 = getFixturePath('file4.yaml');

const stylishFile = readFile('expectedStylish.txt');
const plainFile = readFile('expectedPlain.txt');
const jsonFile = readFile('expectedJSON.json');

describe('stylish', () => {
  test('between json-json files', () => {
    expect(compare(filepath1, filepath2)).toEqual(stylishFile);
  });

  test('between yml-yaml files', () => {
    expect(compare(filepath3, filepath4)).toEqual(stylishFile);
  });

  test('between json-yaml files', () => {
    expect(compare(filepath1, filepath4)).toEqual(stylishFile);
  });

  test('between json-yml files', () => {
    expect(compare(filepath3, filepath2)).toEqual(stylishFile);
  });
});

describe('plain', () => {
  test('between json-json files', () => {
    expect(compare(filepath1, filepath2, 'plain')).toEqual(plainFile);
  });

  test('between yml-yaml files', () => {
    expect(compare(filepath3, filepath4, 'plain')).toEqual(plainFile);
  });

  test('between json-yaml files', () => {
    expect(compare(filepath1, filepath4, 'plain')).toEqual(plainFile);
  });

  test('between json-yml files', () => {
    expect(compare(filepath3, filepath2, 'plain')).toEqual(plainFile);
  });
});

describe('JSON', () => {
  test('between json-json files', () => {
    expect(compare(filepath1, filepath2, 'json')).toEqual(jsonFile);
  });

  test('between yml-yaml files', () => {
    expect(compare(filepath3, filepath4, 'json')).toEqual(jsonFile);
  });

  test('between json-yaml files', () => {
    expect(compare(filepath1, filepath4, 'json')).toEqual(jsonFile);
  });

  test('between json-yml files', () => {
    expect(compare(filepath3, filepath2, 'json')).toEqual(jsonFile);
  });
});
