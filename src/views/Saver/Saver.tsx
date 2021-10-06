import { Box, Heading } from "@chakra-ui/react";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Balance } from "../../components/Balance/Balance";
import { Loader } from "../../components/Loader/Loader";
import { TransactionList } from "../../components/Transactions/TransactionList";
import { useAccount } from "../../hooks/useAccount";
import { useAccounts } from "../../hooks/useAccounts";

interface SaverProps extends RouteComponentProps {
  id?: string;
}

export const Saver = ({ id }: SaverProps) => {
  const { data, isLoading } = useAccount(id!);
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
      <TransactionList list={data?.data!} />
    </Box>
  );
};
