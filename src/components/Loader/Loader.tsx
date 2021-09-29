import React from "react";
import { Flex } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/react";

export const Loader = () => (
  <Flex alignItems="center" justifyContent="center">
    <Spinner size="xl" label="Loading data" />
  </Flex>
);
