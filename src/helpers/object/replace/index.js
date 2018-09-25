export const replace = (object, path = []) => ({
  with: replacement =>
    Object.entries(object).reduce((stack, [key, value]) => {
      const deep = !!Object.keys(value).length;
      const location = path.concat(key);

      return Object.assign(stack, {
        [key]: deep
          ? replace(value, location).with(replacement)
          : replacement(location, value)
      });
    }, {})
});

export default replace;
