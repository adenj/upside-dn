import {
  Box,
  Text,
  Textarea,
  Button,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Code,
  AccordionIcon,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { useNavigate } from "@reach/router";
import React, { useState } from "react";
import { ExternalLink } from "../../components/ExternalLink/ExternalLink";
import { useToken } from "../../hooks/useToken";

const tokenFormat =
  "up:yeah:CvcB12N9J44QzWg0k8BE0Xp6N2D1uImTQ0KU0Zz11lss34W44228NMGoy1R4OD1ItmKJp1ay12AIXDEIB7L1jIc743yd32n71qRGNk1L00T6Kk1QzkXtEuj71p1HobU5";

const initialState = { error: false, message: "" };

export const TokenPrompt = () => {
  const { setToken } = useToken();
  const [tokenValue, setTokenValue] = useState("");
  const [state, setState] = useState(initialState);
  const navigate = useNavigate();

  const onSubmit = (e: any) => {
    e.preventDefault();
    const parts = tokenValue.split(":");
    if (parts[0] !== "up" || parts[1] !== "yeah" || parts[2].length !== 128) {
      setState({
        error: true,
        message: "Invalid token format",
      });
      return;
    }
    setToken(tokenValue);
  };

  return (
    <Stack spacing={6}>
      <Box>
        <Heading size="lg" paddingTop={6}>
          Welcome to Upside dn
        </Heading>

        <Text>The unofficial, open-source web app for Up banking</Text>
      </Box>
      <Box>
        <Text fontWeight="bold">How does Upside dn work?</Text>
        <Text>
          <strong>Upside dn</strong> utilises the{" "}
          <ExternalLink href="https://api.up.com.au">Up Bank API</ExternalLink>{" "}
          to make secure requests for your data in the browser.
        </Text>
      </Box>
      <Box>
        <Text fontWeight="bold">How do I get started?</Text>
        <Text>
          To get started, you will need to provide your{" "}
          <ExternalLink href="https://api.up.com.au/getting_started">
            Up Personal Access Token
          </ExternalLink>
          to the field below. The token is only store this token on{" "}
          <strong>your computer</strong>.
        </Text>
      </Box>
      <Box>
        <Text fontWeight="bold">
          How can I trust Upside dn with my Personal Access Token?
        </Text>
        <Text>
          This entire project is open source and free to view and scrutinize on{" "}
          <ExternalLink href="https://github.com/adenj/upside-dn">
            Github
          </ExternalLink>
        </Text>
      </Box>
      <Box as="form" onSubmit={onSubmit}>
        <Textarea
          placeholder="up:yeah:fdvslkjLKJ"
          isInvalid={state.error}
          value={tokenValue}
          onChange={(e) => {
            setTokenValue(e.target.value);
            setState(initialState);
          }}
        />
        {state.error ? (
          <>
            <Accordion allowToggle paddingY={4}>
              <AccordionItem border="none">
                <AccordionButton padding={0} color="red.300">
                  Invalid format. Token must follow the following format
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel paddingTop={2} paddingX={0}>
                  <Box maxWidth="100%" wordBreak="break-word">
                    <Code children={tokenFormat} />
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </>
        ) : null}
        <Button type="submit" marginTop={4}>
          Save
        </Button>
      </Box>
    </Stack>
  );
};
