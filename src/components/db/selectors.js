import { getDisplayName } from "recompose";

export default ({ volatile, persisted }, { children }) => ({
  ...volatile[getDisplayName(children)],
  ...persisted
});
