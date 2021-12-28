import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import React, { useState } from "react";
import { supabase } from "../../supabaseClient";
import { AuthForm } from "./AuthForm";
import { LoginForm } from "./LoginForm";
import { SignUpFormForm } from "./SignUpForm";

export const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) {
        throw error;
        alert("Check your email for the login link");
      }
    } catch (error) {
      alert(error.error_description || error.mesage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab>Log in</Tab>
        <Tab>Sign up</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <AuthForm method="login" />
        </TabPanel>
        <TabPanel>
          <AuthForm method="register" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
