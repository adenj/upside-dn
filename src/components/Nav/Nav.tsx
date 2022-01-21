import { Box, Text, Container, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "../Link";
import { Logo } from "../Logo/Logo";
import { Link as ReactRouterLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSession } from "../../hooks/useSession";
import { useExpenseAccess } from "../../hooks/useExpenseAccess";
import { UserMenu } from "./UserMenu";

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
          <ReactRouterLink to="/">
            <Logo />
          </ReactRouterLink>
          <Flex gridGap={"10px"}>
            {session ? (
              <>
                <NavItem label="Feed" path="/feed" />
                <NavItem label="Savers" path="/savers" />
                {hasExpenseAccess && (
                  <NavItem label="Expenses" path="/expenses" />
                )}
                <UserMenu />
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
