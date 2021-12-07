import React, { ReactNode } from "react";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

interface LinkProps {
  to: string;
  children: ReactNode;
  color?: ChakraLinkProps["color"];
  fontWeight?: ChakraLinkProps["fontWeight"];
}

export const Link = ({ children, to, color, fontWeight }: LinkProps) => (
  <ChakraLink
    as={ReactRouterLink}
    to={to}
    color={color}
    fontWeight={fontWeight}
  >
    {children}
  </ChakraLink>
);
