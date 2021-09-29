import React, { ReactNode } from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { Link as ReachLink } from "@reach/router";

interface LinkProps {
  to: string;
  children: ReactNode;
}

export const Link = ({ children, to }: LinkProps) => (
  <ChakraLink as={ReachLink} to={to}>
    {children}
  </ChakraLink>
);
