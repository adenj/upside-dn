import { Stack, Text, Box, Button, Heading, Flex } from "@chakra-ui/react";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { ColorModeToggle } from "../../components/ColorModeToggle/ColorModeToggle";
import { useToken } from "../../hooks/useToken";

export const Settings = (props: RouteComponentProps) => {
  const { setToken } = useToken();
  return (
    <Box>
      <Heading textAlign="center">Settings</Heading>
      <Stack spacing={8} background="gray.900" padding={6} borderRadius="lg">
        <Flex alignItems="center" justifyContent="space-between" paddingTop={6}>
          <Stack spacing={2} flexBasis="60%">
            <Text fontSize="lg" fontWeight="bold">
              Color mode
            </Text>
            <Text fontSize="sm">
              Toggle between the eye-melting light mode, and the cool, soothing
              dark mode
            </Text>
          </Stack>
          <ColorModeToggle />
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Stack spacing={2} flexBasis="60%">
            <Text fontSize="lg" fontWeight="bold">
              Remove access
            </Text>
            <Text fontSize="sm">
              This will remove upside-dn's access to your Up Personal Access
              token
            </Text>
          </Stack>
          <Button colorScheme="red" onClick={() => setToken(null)}>
            Revoke access
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};