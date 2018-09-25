import React from "react";
import { IntlProvider as Intl } from "react-intl";
import { Provider as Redux } from "react-redux";
import { PersistGate as ReduxPersist } from "redux-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider as Theming } from "emotion-theming";

import { locale } from "i18n";
import { store, persistor } from "store";
import theme from "theming/default";
import App from "components/app";

export default () => (
  <Intl locale={locale}>
    <Redux store={store}>
      <ReduxPersist persistor={persistor}>
        <Router>
          <Theming theme={theme}>
            <App />
          </Theming>
        </Router>
      </ReduxPersist>
    </Redux>
  </Intl>
);
