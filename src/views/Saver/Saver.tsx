import { Box, Heading, Skeleton, Flex } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router";
import { Balance } from "../../components/Balance/Balance";
import { Loader } from "../../components/Loader/Loader";
import { LoadMoreButton } from "../../components/LoadMoreButton/LoadMoreButton";
import { TransactionList } from "../../components/Transactions/TransactionList";
import { useAccounts } from "../../hooks/useAccounts";
import { useTransactionQuery } from "../../hooks/useTransactionQuery";
import { TransactionResource } from "../../types/transaction";
import { SkeletonBalance } from "../../components/Skeleton/SkeletonBalance/SkeletonBalance";
import { SkeletonTransactionList } from "../../components/Skeleton/SkeletonTransactionFeed/SkeletonTransactionFeed";

export const Saver = () => {
  const { id } = useParams();
  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useTransactionQuery(id!);
  const { data: accountsData, isLoading: isLoadingAccounts } = useAccounts();
  const account = accountsData?.data.find((acc) => acc.id === id);

  return (
    <Box>
      {
        isLoading || isLoadingAccounts ? (
          <>
            <Flex justifyContent="center">
              <Skeleton height="40px" width="200px" marginBottom={4} alignItems="center">
                display
              </Skeleton>
            </Flex>
            <SkeletonBalance />
            <SkeletonTransactionList />
          </>
        ) : (
            <>
              <Heading textAlign="center" as="h1" size="lg" paddingBottom={4}>
                {account?.attributes.displayName}
              </Heading>
              <Balance amount={account?.attributes.balance.valueInBaseUnits!} />
              <TransactionList list={data! as TransactionResource[]} />
              <LoadMoreButton
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
                hasNextPage={hasNextPage!}
              />
            </>
          )
      }
    </Box>
  );
};
