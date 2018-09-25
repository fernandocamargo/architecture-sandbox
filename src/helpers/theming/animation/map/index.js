import noop from "lodash/noop";

export default animations => ({ animationName: name }) => {
  const callback = animations[name] || noop;

  return callback();
};
