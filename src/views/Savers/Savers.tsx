import { Box, HStack, LinkBox, Stack, Text, VStack } from "@chakra-ui/layout";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Link } from "../../components/Link";
import { useAccounts } from "../../hooks/useAccounts";
import { formatMoney } from "../../utils/formatMoney";
import { Saver } from "../../components/Saver/Saver";
import { Balance } from "../../components/Balance/Balance";

export const Savers = (props: RouteComponentProps) => {
  const { data, isLoading } = useAccounts();
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const accounts = data.data.filter(
    (acc) => acc.attributes.displayName !== "Spending"
  );

  const totalSaved = accounts.reduce((prev, current) => {
    return prev + current.attributes.balance.valueInBaseUnits;
  }, 0);

  return (
    <Box>
      <Balance label="Total saved" amount={totalSaved} />
      <Stack spacing={6} align="stretch">
        {accounts.map((account) => {
          return <Saver account={account} />;
        })}
      </Stack>
    </Box>
  );
};
