import { createElement } from "react";

import ensureArray from "helpers/array/ensure";

export default collection => ({
  render: (component, enhancement) =>
    ensureArray(collection).map(({ key, ...props }, index) =>
      createElement(component, { ...props, ...enhancement, key: key || index })
    )
});
