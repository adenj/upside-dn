import { ColorModeScript } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import { AccountsProvider } from "./providers/AccountsProvider";
import { QueryProvider } from "./providers/QueryProvider";
import { TokenProvider } from "./providers/TokenProvider";

ReactDOM.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode="dark" />
    <BrowserRouter>
      <QueryProvider>
        <TokenProvider>
          <AccountsProvider>
            <App />
          </AccountsProvider>
        </TokenProvider>
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);