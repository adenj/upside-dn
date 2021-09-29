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

export const App = () => {
  const { isLoading } = useAccounts();
  return (
    <ChakraProvider theme={theme}>
      <Nav />
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <Router>
            <Home path="/" />
            <Savers path="/savers" />
            <Saver path="/savers/:id" />
          </Router>
        )}
      </Container>
    </ChakraProvider>
  );
};
