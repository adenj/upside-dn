import { useState } from "react";
import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Button,
  Avatar,
  useColorModeValue,
  Icon,
  Badge,
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalProps,
  FormControl,
  FormLabel,
  Input,
  InputLeftElement,
  InputGroup,
  Textarea,
  Select,
  Switch,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { SingleDatepicker } from "chakra-dayzed-datepicker";
import { useToken } from "@chakra-ui/system";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/tag";
import { format } from "date-fns";
import React from "react";
import { AiOutlineUpCircle } from "react-icons/ai";
import { categories } from "../../constants/categories";
import { background } from "../../constants/colorModes";
import { useAccounts } from "../../hooks/useAccounts";
import { MoneyObject } from "../../types/money";
import { RoundUpObject, TransactionResource } from "../../types/transaction";
import { deslugify } from "../../utils/deslugify";
import { formatBaseValue, formatMoney } from "../../utils/formatMoney";
import { isNegative } from "../../utils/isNegative";
import { Link } from "../Link";
import { expenseTypes } from "../../constants/expenseTypes";

export const Transaction = ({
  transaction,
}: {
  transaction: TransactionResource;
}) => {
  const { data: accountsData } = useAccounts();
  const cardBg = useColorModeValue(background.light, background.dark);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isNegativeAmount = isNegative(
    transaction.attributes.amount.valueInBaseUnits
  );
  const date = new Date(transaction.attributes.createdAt);
  const createdAtTime = format(date, "p").toLowerCase();
  const roundUp = transaction.attributes.roundUp;
  const internalTransfer = transaction.relationships.transferAccount.data;
  const accountName = accountsData.data.find(
    (acc) => acc.id === internalTransfer?.id
  )?.attributes.displayName;

  // const testFn = async () => {
  //   try {
  //     const user = supabase.auth.user();
  //     const data = {
  //       user_id: user!.id,
  //       title: "Internet bill",
  //       amount: 5000,
  //       created_at: new Date(),
  //     };

  //     const { error } = await supabase
  //       .from("expenses")
  //       .upsert(data, { returning: "minimal" });
  //     if (error) {
  //       throw error;
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  return (
    <AccordionItem
      borderWidth="1px"
      borderTop="none"
      _last={{
        borderBottomLeftRadius: "0.5rem",
        borderBottomRightRadius: "0.5rem",
      }}
    >
      <AccordionButton _expanded={{ bg: cardBg }} padding={0}>
        <Grid
          gridTemplateColumns="1fr 3fr 1fr"
          width="100%"
          paddingX={8}
          paddingY={6}
          alignItems="stretch"
        >
          <GridItem width="100%">
            <Flex alignItems="center" justifyContent="start">
              <Avatar
                name={transaction.attributes.description}
                position="initial"
              />
            </Flex>
          </GridItem>
          <GridItem>
            <Flex
              textAlign="left"
              direction="column"
              height="100%"
              justifyContent="space-between"
            >
              <Text>{transaction.attributes.description}</Text>
              <Text fontSize="xs" color="gray.500">
                {createdAtTime}
              </Text>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex alignItems="center" justifyContent="end">
              {transaction.attributes.roundUp ? <RoundUpIcon /> : null}
              <Text
                fontWeight="bold"
                paddingLeft="2"
                color={!isNegativeAmount ? "green.500" : "default"}
              >
                {`${!isNegativeAmount ? "+" : ""}${formatMoney(
                  transaction.attributes.amount.valueInBaseUnits
                )}`}
              </Text>
            </Flex>
          </GridItem>
        </Grid>
      </AccordionButton>
      <AccordionPanel bg={cardBg} paddingX={6}>
        <Grid
          gridTemplateColumns="1fr 1fr 1fr 1fr 1fr"
          gridTemplateAreas={`". payment-details payment-details payment-details status" ". category category category category" ". round-up round-up round-up round-up"
          `}
        >
          <GridItem gridArea="payment-details">
            <Text fontSize="sm" paddingBottom="4">
              {isNegativeAmount ? "Charged" : "Recieved"}{" "}
              {`${format(date, "LLLL do")}, ${createdAtTime}`}
            </Text>
            <Text fontSize="sm" as="samp">
              {transaction.attributes.rawText}
            </Text>
            {internalTransfer && (
              <GridItem gridArea="round-up">
                <Text>
                  Transfered {isNegativeAmount ? "to" : "from"}{" "}
                  <Link
                    to={`/savers/${internalTransfer.id}`}
                    color="brand.orange"
                    fontWeight="bold"
                  >
                    {accountName}
                  </Link>
                </Text>
              </GridItem>
            )}
          </GridItem>
          <GridItem
            display="grid"
            justifyItems="end"
            alignItems="start"
            gridArea="status"
          >
            {transaction.attributes.status === "HELD" ? (
              <Badge variant="outline">PENDING</Badge>
            ) : null}
          </GridItem>
          {transaction.relationships.category.data ? (
            <GridItem gridArea="category">
              <Category category={transaction.relationships.category} />
            </GridItem>
          ) : null}
          {roundUp && (
            <GridItem gridArea="round-up">
              <RoundUp
                roundUp={roundUp}
                amount={transaction.attributes.amount}
              />
            </GridItem>
          )}
        </Grid>
        <Button onClick={onOpen}>Expense</Button>
        <ExpenseModal
          isOpen={isOpen}
          onClose={onClose}
          transaction={transaction}
        />
      </AccordionPanel>
    </AccordionItem>
  );
};

