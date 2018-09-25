import noop from "lodash/noop";

export const shutdown = (_, promise) => promise.cancel();

export default {
  componentDidMount() {
    const {
      props: { load = noop, register = noop }
    } = this;

    register();
    load();
  },
  componentWillUnmount() {
    const {
      props: { deregister = noop, network }
    } = this;

    network.forEach(shutdown);

    deregister();
  }
};
