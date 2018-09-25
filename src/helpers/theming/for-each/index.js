import { css } from "react-emotion/macro";

export const create = (selector, ...params) => (stack, entry, index) =>
  stack.concat(css(selector(...entry, ...params)));

export default dictionary => ({
  create: (...params) => {
    const collection = Array.isArray(dictionary)
      ? dictionary.map(({ name, ...props }) => [name, props])
      : Object.entries(dictionary);

    return collection.reduce(create(...params), []);
  }
});
