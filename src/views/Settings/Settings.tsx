import {
  Stack,
  Text,
  Box,
  Button,
  Heading,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ColorModeToggle } from "../../components/ColorModeToggle/ColorModeToggle";
import { background } from "../../constants/colorModes";
import { useToken } from "../../hooks/useToken";
import { supabase } from "../../supabaseClient";

export const Settings = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue(background.light, background.dark);

  const revokeToken = () => {
    // @ts-ignore
    supabase.auth.update({ data: { api_key: null } });
    navigate("/");
  };

  const logout = () => {
    supabase.auth.signOut();
  };

  return (
    <Box>
      <Heading textAlign="center">Settings</Heading>
      <Stack
        spacing={8}
        background={bgColor}
        padding={6}
        borderRadius="lg"
        marginTop={6}
      >
        <Flex alignItems="center" justifyContent="space-between">
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
          <Button colorScheme="red" onClick={revokeToken}>
            Revoke access
          </Button>
        </Flex>
        <Flex justifyContent="flex-end">
          <Button colorScheme="blue" onClick={logout}>
            Log out
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};
