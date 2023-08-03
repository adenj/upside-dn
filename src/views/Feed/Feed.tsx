import { Box } from "@chakra-ui/react";
import React from "react";
import { TransactionList } from "../../components/Transactions/TransactionList";
import { useAccounts } from "../../hooks/useAccounts";
import { Balance } from "../../components/Balance/Balance";
import { Loader } from "../../components/Loader/Loader";
import { useTransactionQuery } from "../../hooks/useTransactionQuery";
import { LoadMoreButton } from "../../components/LoadMoreButton/LoadMoreButton";
import { TransactionResource } from "../../types/transaction";
import { SkeletonTransactionList } from "../../components/Skeleton/SkeletonTransactionFeed/SkeletonTransactionFeed";
import { SkeletonBalance } from "../../components/Skeleton/SkeletonBalance/SkeletonBalance";

export const Feed = () => {
  const { spendingAccount } = useAccounts();

  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useTransactionQuery(spendingAccount?.id!);


  return (
    <Box>
      {isLoading ? (
        <>
          <SkeletonBalance />
          <SkeletonTransactionList />
        </>
      ) : (
          <>
            <Balance
              label="Available"
              amount={spendingAccount?.attributes.balance.valueInBaseUnits!}
            />
            <TransactionList list={data as TransactionResource[]} />
            <LoadMoreButton
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage!}
            />
          </>
        )}
    </Box>
  );
};
