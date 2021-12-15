import React from "react";
import { Text } from "@chakra-ui/react";
import { Link } from "../../components/Link";
import { AuthForm } from "../Auth/AuthForm";

export const Login = () => {
  return (
    <>
      <Text>Don't have an account?</Text>
      <Link to="/signup">Sign up</Link>
      <AuthForm method="login" />
    </>
  );
};
