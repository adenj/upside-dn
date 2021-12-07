import * as React from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
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
import { Footer } from "./components/Footer/Footer";

export const App = () => {
  const { isLoading, data } = useAccounts();
  const { token } = useToken();
  return (
    <ChakraProvider theme={theme}>
      <Nav />
      <Container>
        {!token && <TokenPrompt />}
        {isLoading && <Loader />}
        {data && token && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/savers" element={<Savers />} />
            <Route path="/savers/:id" element={<Saver />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        )}
      </Container>
      <Footer />
    </ChakraProvider>
  );
};
