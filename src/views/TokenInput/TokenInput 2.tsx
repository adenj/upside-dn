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
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { ExternalLink } from "../../components/ExternalLink/ExternalLink";
import { useToken } from "../../hooks/useToken";
import { validateUpToken } from "../../utils/validateUpToken";
import { UP_GETTING_STARTED_URL, UPSIDE_DN_GITHUB_URL, UP_API_URL } from "../../constants/urls";
import { FEED_PATH } from "../../constants/routes";

const tokenFormat =
    "up:yeah:CvcB12N9J44QzWg0k8BE0Xp6N2D1uImTQ0KU0Zz11lss34W44228NMGoy1R4OD1ItmKJp1ay12AIXDEIB7L1jIc743yd32n71qRGNk1L00T6Kk1QzkXtEuj71p1HobU5";

const TOKEN_FORMAT_PLACEHOLDER = "up:yeah:fdvslkjLKJ..."

const initialState = { error: false, message: "" };

export const TokenInput = () => {
    const { setToken, token } = useToken();
    const [tokenValue, setTokenValue] = useState("");
    const [state, setState] = useState(initialState);

    const onSubmit = (e: any) => {
        e.preventDefault();

        const validToken = validateUpToken(tokenValue)
        if (validToken) {
            setToken(tokenValue);
            return
        }
        setState({
            error: true,
            message: "Invalid token format",
        });
    };

    if (token) {
        return <Navigate to={FEED_PATH} />
    }

    return (
        <Stack spacing={6}>
            <Box>
                <Heading size="lg" paddingTop={6}>
                    Upside dn
                </Heading>

                <Text>The unofficial, open-source web app for Up Bank</Text>
            </Box>
            <Box>
                <Text fontWeight="bold">How does Upside dn work?</Text>
                <Text>
                    <strong>Upside dn</strong> utilises the{" "}
                    <ExternalLink href={UP_API_URL}>Up Bank API</ExternalLink>{" "}
                    to make secure requests for your data in the browser.
                </Text>
            </Box>
            <Box>
                <Text fontWeight="bold">How do I get started?</Text>
                <Text>
                    To get started you will need to provide your{" "}
                    <ExternalLink href={UP_GETTING_STARTED_URL}>
                        Up Personal Access Token
                    </ExternalLink>
                    to the field below. Upside dn will only ever store your token within{" "}
                    <strong>your browser</strong> and nowhere else.
                </Text>
            </Box>
            <Box>
                <Text fontWeight="bold">
                    How can I trust Upside dn with my Personal Access Token?
                </Text>
                <Text>
                    This entire project is open source and available to view and
                    scrutinize on{" "}
                    <ExternalLink href={UPSIDE_DN_GITHUB_URL}>
                        Github
                    </ExternalLink>
                </Text>
            </Box>
            <Box as="form" onSubmit={onSubmit}>
                <Textarea
                    placeholder={TOKEN_FORMAT_PLACEHOLDER}
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