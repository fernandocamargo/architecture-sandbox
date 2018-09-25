import load from "helpers/rendering/load";

export const Home = load(() =>
  import("components/pages/home" /* webpackChunkName: "home" */)
);

export const About = load(() =>
  import("components/pages/about" /* webpackChunkName: "about" */)
);
