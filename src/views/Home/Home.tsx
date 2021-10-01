import { Box } from "@chakra-ui/layout";
import React from "react";
import { RouteComponentProps } from "@reach/router";
import { TransactionList } from "../../components/Transactions/TransactionList";
import { useQuery } from "react-query";
import { TransactionResponse } from "../../types/transaction";
import { baseUrl } from "../../constants/upApi";
import { useAccounts } from "../../hooks/useAccounts";
import { useToken } from "../../hooks/useToken";
import { Balance } from "../../components/Balance/Balance";
import { createQueryProps } from "../../utils/createQueryProps";
import { Loader } from "../../components/Loader/Loader";

export const Home = (props: RouteComponentProps) => {
  const { data: accounts } = useAccounts();
  const { token } = useToken();
  const spendingAccount = accounts.data.find(
    (acc) => acc.attributes.displayName === "Spending"
  );
  const { data, isLoading } = useQuery<TransactionResponse>(
    "transactions",
    async () => {
      return await fetch(
        `${baseUrl}/accounts/${spendingAccount?.id}/transactions?page[size]=30`,
        createQueryProps(token)
      ).then((res) => res.json());
    }
  );

  if (isLoading) return <Loader />;

  return (
    <Box>
      <Balance
        label="Available"
        amount={spendingAccount?.attributes.balance.valueInBaseUnits!}
      />
      <TransactionList list={data?.data!} />
    </Box>
  );
};
