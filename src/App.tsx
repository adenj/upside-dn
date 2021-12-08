import React, { ReactNode, useEffect, useState, ReactElement } from "react";
import { ChakraProvider, Container, Button } from "@chakra-ui/react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import { Auth } from "./views/Auth/auth";
import { supabase } from "./supabaseClient";
import { Session } from "@supabase/gotrue-js";
import { useSession } from "./hooks/useSession";

const ProtectedRoute = ({ element }: { element: ReactElement }) => {
  const { session } = useSession();

  if (!session) {
    return <Navigate to="/" />;
  }

  return element;
};

export const App = () => {
  const { isLoading, data } = useAccounts();
  const { token } = useToken();
  const { session } = useSession();

  return (
    <ChakraProvider theme={theme}>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Nav />
      <Container>
        {!token && <TokenPrompt />}
        {isLoading && <Loader />}
        {data && token && (
          <Routes>
            <Route
              path="/"
              element={!session ? <Auth /> : <Navigate to="/feed" />}
            />
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
          </Routes>
        )}
      </Container>
      <Footer />
    </ChakraProvider>
  );
};
