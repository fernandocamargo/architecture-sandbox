import React from "react";
import { render } from "react-dom";

import Root from "components/root";
import registerServiceWorker from "./registerServiceWorker";

export const id = "root";
export const root = document.getElementById(id);
export const { parentNode } = root;

export default render(<Root />, root);
registerServiceWorker();
