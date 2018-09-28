import last from "lodash/last";
import React, { Fragment } from "react";

import withDB from "behaviors/db";
import { namespaced } from "mutations";

export const KeywordResearch = () => <p>KeywordResearch</p>;

export const mutations = {
  setItems: ({ items }) =>
    namespaced({
      items: { $set: items }
    })
};

export const Log = ({ children }) => (
  <pre style={{ border: "solid 1px #000" }}>
    {JSON.stringify(children, null, 2)}
  </pre>
);

export const Something = ({
  items,
  load,
  search,
  Listen,
  listen,
  favorite
}) => (
  <div>
    <h1>This is the keyword page</h1>
    <Listen to="users" format={last}>
      {({ loading }) => !!loading && <p>loading...</p>}
    </Listen>
    <input value="" onChange={({ target: { value } }) => search({ value })} />
    {items.map(({ description }, index) => (
      <p key={index}>
        {`${index}-) ${description}`}
        <Listen to={favorite} params={[index]} format={last}>
          {({ loading, error, output }) => (
            <Fragment>
              <button onClick={() => favorite(index)} disabled={loading}>
                Fav me!
              </button>
              {!!error && (
                <span style={{ color: "red", marginLeft: "10px" }}>
                  {error}
                </span>
              )}
              {!!output && (
                <span style={{ color: "green", marginLeft: "10px" }}>
                  {output}
                </span>
              )}
            </Fragment>
          )}
        </Listen>
      </p>
    ))}
  </div>
);

Something.defaultProps = {
  items: []
};

Something.propTypes = {};

Something.DB = () => ({
  load: () =>
    fetch("https://api.github.com/repositories")
      .then(response => response.json())
      .then(items => ({ mutation: mutations.setItems({ items }) })),
  search: ({ value }) =>
    fetch(`https://apix.github.com/search/repositories?q=${value}`)
      .then(response => response.json())
      .then(({ items }) => ({ mutation: mutations.setItems({ items }) })),
  favorite: index =>
    new Promise((resolve, reject) =>
      window.setTimeout(
        () =>
          new Date().getTime() % 2 === 0
            ? resolve("fake message from server")
            : reject("lol nope, you failed"),
        2000
      )
    )
      .then(output => ({ output }))
      .catch(error => ({ error }))
});

export default withDB(Something);
