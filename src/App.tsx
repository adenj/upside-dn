import React, { ReactElement } from "react";
import { ChakraProvider, Container, Text } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import { theme } from "./theme/theme";
import { Home } from "./views/Home/Home";
import { Nav } from "./components/Nav/Nav";
import { Savers } from "./views/Savers/Savers";
import { Saver } from "./views/Saver/Saver";
import { useAccounts } from "./hooks/useAccounts";
import { Loader } from "./components/Loader/Loader";
import { Settings } from "./views/Settings/Settings";
import { Footer } from "./components/Footer/Footer";
import { useSession } from "./hooks/useSession";
import { Login } from "./views/Login/Login";
import { SignUp } from "./views/SignUp/SignUp";
import { Expenses } from "./views/Expenses/Expenses";
import { useToken } from "./hooks/useToken";
import { TokenPrompt } from "./views/TokenPrompt/TokenPrompt";

const ProtectedRoute = ({ element }: { element: ReactElement }) => {
  const { session } = useSession();

  if (!session) {
    return <Navigate to="/login" />;
  }

  return element;
};

export const App = () => {
  const { isLoading, data } = useAccounts();
  const { session } = useSession();
  const { token } = useToken();

  return (
    <ChakraProvider theme={theme}>
      <Nav />
      <Container>
        {!token && session ? (
          <TokenPrompt />
        ) : (
          <>
            {isLoading && <Loader />}
            {data && (
              <Routes>
                <Route path="/" element={<Navigate to="/feed" />} />
                <Route
                  path="/feed"
                  element={<ProtectedRoute element={<Home />} />}
                />
                <Route
                  path="/savers"
                  element={<ProtectedRoute element={<Savers />} />}
                />
                <Route
                  path="/savers/:id"
                  element={<ProtectedRoute element={<Saver />} />}
                />
                <Route
                  path="/settings"
                  element={<ProtectedRoute element={<Settings />} />}
                />
                <Route
                  path="/expenses"
                  element={<ProtectedRoute element={<Expenses />} />}
                />
                <Route
                  path="/login"
                  element={session ? <Navigate to="/feed" /> : <Login />}
                />
                <Route
                  path="/signup"
                  element={session ? <Navigate to="/feed" /> : <SignUp />}
                />
              </Routes>
            )}
          </>
        )}
      </Container>
      <Footer />
    </ChakraProvider>
  );
};
