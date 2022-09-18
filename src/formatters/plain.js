import _ from 'lodash';

const buildEnding = (status, previousValue, newValue) => {
  const prepareValue = (value) => {
    if (_.isObject(value)) return '[complex value]';
    if (typeof value === 'string') return `'${value}'`;

    return value;
  };

  const preparedPreviousValue = prepareValue(previousValue);
  const preparedNewValue = prepareValue(newValue);

  switch (status) {
    case 'updated':
      return `${status}. From ${preparedPreviousValue} to ${preparedNewValue}`;
    case 'added':
      return `${status} with value: ${preparedNewValue}`;
    case 'removed':
    default:
      return `${status}`;
  }
};

const plain = (coll) => {
  const iter = (currentNode, currentChain) => {
    const lines = currentNode
      .filter((node) => {
        const { status, children } = node;
        if (status === 'unchanged' && _.isEmpty(children)) {
          return false;
        }

        return true;
      })
      .flatMap((node) => {
        const {
          name, status, children, oldValue, freshValue,
        } = node;

        const chain = (currentChain === '') ? name : currentChain.concat('.', name);

        if (!_.isEmpty(children)) {
          return iter(children, chain);
        }

        const phraseEnding = buildEnding(status, oldValue, freshValue);
        return `Property '${chain}' was ${phraseEnding}`;
      })
      .join('\n');

    return lines;
  };

  return iter(coll, '');
};

export default plain;
