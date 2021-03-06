import { ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import * as React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import { AccountsProvider } from "./providers/AccountsProvider";
import { QueryProvider } from "./providers/QueryProvider";
import { TokenProvider } from "./providers/TokenProvider";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import { AuthProvider } from "./providers/AuthProvider";

import "react-datepicker/dist/react-datepicker.css";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode="dark" />
    <BrowserRouter>
      <AuthProvider>
        <QueryProvider>
          <TokenProvider>
            <AccountsProvider>
              <App />
            </AccountsProvider>
          </TokenProvider>
        </QueryProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
