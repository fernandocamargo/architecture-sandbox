export default response =>
  new Promise(
    (resolve, reject) =>
      !!response.ok
        ? response.json().then(resolve)
        : response.text().then(reject)
  );
