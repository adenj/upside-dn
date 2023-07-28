import {
  Accordion,
  Box,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { format } from "date-fns";
import React from "react";
import { TransactionResource } from "../../types/transaction";
import { groupTransactionsByDate } from "../../utils/groupTransactionsByDate";
import { Transaction } from "./Transaction";

interface TransactionListProps {
  list: TransactionResource[];
}

export const TransactionList = ({ list }: TransactionListProps) => {
  const transactionsDates = groupTransactionsByDate(list);

  return (
    <Stack spacing={12}>
      {transactionsDates.map(({ date, transactions }, index) => {
        return <TransactionGroup date={date} transactions={transactions} key={`transactions-${index}`} />;
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
          return <Transaction transaction={transaction} key={transaction.id} />;
        })}
      </Accordion>
    </Box>
  );
};

interface GroupedTransactions {
  date: string;
  transactions: TransactionResource[];
}
