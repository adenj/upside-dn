import { IconButton } from "@chakra-ui/button";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { formatMoney } from "../../utils/formatMoney";
import {
  getShowBalanceValue,
  setShowBalanceValue,
} from "../../utils/showBalanceValue";

export const AvailableBalance = ({ amount }: { amount: number }) => {
  const [showBalance, setShowBalance] = useState(getShowBalanceValue);

  useEffect(() => {
    setShowBalanceValue(showBalance);
  }, [showBalance]);

  return (
    <Box textAlign="center">
      <Heading color="brand.orange">
        {showBalance ? formatMoney(amount) : "•••"}
      </Heading>
      <Flex alignItems="center" justifyContent="center">
        <Text fontSize="lg" fontWeight="bold" paddingRight="2">
          Available
        </Text>
        <IconButton
          icon={showBalance ? <IoEyeOff /> : <IoEye />}
          aria-label="Toggle balance"
          variant="ghost"
          size="sm"
          onClick={() => setShowBalance(!showBalance)}
        />
      </Flex>
    </Box>
  );
};
