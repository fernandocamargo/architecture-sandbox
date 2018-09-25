import React from "react";
import { compose } from "recompose";

import DB from "components/db";

export default compose(component => props => <DB {...props}>{component}</DB>);
