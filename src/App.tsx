import * as React from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { Router } from "@reach/router";
import { theme } from "./theme/theme";
import { Home } from "./views/Home/Home";
import { Nav } from "./components/Nav/Nav";
import { Savers } from "./views/Savers/Savers";
import { Saver } from "./views/Saver/Saver";
import { useAccounts } from "./hooks/useAccounts";
import { Loader } from "./components/Loader/Loader";
import { TokenPrompt } from "./views/TokenPrompt/TokenPrompt";
import { useToken } from "./hooks/useToken";
import { Settings } from "./views/Settings/Settings";

export const App = () => {
  const { isLoading, data } = useAccounts();
  const { token } = useToken();
  return (
    <ChakraProvider theme={theme}>
      <Nav />
      <Container>
        {!token && <TokenPrompt />}
        {isLoading && <Loader />}
        {data && (
          <Router>
            <Home path="/" />
            <Savers path="/savers" />
            <Saver path="/savers/:id" />
            <Settings path="/settings" />
          </Router>
        )}
      </Container>
    </ChakraProvider>
  );
};
