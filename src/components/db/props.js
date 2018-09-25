import constant from "lodash/constant";
import isString from "lodash/isString";
import isFunction from "lodash/isFunction";
import md5 from "md5";
import { isValidElement, cloneElement, createElement } from "react";
import { getDisplayName } from "recompose";

import { RUN } from "actions";
import { register, deregister } from "mutations";
import Promise from "helpers/promise";
import ensure from "helpers/array/ensure";
import replace from "helpers/object/replace";

export const dig = (stack, [_, activity]) =>
  stack.concat(Object.entries(activity));

export const wrap = promise =>
  new Promise((resolve, reject) => promise.then(resolve).catch(reject));

export const execute = (...params) => callback => callback(...params);

export const getType = method => `${RUN}: ${method}`;

export const printArgs = params => params.map(JSON.stringify).join(", ");

export const isThenable = object =>
  object instanceof window.Promise || object instanceof Promise;

export const bindTo = props => (path, method) => {
  const { children, connect, disconnect, log, dismiss, dispatch } = props;
  const namespace = [getDisplayName(children) || md5(method), ...path].join(
    "."
  );
  const wrapped = (...params) => {
    const response = method(...params);
    const type = getType(`${namespace}(${printArgs(params)});`);
    const start = new Date();
    const timestamp = start.getTime();
    const success = ({ mutation = [], output, error }) => {
      log({
        fingerprint: namespace,
        details: {
          dismiss: dismiss.bind(this, { fingerprint: namespace, timestamp }),
          finish: new Date(),
          loading: false,
          ...(!!output && { output }),
          ...(!!error && { error })
        },
        timestamp
      });

      dispatch({
        mutation: ensure(mutation).map(execute(props)),
        type
      });
    };
    const receive = promise => (...resolved) => {
      disconnect(promise);

      return success(...resolved);
    };
    const async = () => {
      const promise = wrap(response);

      connect(promise);

      return promise.then(receive(promise)).catch(receive(promise));
    };

    log({
      details: {
        loading: true,
        params,
        path,
        start
      },
      fingerprint: namespace,
      timestamp
    });

    return !isThenable(response) ? success(response) : async();
  };

  return Object.assign(wrapped, { fingerprint: namespace });
};

export const listenTo = listenable => settings => {
  const listeners = ensure(settings);
  const extract = props => (
    stack,
    { prop, method = {}, params = constant([]), format }
  ) => {
    const { fingerprint } = method;
    const $params = isFunction(params) ? params(props) : params;
    const $$params = !Array.isArray($params) ? [$params] : $params;

    const find = (stack, [timestamp, details]) => {
      const namespace = details.path.join(".");
      const criteria = [
        ...(isString(method) ? [!String(namespace).startsWith(method)] : []),
        ...(!!$$params.length
          ? [!String(details.params).startsWith($$params)]
          : [])
      ];
      const match = !criteria.length || !criteria.filter(Boolean).length;

      return !match ? stack : stack.concat({ ...details, timestamp });
    };
    const flatten = object => Object.entries(object).reduce(dig, []);
    const getChannel = () =>
      !!fingerprint
        ? Object.entries(listenable[fingerprint] || {})
        : flatten(listenable).sort();
    const events = getChannel().reduce(find, []);
    const broadcast = format ? format(events) : events;
    const value = broadcast || {};
    const getValue = () => {
      switch (true) {
        case !prop:
          return value;
        case isFunction(prop):
          return prop(value);
        default:
          return { [prop]: value };
      }
    };

    return Object.assign(stack, getValue());
  };
  const getListenersFrom = props => listeners.reduce(extract(props), {});

  return {
    clone: component =>
      cloneElement(component, { key: md5(component), ...getListenersFrom() }),
    wrap: component => props =>
      createElement(component, {
        key: md5(component),
        ...props,
        ...getListenersFrom(props)
      }),
    create: component =>
      createElement(component, { key: md5(component), ...getListenersFrom() })
  };
};

export const omitted = [
  "dispatch",
  "register",
  "deregister",
  "history",
  "log",
  "dismiss",
  "network",
  "connect",
  "disconnect"
];

export default props => {
  const { children, history } = props;
  const { DB = Object.create } = children;
  const namespace = getDisplayName(children);
  const listen = listenTo(history);
  const Listen = ({ children, to, as, ...settings }) =>
    ensure(children).map(child => {
      const method = isValidElement(child) ? "clone" : "create";
      const listener = listen({
        prop: as,
        method: to,
        ...settings
      })[method];

      return listener(child);
    });

  return {
    ...replace({
      ...DB({ ...props, query: () => {} }),
      register: () => ({ mutation: register(namespace) }),
      deregister: () => ({ mutation: deregister(namespace) })
    }).with(bindTo(props)),
    Listen,
    listen
  };
};
