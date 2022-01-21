import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ExternalLink } from "../ExternalLink/ExternalLink";

export const TokenInfoModal = () => (
  <Stack spacing="4">
    <Box>
      <Text fontWeight="bold">What is an Up API Key?</Text>
      <Text>
        An Up API Key is a unique string of characters that has been generated
        by Up Bank, specifically for you, to access your banking information on
        platforms other than their app.
      </Text>
    </Box>
    <Box>
      <Text fontWeight="bold">Why do you need my key?</Text>
      <Text>
        Upside dn needs your key to be able to fetch your information for the
        purpose of the app.
      </Text>
    </Box>
    <Box>
      <Text fontWeight="bold">How can I find my API Key?</Text>
      <Text>
        You will be able to access you Up API Key{" "}
        <ExternalLink href="https://api.up.com.au/getting_started">
          here
        </ExternalLink>
      </Text>
    </Box>
  </Stack>
);
