import { Box, Text, Container, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "../Link";
import { Logo } from "../Logo/Logo";
import { Link as ReactRouterLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ROOT_PATH, FEED_PATH, SAVERS_PATH } from "../../constants/routes";
import { ColorModeSwitcher } from "../ColorModeSwitcher/ColorModeSwitcher";

export const Nav = () => {
  return (
    <Box as="nav" paddingBottom="4" paddingTop="8">
      <Container>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={["column", "row"]}
        >
          <ReactRouterLink to={ROOT_PATH}>
            <Logo />
          </ReactRouterLink>
          <Flex gridGap={"10px"}>
            <NavItem label="Feed" path={FEED_PATH} />
            <NavItem label="Savers" path={SAVERS_PATH} />
            <ColorModeSwitcher />
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
          (path === SAVERS_PATH && location.pathname.includes(path))
            ? "brand.orange"
            : "default"
        }
      >
        {label}
      </Text>
    </Link>
  );
};
