import React, { ReactElement } from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import { theme } from "./theme/theme";
import { Feed } from "./views/Feed/Feed";
import { Nav } from "./components/Nav/Nav";
import { Savers } from "./views/Savers/Savers";
import { Saver } from "./views/Saver/Saver";
import { useAccounts } from "./hooks/useAccounts";
import { Loader } from "./components/Loader/Loader";
import { Footer } from "./components/Footer/Footer";
import { useToken } from "./hooks/useToken";
import { TokenInput } from "./views/TokenInput/TokenInput";
import { ROOT_PATH, FEED_PATH, TOKEN_PATH, SAVERS_PATH, SAVER_PATH } from "./constants/routes";

const ProtectedRoute = ({ element }: { element: ReactElement }) => {
  const { token } = useToken()
  if (!token) {
    return <Navigate to="/token" />;
  }

  return element;
};

export const App = () => {
  const { isLoading } = useAccounts();

  return (
    <ChakraProvider theme={theme}>
      <Nav />
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path={ROOT_PATH} element={<Navigate to={FEED_PATH} />} />
            <Route path={TOKEN_PATH} element={<TokenInput />} />
            <Route
              path={FEED_PATH}
              element={<ProtectedRoute element={<Feed />} />}
            />
            <Route
              path={SAVERS_PATH}
              element={<ProtectedRoute element={<Savers />} />}
            />
            <Route
              path={SAVER_PATH}
              element={<ProtectedRoute element={<Saver />} />}
            />
          </Routes>
        )}
      </Container>
      <Footer />
    </ChakraProvider>
  );
};
