export const markNextAs = (list, prevTag, tag) => {
  let nextMarked = false;

  const markedList = list.reduce((markedList, item) => {
    if (!nextMarked && item.visual === prevTag) {
      item.visual = tag;
      nextMarked = true;
    }

    markedList = [...markedList, item];
    return markedList;
  }, []);

  return markedList;
};
