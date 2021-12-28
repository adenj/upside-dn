import React from "react";
import { Text, Flex, Heading } from "@chakra-ui/react";
import { Link } from "../../components/Link";
import { AuthForm } from "../Auth/AuthForm";

export const SignUp = () => {
  return (
    <>
      <Flex alignItems="flex-end" justifyContent="space-between" pb="6">
        <Heading size="lg">Sign up</Heading>
        <Flex>
          <Text pr="1">Already have an account?</Text>{" "}
          <Link to="/login" color="brand.orange" fontWeight="bold">
            Login
          </Link>
        </Flex>
      </Flex>
      <AuthForm method="register" />
    </>
  );
};
