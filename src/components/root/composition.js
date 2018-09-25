import { compose } from "recompose";

import withStatics from "helpers/rendering/statics/set";

import * as statics from "./statics";

export default compose(withStatics(statics));
