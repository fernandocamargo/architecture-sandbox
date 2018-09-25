import update from "immutability-helper";

export const connect = state => promise =>
  update(state, {
    network: {
      $add: [[promise]]
    }
  });

export const disconnect = state => promise =>
  update(state, {
    network: {
      $remove: [promise]
    }
  });

export const log = state => params =>
  update(state, {
    history: {
      [params.fingerprint]: (fingerprint = {}) =>
        update(fingerprint, {
          [params.timestamp]: (timestamp = {}) =>
            update(timestamp, {
              $merge: params.details
            })
        })
    }
  });

export const dismiss = state => params =>
  update(state, {
    history: {
      [params.fingerprint]: (fingerprint = {}) =>
        update(fingerprint, {
          $unset: [params.timestamp]
        })
    }
  });
