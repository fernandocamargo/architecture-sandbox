import isPlainObject from "lodash/isPlainObject";

export const stringify = object =>
  !isPlainObject(object) && !Array.isArray(object)
    ? object
    : JSON.stringify(
        Object.entries(object)
          .sort()
          .reduce(
            (stack, [key, value]) =>
              Object.assign(stack, {
                [key]: stringify(value)
              }),
            {}
          )
      );

export default stringify;
