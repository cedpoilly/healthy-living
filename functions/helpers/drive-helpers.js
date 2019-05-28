export function makeImageDescriptionMap(files) {
  let imageDescriptionMap = {};

  files.forEach(file => {
    const elements = file.description.split(" ");

    if (elements.length <= 1) {
      return false;
    }

    const feature = elements[1];
    const position = elements[2];
    const selection = elements[3];

    const curentSelectionMap = (imageDescriptionMap[feature] || {})
      .selectionMap;

    const currentSelectionMapItems = (curentSelectionMap || {})[selection];

    imageDescriptionMap[feature] = {
      ...imageDescriptionMap[feature],
      selectionMap: {
        ...curentSelectionMap,
        [selection]: {
          ...currentSelectionMapItems,
          [position]: file.id
        }
      }
    };
  });

  return imageDescriptionMap;
}

export function setLocalOrPrefixed(feature, currentElement, side) {
  if (!currentElement) {
    return;
  }

  const { code, imageIds = null } = currentElement;

  if (!imageIds) {
    return "img/" + `${feature}-` + code + ".png";
  }
  const prefix = "http://drive.google.com/uc?export=view&id=";
  const imageId = currentElement.imageIds[side];

  if (!imageId) {
    console.warn("No Image ID for");
    const keys = Object.keys(currentElement.imageIds);
    const isSideFoundInImageIds = keys.includes(side);

    if (!isSideFoundInImageIds) {
      console.error(
        `Error in data: the following item does not have the ${side} property in it's \`imageIds\`. Please check the image's description in the drive. `
      );
    }
  }
  return `${prefix}${imageId}`;
}

export function addImageIdsToCurrentItems(currentItems, imageDescriptions) {
  return currentItems.map(item => {
    const imageIds = imageDescriptions[item.featureId]
      ? imageDescriptions[item.featureId].selectionMap[item.sampleCode]
      : null;

    const updatedItem = {
      ...item,
      imageIds
    };
    return updatedItem;
  });
}
