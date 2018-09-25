import { createElement } from "react";

export default component => ({
  with: extra => props => createElement(component, { ...props, ...extra })
});
