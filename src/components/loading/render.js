import React from "react";

export const crash = error => {
  throw error;
};

export const debug = error => error && crash(error);

export default ({ className, error }) =>
  debug(error) && <p className={className}>Loading...</p>;