const RoundUpIcon = () => {
  const [orange] = useToken("colors", ["brand.orange"]);
  return <Icon as={AiOutlineUpCircle} color={orange} boxSize="18px" />;
};

const Category = ({
  category,
}: {
  category: {
    data: {
      type: string;
      id: string;
    } | null;
    links?: {
      related: string;
    };
  };
}) => {
  const id = category.data?.id!;
  return (
    <Box paddingTop="4">
      <Tag size="md" colorScheme={categories[id!].color}>
        <TagLeftIcon as={categories[id!].icon} />
        <TagLabel>{deslugify(category.data?.id!)}</TagLabel>
      </Tag>
    </Box>
  );
};

const RoundUp = ({
  roundUp,
  amount,
}: {
  roundUp: RoundUpObject;
  amount: MoneyObject;
}) => {
  const { boostPortion } = roundUp;
  const roundUpTotal = boostPortion
    ? roundUp.amount.valueInBaseUnits - boostPortion.valueInBaseUnits
    : roundUp.amount.valueInBaseUnits;
  const totalAmount = roundUp.amount.valueInBaseUnits + amount.valueInBaseUnits;
  return (
    <Grid
      gridTemplateColumns="1fr 1fr 1fr 1fr"
      alignItems="center"
      textAlign="right"
      paddingTop="8"
    >
      <GridItem>
        <Flex alignItems="center">
          <RoundUpIcon />
          <Text fontSize="sm" fontWeight="bold" paddingLeft="2">
            Round-up
          </Text>
        </Flex>
      </GridItem>
      <GridItem>
        <Text fontSize="sm" fontWeight="semibold">
          {formatMoney(roundUpTotal)}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Amount
        </Text>
      </GridItem>
      {boostPortion ? (
        <GridItem>
          <Text fontSize="sm" fontWeight="semibold">
            {formatMoney(boostPortion.valueInBaseUnits)}
          </Text>
          <Text fontSize="sm" color="gray.500">
            Boost
          </Text>
        </GridItem>
      ) : null}
      <GridItem>
        <Text fontSize="sm" fontWeight="semibold">
          {formatMoney(totalAmount)}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Total
        </Text>
      </GridItem>
    </Grid>
  );
};

interface ExpenseModalProps {
  isOpen: ModalProps["isOpen"];
  onClose: ModalProps["onClose"];
  transaction: TransactionResource;
}

const ExpenseModal = ({ isOpen, onClose, transaction }: ExpenseModalProps) => {
  const [vendor, setVendor] = useState(transaction.attributes.description);
  const [description, setDescription] = useState(
    transaction.attributes.rawText || ""
  );
  const [amount, setAmount] = useState(
    formatBaseValue(transaction.attributes.amount.valueInBaseUnits)
  );
  const [date, setDate] = useState(new Date(transaction.attributes.createdAt));
  const [type, setType] = useState("");
  const [fullyClaimable, setFullyClaimable] = useState(true);
  const [claimableAmount, setClaimableAmount] = useState({
    percent: 100,
    amount,
  });

  const updateClaimableAmount = (value: number) => {
    const newAmount = amount * (value / 100);
    const percent = Number(value);
    setClaimableAmount({ amount: newAmount, percent });
  };

  console.log(transaction);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Expense</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Vendor</FormLabel>
            <InputGroup>
              <Input
                placeholder="Vendor"
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>Total Amount</FormLabel>
            <InputGroup>
              <InputLeftElement children="$" />
              <Input
                placeholder="Total Amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Transaction date</FormLabel>
            <InputGroup>
              <SingleDatepicker
                date={date}
                onDateChange={(e) => {
                  setDate(new Date(e));
                }}
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Expense type</FormLabel>
            <Select
              placeholder="Select expense type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {expenseTypes.map((type) => (
                <option value={type.value}>{type.label}</option>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <InputGroup>
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </InputGroup>
          </FormControl>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="100%-claimable" mb="0">
              Is this expense 100% claimable?
            </FormLabel>
            <Switch
              id="100%-claimable"
              size="lg"
              isChecked={fullyClaimable}
              onChange={(e) => setFullyClaimable(e.target.checked)}
            />
          </FormControl>
          {!fullyClaimable && (
            <Flex>
              <NumberInput
                maxWidth="100px"
                mr="2rem"
                value={claimableAmount.percent}
                onChange={(value) => updateClaimableAmount(Number(value))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Slider
                flex="1"
                step={5}
                min={0}
                max={100}
                focusThumbOnChange={false}
                value={claimableAmount.percent}
                onChange={updateClaimableAmount}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb children={claimableAmount.percent} boxSize={6} />
              </Slider>
              Claiming {claimableAmount.amount}
            </Flex>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
