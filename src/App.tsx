import React, { ReactElement } from "react";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
import { theme } from "./theme/theme";
import { Home } from "./views/Feed/Feed";
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

const ProtectedRoute = ({ element }: { element: ReactElement }) => {
  const { session } = useSession();

  if (!session) {
    return <Navigate to="/signup" />;
  }

  return element;
};

export const App = () => {
  const { isLoading } = useAccounts();
  const { session } = useSession();

  return (
    <ChakraProvider theme={theme}>
      <Nav />
      <Container>
        {isLoading ? (
          <Loader />
        ) : (
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
      </Container>
      <Footer />
    </ChakraProvider>
  );
};
