import update from "immutability-helper";

import ensure from "helpers/array/ensure";
import { RUN } from "actions";

import initialState from "./initial-state";

export const apply = (state, mutation) => update(state, mutation(state));

export default (state = initialState(), { type, mutation }) => {
  switch (true) {
    case String(type).startsWith(RUN):
      return ensure(mutation).reduce(apply, state);
    default:
      return state;
  }
};
