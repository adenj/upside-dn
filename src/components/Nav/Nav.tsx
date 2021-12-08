import { Box, Text, Grid, Flex } from "@chakra-ui/layout";
import React from "react";
import { Container, GridItem } from "@chakra-ui/react";
import {} from "react-router-dom";
import { Link } from "../Link";
import { Logo } from "../Logo/Logo";
import { useLocation } from "react-router-dom";
import { useToken } from "../../hooks/useToken";
import { useSession } from "../../hooks/useSession";

export const Nav = () => {
  const { token } = useToken();
  const { session } = useSession();
  return (
    <Box as="nav" paddingY="4">
      <Container>
        {token ? (
          <Grid templateColumns="3fr 2fr 2fr 2fr" alignItems="center">
            <GridItem>
              <Logo />
            </GridItem>
            {session ? (
              <>
                <NavItem label="Feed" path="/feed" />
                <NavItem label="Savers" path="/savers" />
                <NavItem label="Settings" path="/settings" />
              </>
            ) : null}
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
