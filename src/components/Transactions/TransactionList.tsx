import { Accordion } from "@chakra-ui/accordion";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Text } from "@chakra-ui/layout";
import { format } from "date-fns";
import React from "react";
import { useQuery } from "react-query";
import { token } from "../../constants/token";
import { baseUrl, paths } from "../../constants/upApi";
import { useAccounts } from "../../hooks/useAccounts";
import {
  TransactionResource,
  TransactionResponse,
} from "../../types/transaction";
import { groupTransactionsByDate } from "../../utils/groupTransactionsByDate";
import { isNegative } from "../../utils/isNegative";
import { Transaction } from "./Transaction";

export const TransactionList = ({ list }) => {
  const transactionsDates = groupTransactionsByDate(list);

  return (
    <Box>
      {transactionsDates.map(({ date, transactions }) => {
        return <TransactionGroup date={date} transactions={transactions} />;
      })}
    </Box>
  );
};

const TransactionGroupHeading = ({ date }: { date: string }) => {
  const bg = useColorModeValue("gray.100", "gray.700");
  return (
    <Box px="8" py="2" bg={bg} roundedTop="lg" position="sticky" top="0">
      <Text>
        <strong>{format(new Date(date), "do MMM")}</strong>
      </Text>
    </Box>
  );
};

const TransactionGroupFooter = ({ amount = 69 }: { amount: number }) => {
  const bg = useColorModeValue("gray.100", "gray.700");
  return (
    <Box px="8" py="2" bg={bg} roundedBottom="lg">
      <Text fontSize="sm">
        <strong>Spent ${amount}</strong>
      </Text>
    </Box>
  );
};

const TransactionGroup = ({ transactions, date }: GroupedTransactions) => {
  return (
    <Box py="6" roundedBottom="lg">
      <TransactionGroupHeading date={date} />
      <Accordion allowMultiple>
        {transactions.map((transaction) => {
          return <Transaction transaction={transaction} />;
        })}
      </Accordion>
    </Box>
  );
};

interface GroupedTransactions {
  date: string;
  transactions: TransactionResource[];
}
