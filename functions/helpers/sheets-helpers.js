function valuesToObjects(values) {
  const [headers, ...data] = values;
  const objects = (() => {
    const objectList = data.map(fields => {
      const object = {};

      fields.forEach((field, index) => {
        const currentHeader = headers[index];
        object[currentHeader] = field;
      });

      return object;
    });

    return objectList;
  })();

  return objects;
}

module.exports = { valuesToObjects };
