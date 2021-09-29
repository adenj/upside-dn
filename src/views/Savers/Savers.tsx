import { Box, LinkBox, Text } from "@chakra-ui/layout";
import { RouteComponentProps } from "@reach/router";
import React from "react";
import { Link } from "../../components/Link";
import { useAccounts } from "../../hooks/useAccounts";
import { formatMoney } from "../../utils/formatMoney";

export const Savers = (props: RouteComponentProps) => {
  const { data, isLoading } = useAccounts();
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  const accounts = data.data.filter(
    (acc) => acc.attributes.displayName !== "Spending"
  );

  const totalSaved = accounts.reduce((prev, current) => {
    return prev + Number(current.attributes.balance.value);
  }, 0);

  return (
    <Box>
      <Text>Total saved {formatMoney(totalSaved)}</Text>
      {accounts.map((account) => {
        return (
          <LinkBox as="div">
            <Link to={`/savers/${account.id}`}>
              <Text>{account.attributes.displayName}</Text>
              <Text>${account.attributes.balance.value}</Text>
            </Link>
          </LinkBox>
        );
      })}
    </Box>
  );
};
