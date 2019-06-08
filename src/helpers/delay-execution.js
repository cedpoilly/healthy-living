export const executeAfterDelay = (delay, callback) => {
  return new Promise(resolve => setTimeout(resolve, delay)).then(response => {
    return callback();
  });
};
