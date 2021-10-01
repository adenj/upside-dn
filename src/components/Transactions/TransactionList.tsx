import { Accordion } from "@chakra-ui/accordion";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { format } from "date-fns";
import React from "react";
import { TransactionResource } from "../../types/transaction";
import { groupTransactionsByDate } from "../../utils/groupTransactionsByDate";
import { Transaction } from "./Transaction";

export const TransactionList = ({ list }: { list: TransactionResource[] }) => {
  const transactionsDates = groupTransactionsByDate(list);

  return (
    <Stack spacing={12}>
      {transactionsDates.map(({ date, transactions }) => {
        return <TransactionGroup date={date} transactions={transactions} />;
      })}
    </Stack>
  );
};

const TransactionGroupHeading = ({ date }: { date: string }) => {
  const bg = useColorModeValue("gray.100", "gray.700");
  return (
    <Box px="8" py="2" bg={bg} roundedTop="lg" position="sticky" top="0">
      <Text>
        <strong>{format(new Date(date), "EE, do MMMM ")}</strong>
      </Text>
    </Box>
  );
};

const TransactionGroup = ({ transactions, date }: GroupedTransactions) => {
  return (
    <Box roundedBottom="lg">
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
