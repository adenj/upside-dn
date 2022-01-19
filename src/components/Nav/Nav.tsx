import { Box, Text, Grid, Flex } from "@chakra-ui/layout";
import React from "react";
import { Container, GridItem } from "@chakra-ui/react";
import {} from "react-router-dom";
import { Link } from "../Link";
import { Logo } from "../Logo/Logo";
import { useLocation } from "react-router-dom";
import { useSession } from "../../hooks/useSession";
import { useExpenseAccess } from "../../hooks/useExpenseAccess";

export const Nav = () => {
  const { session } = useSession();
  const { hasExpenseAccess } = useExpenseAccess();
  return (
    <Box as="nav" paddingBottom="4" paddingTop="8">
      <Container>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={["column", "row"]}
        >
          <Logo />
          <Flex gridGap={"10px"}>
            {session ? (
              <>
                <NavItem label="Feed" path="/feed" />
                <NavItem label="Savers" path="/savers" />
                {hasExpenseAccess && (
                  <NavItem label="Expenses" path="/expenses" />
                )}
                <NavItem label="Settings" path="/settings" />
              </>
            ) : null}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

const NavItem = ({ path, label }: { path: string; label: string }) => {
  const location = useLocation();

  return (
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
  );
};
