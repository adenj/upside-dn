import React from "react";
import { Text } from "@chakra-ui/react";
import { Link } from "../../components/Link";
import { AuthForm } from "../Auth/AuthForm";

export const SignUp = () => {
  return (
    <>
      <Text>Already have an account?</Text>
      <Link to="/login">Login</Link>
      <AuthForm method="register" />
    </>
  );
};
