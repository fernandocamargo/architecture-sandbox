import { compose, setStatic } from "recompose";

export const apply = callback => params => callback(...params);

export default properties =>
  compose(...Object.entries(properties).map(apply(setStatic)));

