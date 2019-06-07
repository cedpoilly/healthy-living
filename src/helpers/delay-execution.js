export const executeAfterDelay = (delay, callback) => {
  return new Promise(resolve => setTimeout(resolve, delay)).then(response => {
    console.log(new Date().getSeconds(), "delayed");
    return callback();
  });
};
