import _ from 'lodash';

const initTree = (name, status, children = [], oldValue = '', freshValue = '') => ({
  name,
  status,
  children,
  oldValue,
  freshValue,
});

const buildASTtree = (obj1, obj2) => {
  const sortedKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const packedTree = sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (key in obj1 && key in obj2) {
      if (_.isObject(value1) && _.isObject(value2)) {
        return initTree(key, 'unchanged', buildASTtree(value1, value2), '', ''); 
      }

      if (value1 === value2) {
        return initTree(key, 'unchanged', [], value1, value1);
      }

      return initTree(key, 'updated', [], value1, value2);
    }

    if (key in obj1) {
      return initTree(key, 'removed', [], value1, '');
    }

    if (key in obj2) {
      return initTree(key, 'added', [], '', value2);
    }

    throw new Error('If you see this message, perhaps there is a problem in the program code. Check it');
  });

  return packedTree;
};

export default buildASTtree;