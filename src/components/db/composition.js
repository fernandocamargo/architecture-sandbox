import {
  compose,
  withStateHandlers,
  withProps,
  lifecycle as withLifecycle
} from "recompose";
import { connect as withRedux } from "react-redux";

import withStatics from "helpers/rendering/statics/set";
import withoutProps from "behaviors/omit-props";

import * as statics from "./statics";
import initialState from "./initial-state";
import * as reducers from "./reducers";
import props, { omitted } from "./props";
import selectors from "./selectors";
import cycle from "./cycle";

export default compose(
  withRedux(selectors),
  withStateHandlers(initialState, reducers),
  withProps(props),
  withLifecycle(cycle),
  withoutProps(omitted),
  withStatics(statics)
);
