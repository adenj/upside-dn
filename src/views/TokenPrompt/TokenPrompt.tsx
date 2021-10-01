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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToken } from "../../hooks/useToken";

const tokenFormat =
  "up:yeah:CvcB12N9J44QzWg0k8BE0Xp6N2D1uImTQ0KU0Zz11lss34W44228NMGoy1R4OD1ItmKJp1ay12AIXDEIB7L1jIc743yd32n71qRGNk1L00T6Kk1QzkXtEuj71p1HobU5";

const initialState = { error: false, message: "" };

export const TokenPrompt = () => {
  const { setToken } = useToken();
  const [tokenValue, setTokenValue] = useState("");
  const [state, setState] = useState(initialState);

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
    <Box>
      <Text>To continue, we will need your Up Personal Access token</Text>
      <Text>How do I get it?</Text>
      <form onSubmit={onSubmit}>
        <Textarea
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
        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
};
