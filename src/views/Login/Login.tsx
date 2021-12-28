import React from "react";
import { Text, Flex, Heading } from "@chakra-ui/react";
import { Link } from "../../components/Link";
import { AuthForm } from "../Auth/AuthForm";

export const Login = () => {
  return (
    <>
      <Flex alignItems="flex-end" justifyContent="space-between" pb="6">
        <Heading size="lg">Login</Heading>
        <Flex>
          <Text pr="1">Don't have an account?</Text>{" "}
          <Link to="/signup" color="brand.orange" fontWeight="bold">
            Sign up
          </Link>
        </Flex>
      </Flex>
      <AuthForm method="login" />
    </>
  );
};
