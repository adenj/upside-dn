import React, { ReactNode } from "react";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { Link as ReachLink } from "@reach/router";

interface LinkProps {
  to: string;
  children: ReactNode;
  color?: ChakraLinkProps["color"];
  fontWeight?: ChakraLinkProps["fontWeight"];
}

export const Link = ({ children, to, color, fontWeight }: LinkProps) => (
  <ChakraLink as={ReachLink} to={to} color={color} fontWeight={fontWeight}>
    {children}
  </ChakraLink>
);
