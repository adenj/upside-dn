import { Box, Text, Grid, Flex } from "@chakra-ui/layout";
import React from "react";
import { Container, GridItem } from "@chakra-ui/react";
import { Link } from "../Link";
import { Logo } from "../Logo/Logo";
import { useLocation } from "react-router-dom";
import { useToken } from "../../hooks/useToken";

export const Nav = () => {
  const { token } = useToken();
  return (
    <Box as="nav" paddingY="4">
      <Container>
        {token ? (
          <Grid templateColumns="3fr 2fr 2fr 2fr" alignItems="center">
            <GridItem>
              <Logo />
            </GridItem>
            <NavItem label="Home" path="/" />
            <NavItem label="Savers" path="/savers" />
            {/* <NavItem label="Help" path="/help" /> */}
            <NavItem label="Settings" path="/settings" />
          </Grid>
        ) : (
          <Flex alignItems="center" justifyContent="space-between">
            <Logo />
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
