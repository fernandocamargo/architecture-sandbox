import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";

import reducers from "reducers";

export const store = createStore(
  persistReducer(
    {
      key: window.location.host,
      whitelist: ["persisted"],
      storage
    },
    reducers
  ),
  composeWithDevTools()
);

export const persistor = persistStore(store);
