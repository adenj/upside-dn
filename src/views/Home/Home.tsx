import { Box } from "@chakra-ui/react";
import React from "react";
import { TransactionList } from "../../components/Transactions/TransactionList";
import { useAccounts } from "../../hooks/useAccounts";
import { Balance } from "../../components/Balance/Balance";
import { Loader } from "../../components/Loader/Loader";
import { useTransactionQuery } from "../../hooks/useTransactionQuery";
import { LoadMoreButton } from "../../components/LoadMoreButton/LoadMoreButton";
import { TransactionResource } from "../../types/transaction";

export const Home = () => {
  const { data: accounts } = useAccounts();
  const account = accounts.data.find(
    (acc) => acc.attributes.displayName === "Spending"
  );

  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useTransactionQuery(account?.id!);

  if (isLoading) return <Loader />;

  return (
    <Box>
      <Balance
        label="Available"
        amount={account?.attributes.balance.valueInBaseUnits!}
      />
      <TransactionList list={data as TransactionResource[]} />
      <LoadMoreButton
        fetchNextPage={fetchNextPage}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage!}
      />
    </Box>
  );
};
