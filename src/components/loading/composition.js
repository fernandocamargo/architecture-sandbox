import { compose } from "recompose";

import withStatics from "helpers/rendering/statics/set";

import * as statics from "./statics";
import withStyle from "./style";

export default compose(
  withStyle,
  withStatics(statics)
);
