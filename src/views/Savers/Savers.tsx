import { Box, Stack, Text } from "@chakra-ui/layout";
import React from "react";
import { useAccounts } from "../../hooks/useAccounts";
import { Saver } from "../../components/Saver/Saver";
import { Balance } from "../../components/Balance/Balance";
import { SkeletonBalance } from "../../components/Skeleton/SkeletonBalance/SkeletonBalance";
import { SkeletonSaver } from "../../components/Skeleton/SkeletonSaver/SkeletonSaver";

export const Savers = () => {
  const { data, isLoading, saversAccounts } = useAccounts();

  const totalSaved = saversAccounts?.reduce((prev, current) => {
    return prev + current.attributes.balance.valueInBaseUnits;
  }, 0);


  return (
    <Box>
      {
        isLoading ? (
          <>
            <SkeletonBalance />
            <Stack spacing={6} align="stretch">
              {[1, 2, 3, 4, 5, 6, 7, 8]?.map((index) => {
                return <SkeletonSaver key={index} />;
              })}
            </Stack>
          </>
        ) : (
            <>
              <Balance label="Total saved" amount={totalSaved} />
              <Stack spacing={6} align="stretch">
                {saversAccounts?.map((account) => {
                  return <Saver account={account} />;
                })}
              </Stack>
            </>
          )
      }
    </Box>
  );
};
