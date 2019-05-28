export const renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => {
  const newObject = {
    [newProp]: old,
    ...others
  };

  return newObject;
};
