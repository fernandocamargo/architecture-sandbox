import { RUN } from "actions";

export default dispatch => ({
  run: ({ method, params, mutation }) =>
    dispatch({
      type: `${RUN}: ${method}`,
      params,
      mutation
    })
});
