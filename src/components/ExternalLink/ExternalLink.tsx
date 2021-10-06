import Icon from "@chakra-ui/icon";
import { Link } from "@chakra-ui/layout";
import React, { ReactNode } from "react";
import { HiExternalLink } from "react-icons/hi";

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
}

export const ExternalLink = ({ href, children }: ExternalLinkProps) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      color="brand.orange"
      fontWeight="bold"
    >
      {children}
      <Icon as={HiExternalLink} mx="2px" />
    </Link>
  );
};
