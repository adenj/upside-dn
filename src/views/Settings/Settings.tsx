import {
  Stack,
  Text,
  Box,
  Button,
  Heading,
  Flex,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Alert,
  AlertIcon,
  AlertDescription,
  CloseButton,
  AlertTitle,
  useToast,
} from "@chakra-ui/react";
import { encode } from "querystring";
import React, { useState } from "react";
import { background } from "../../constants/colorModes";
import { supabase } from "../../supabaseClient";

const VERIFICATION_PHRASE = "delete";

export const Settings = () => {
  const bgColor = useColorModeValue(background.light, background.dark);
  const {
    isOpen: isDeleteModalOpen,
    onOpen: deleteModalOnOpen,
    onClose: deleteModalOnClose,
  } = useDisclosure();
  const [comments, setComments] = useState("");
  const [verification, setVerification] = useState("");
  const [deleteFormStatus, setDeleteFormStatus] = useState("inProgress");
  const [formError, setFormError] = useState(false);
  const showToast = useToast();

  const deleteFormOnSubmit = async () => {
    const user = supabase.auth.user();
    setDeleteFormStatus("submitting");
    try {
      await fetch("/data-delete?no-cache=1", {
        method: "POST",
        body: encode({
          uid: user!.id,
          comments,
        }),
      });
      setFormError(false);
      showToast({
        title: "Requested submitted",
        description:
          "We will get back to you to confirm once your data has been deleted",
        status: "success",
        duration: 10000,
        isClosable: false,
      });
    } catch (error) {
      console.error(error);
      setFormError(true);
    } finally {
      setDeleteFormStatus("submitted");
      deleteModalOnClose();
    }
  };

  return (
    <>
      <Box>
        <Heading textAlign="center">Settings</Heading>
        <Stack
          spacing={8}
          background={bgColor}
          padding={6}
          borderRadius="lg"
          marginTop={6}
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            flexDirection={["column", "row"]}
            gridGap="8px"
          >
            <Stack spacing={2} flexBasis="60%">
              <Text fontSize="lg" fontWeight="bold">
                Request data deletion
              </Text>
              <Text fontSize="sm">
                You can request to have your account, as well as all related
                data permanently deleted.
              </Text>
            </Stack>
            <Flex justifyContent="flex-end">
              <Button
                onClick={deleteModalOnOpen}
                colorScheme="red"
                width={["full", "initial"]}
              >
                Request deletion
              </Button>
            </Flex>
          </Flex>
        </Stack>
      </Box>

      <Modal isOpen={isDeleteModalOpen} onClose={deleteModalOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Request data deletion</ModalHeader>
          <ModalCloseButton />
          <form
            // @ts-ignore
            netlify
            name="data-delete"
            method="post"
            action="/"
            data-netlify="true"
          >
            <ModalBody>
              <Text>
                Upside dn never stores any financial or personally identifying
                data, nor does it ever share your email or Up API Key with third
                parties.
              </Text>
              <br />
              <Text>
                If you would still like to proceed and request to have all of
                your data removed from our servers, please submit the below
                form.
              </Text>
              <FormControl pt="10">
                <FormLabel>Comments (optional)</FormLabel>
                <Textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </FormControl>
              <FormControl pt="4">
                <FormLabel>
                  Confirm deletion request by typing{" "}
                  <strong>{VERIFICATION_PHRASE}</strong> into the field below
                </FormLabel>
                <Input
                  value={verification}
                  onChange={(e) => setVerification(e.target.value)}
                  placeholder={VERIFICATION_PHRASE}
                />
              </FormControl>
            </ModalBody>
            {formError && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle mr={2}>Submission error</AlertTitle>
                <AlertDescription>
                  There was an error processing your request. Please try again
                  later
                </AlertDescription>
                <CloseButton position="absolute" right="8px" top="8px" />
              </Alert>
            )}
            <ModalFooter>
              <Button
                colorScheme={"gray"}
                mr={"4"}
                onClick={deleteModalOnClose}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={deleteFormOnSubmit}
                colorScheme={"red"}
                disabled={
                  verification !== VERIFICATION_PHRASE ||
                  deleteFormStatus === "submitting"
                }
              >
                Request data deletion
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
