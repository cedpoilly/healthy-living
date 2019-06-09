export const getItemAndIndex = (list, fieldValue, fieldName) => {
  const item = list.find(item => fieldValue === item[fieldName]);
  const index = list.indexOf(item);
  return { item, index };
};

export const getReverseIndex = (list, targetItem) => {
  const reversedList = [...list].reverse();

  const reversedIndex = reversedList.indexOf(targetItem);

  return reversedIndex;
};

export const isPresentInList = (itemToCheck, fieldName, list) => {
  const item = list.find(item => {
    return itemToCheck[fieldName] === item[fieldName];
  });

  return !!item;
};

export const removeItemFromList = (list, item) => {
  const index = list.indexOf(item);

  if (index < 0) {
    return [...list];
  }

  const start = [...list].slice(0, index);
  const end = [...list].slice(index + 1, list.length);

  return [...start, ...end];
};

export const isLastInList = (list, fieldValue, fieldName) => {
  const item = list.find(item => item[fieldName] === fieldValue);

  if (!item) {
    return false;
  }

  return list.indexOf(item) === list.length - 1;
};

export const updateInList = (list, item) => {
  const foundItem = list.find(event => event.title === item.title);

  const indexInList = list.indexOf(foundItem);

  const newList = [...list];

  newList[indexInList] = item;

  return newList;
};

/**
 * Find the child in a list of potential parents
 *
 * @param {array} list list of main events
 * @param {object} item child to find
 * @param {string} groupName name of the field to look in parent
 */
export function findParentInList(list, item, groupName) {
  return list.reduce((parent, main) => {
    if (!main[groupName]) {
      return parent;
    }

    const element = main[groupName].find(
      element => item.title === element.title
    );

    const isParent = main[groupName].indexOf(element) > -1;

    if (isParent) {
      parent = main;
    }

    return parent;
  }, {});
}

export const isLastInParentList = (list, item, groupName) => {
  let isLast = false;

  list.forEach(event => {
    if (!event.linkedItems || !event.linkedItems.length) {
      return;
    }

    isLast = isLastInList(event.linkedItems, item, groupName);
  });

  return isLast;
};
