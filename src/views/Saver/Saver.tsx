import { Box } from "@chakra-ui/layout";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { TransactionList } from "../../components/Transactions/TransactionList";
import { useAccount } from "../../hooks/useAccount";
import { useAccounts } from "../../hooks/useAccounts";

interface SaverProps extends RouteComponentProps {
  id?: string;
}

export const Saver = ({ id, path }: SaverProps) => {
  const { data, error, isLoading } = useAccount(id!);
  const { data: accountsData } = useAccounts();
  const account = accountsData.data.find((acc) => acc.id === id);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Box>
      <Box>{account?.attributes.displayName}</Box>
      <TransactionList list={data?.data} />
    </Box>
  );
};
