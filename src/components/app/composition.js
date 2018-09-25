import { compose } from "recompose";
import { connect as withRedux } from "react-redux";
import { withRouter } from "react-router-dom";

import withStatics from "helpers/rendering/statics/set";

import * as statics from "./statics";
import selectors from "./selectors";
import withStyle from "./style";

export default compose(
  withStyle,
  withRouter,
  withRedux(selectors),
  withStatics(statics)
);
