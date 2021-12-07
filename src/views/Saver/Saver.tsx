import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router";
import { Balance } from "../../components/Balance/Balance";
import { Loader } from "../../components/Loader/Loader";
import { LoadMoreButton } from "../../components/LoadMoreButton/LoadMoreButton";
import { TransactionList } from "../../components/Transactions/TransactionList";
import { useAccounts } from "../../hooks/useAccounts";
import { useTransactionQuery } from "../../hooks/useTransactionQuery";

export const Saver = () => {
  const { id } = useParams();
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useTransactionQuery(id!);
  const { data: accountsData } = useAccounts();
  const account = accountsData.data.find((acc) => acc.id === id);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box>
      <Heading textAlign="center" as="h1" size="lg" paddingBottom={4}>
        {account?.attributes.displayName}
      </Heading>
      <Balance amount={account?.attributes.balance.valueInBaseUnits!} />
      <TransactionList list={data!} />
      <LoadMoreButton
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage!}
      />
    </Box>
  );
};
