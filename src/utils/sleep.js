const sleep = time =>
  new Promise(function(resolve) {
    setTimeout(() => {
      resolve();
    }, time);
  });

export default sleep;
