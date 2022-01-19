import React from "react";
import {
  Box,
  Icon,
  Text,
  Link,
  Flex,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoLogoGithub } from "react-icons/io5";
import { GITHUB_REPOSITORY } from "../../constants/links";
import { background } from "../../constants/colorModes";

export const Footer = () => {
  const bgColor = useColorModeValue(background.light, background.dark);
  return (
    <Box paddingY={12} marginTop={8} bg={bgColor}>
      <Container>
        <Flex
          justifyContent="space-between"
          flexDirection={["column", "row"]}
          gridGap={"10"}
        >
          <Text>This project is not affiliated with Up Bank</Text>
          <Link
            isExternal
            href={GITHUB_REPOSITORY}
            fontWeight="bold"
            display="flex"
            alignItems="center"
          >
            <Icon as={IoLogoGithub} boxSize={6} marginRight={2} />
            Github
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};
