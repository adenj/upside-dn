import {
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Link as ReachLink } from "@reach/router";
import { AccountResource } from "../../types/account";
import { formatMoney } from "../../utils/formatMoney";
import { background } from "../../constants/colorModes";

export const Saver = ({ account }: { account: AccountResource }) => {
  const hoverBgColor = useColorModeValue(background.light, background.dark);
  return (
    <LinkBox
      as="div"
      borderWidth="1px"
      borderRadius="lg"
      paddingX={8}
      paddingY={6}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      _hover={{
        bg: hoverBgColor,
      }}
    >
      <LinkOverlay to={`/savers/${account.id}`} as={ReachLink}>
        <Text fontSize="lg" fontWeight="bold">
          {account.attributes.displayName}
        </Text>
      </LinkOverlay>
      <Text fontSize="lg" fontWeight="bold">
        {formatMoney(account.attributes.balance.valueInBaseUnits)}
      </Text>
    </LinkBox>
  );
};
