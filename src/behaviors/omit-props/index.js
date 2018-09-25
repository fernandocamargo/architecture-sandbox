import compose from "lodash/fp/compose";
import omit from "lodash/fp/omit";

import { mapProps } from "recompose";

export default compose(
  mapProps,
  omit
);
