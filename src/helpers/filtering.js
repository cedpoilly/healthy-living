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
