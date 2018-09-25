import { getDisplayName } from "recompose";

export const namespaced = mutation => ({ children }) => state => ({
  volatile: {
    [getDisplayName(children)]: mutation
  }
});

export const register = () => namespaced({ $set: {} });

export const deregister = () => ({ children }) => state => ({
  volatile: {
    $unset: [getDisplayName(children)]
  }
});
