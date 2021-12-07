import React, { useEffect, useState } from "react";
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
import { Footer } from "./components/Footer/Footer";
import { Auth } from "./views/Auth/auth";
import { supabase } from "./supabaseClient";
import { Session } from "@supabase/gotrue-js";

export const App = () => {
  const { isLoading, data } = useAccounts();
  const { token } = useToken();

  const [session, setSession] = useState<null | Session>(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_, sess) => {
      setSession(sess);
    });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <Nav />
      <Container>
        {!token && <TokenPrompt />}
        {isLoading && <Loader />}
        {data && token && (
          <Router>
            <Home path="/feed" />
            <Savers path="/savers" />
            <Saver path="/savers/:id" />
            <Settings path="/settings" />
            <Auth path="/" />
          </Router>
        )}
      </Container>
      <Footer />
    </ChakraProvider>
  );
};
