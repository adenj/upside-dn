import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/accordion";
import { Avatar } from "@chakra-ui/avatar";
import { useColorModeValue } from "@chakra-ui/color-mode";
import Icon from "@chakra-ui/icon";
import { Badge, Box, Flex, Grid, GridItem, Text } from "@chakra-ui/layout";
import { useToken } from "@chakra-ui/system";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/tag";
import React from "react";
import { AiOutlineUpCircle } from "react-icons/ai";
import { categories } from "../../constants/categories";
import { MoneyObject } from "../../types/money";
import { RoundUpObject, TransactionResource } from "../../types/transaction";
import { deslugify } from "../../utils/deslugify";
import { formatMoney } from "../../utils/formatMoney";
import { formatTime } from "../../utils/formatTime";
import { isNegative } from "../../utils/isNegative";

export const Transaction = ({
  transaction,
}: {
  transaction: TransactionResource;
}) => {
  const cardBg = useColorModeValue("blackAlpha.50", "gray.900");

  const isNegativeAmount = isNegative(
    transaction.attributes.amount.valueInBaseUnits
  );
  const time = formatTime(transaction.attributes.createdAt);
  const roundUp = transaction.attributes.roundUp;
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
                {time.hours}:{time.minutes}
                {time.ampm}
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
          gridTemplateRows="repeat(2, 1fr)"
          gridTemplateAreas={`". payment-details payment-details payment-details status" ". category category category category" ". round-up round-up round-up round-up"
          `}
        >
          <GridItem gridArea="payment-details">
            <Text fontSize="sm" paddingBottom="4">
              Charged September 28, 4:06pm
            </Text>
            <Text fontSize="sm" as="samp">
              {transaction.attributes.rawText}
            </Text>
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
          {roundUp ? (
            <GridItem gridArea="round-up">
              <RoundUp
                roundUp={roundUp}
                amount={transaction.attributes.amount}
              />
            </GridItem>
          ) : null}
        </Grid>
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
      paddingTop="4"
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
