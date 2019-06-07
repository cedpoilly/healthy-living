export const getItemAndIndex = (list, fieldValue, fieldName) => {
  const item = list.find(item => fieldValue === item[fieldName]);
  const index = list.indexOf(item);
  return { item, index };
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
