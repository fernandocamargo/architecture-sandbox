import React from "react";
import { Link, Route } from "react-router-dom";

import { Home, About } from "components/pages";

export default ({ children, className }) => (
  <div className={className}>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
    <Route path="/" component={Home} exact />
    <Route path="/about" component={About} exact />
  </div>
);
