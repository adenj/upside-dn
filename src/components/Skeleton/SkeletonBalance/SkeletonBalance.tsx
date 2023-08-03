import { IconButton } from "@chakra-ui/button";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import { Skeleton } from "@chakra-ui/react";

export const SkeletonBalance = () => {
  return (
    <Box textAlign="center" display="flex" justifyContent="center" paddingBottom={8}>
      <Skeleton width="170px">
        <Heading color="brand.orange" as="h2">
          $3000
      </Heading>
      </Skeleton>
    </Box>
  );
};
