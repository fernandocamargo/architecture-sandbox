export const toJSON = response => response.json();

export const get = url => window.fetch(url).then(toJSON);
