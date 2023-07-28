import { IconButton } from "@chakra-ui/button";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { formatMoney } from "../../utils/formatMoney";
import {
  getShowBalanceValue,
  setShowBalanceValue,
} from "../../utils/showBalanceValue";

interface BalanceProps {
  amount: number;
  label?: string;
}

export const Balance = ({ amount, label }: BalanceProps) => {
  const [showBalance, setShowBalance] = useState(getShowBalanceValue);

  useEffect(() => {
    setShowBalanceValue(showBalance);
  }, [showBalance]);

  return (
    <Box textAlign="center" paddingBottom={8}>
      <Heading color="brand.orange" as="h2">
        {showBalance ? formatMoney(amount) : "•••"}{" "}
        {!label && (
          <IconButton
            icon={showBalance ? <IoEyeOff /> : <IoEye />}
            aria-label="Toggle balance"
            variant="ghost"
            size="sm"
            onClick={() => setShowBalance((state) => !state)}
          />
        )}
      </Heading>
      <Flex alignItems="center" justifyContent="center">
        {label && (
          <>
            <Text fontSize="lg" fontWeight="bold" paddingRight="2">
              {label}
            </Text>
            <IconButton
              icon={showBalance ? <IoEyeOff /> : <IoEye />}
              aria-label="Toggle balance"
              variant="ghost"
              size="sm"
              onClick={() => setShowBalance(!showBalance)}
            />
          </>
        )}
      </Flex>
    </Box>
  );
};
