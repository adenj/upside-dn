import { Box, Text, Grid, Flex } from "@chakra-ui/layout";
import React from "react";
import { Container, GridItem } from "@chakra-ui/react";
import { ColorModeToggle } from "../ColorModeToggle/ColorModeToggle";
import { Link } from "../Link";
import { Logo } from "../Logo/Logo";
import { useLocation } from "@reach/router";
import { useToken } from "../../hooks/useToken";

export const Nav = () => {
  const { token } = useToken();
  return (
    <Box as="nav" paddingY="4">
      <Container>
        {token ? (
          <Grid templateColumns="3fr 2fr 2fr 2fr 2fr 1fr" alignItems="center">
            <GridItem>
              <Logo />
            </GridItem>
            <NavItem label="Home" path="/" />
            <NavItem label="Savers" path="/savers" />
            <NavItem label="Help" path="/help" />
            <NavItem label="Settings" path="/settings" />
            <GridItem>
              <ColorModeToggle />
            </GridItem>
          </Grid>
        ) : (
          <Flex alignItems="center" justifyContent="space-between">
            <Logo />
            <ColorModeToggle />
          </Flex>
        )}
      </Container>
    </Box>
  );
};

const NavItem = ({ path, label }: { path: string; label: string }) => {
  const location = useLocation();

  return (
    <GridItem display="flex" justifyContent="center">
      <Link to={path}>
        <Text
          padding="2"
          fontSize="lg"
          fontWeight="black"
          color={
            location.pathname === path ||
            (path === "/savers" && location.pathname.includes(path))
              ? "brand.orange"
              : "default"
          }
        >
          {label}
        </Text>
      </Link>
    </GridItem>
  );
};
