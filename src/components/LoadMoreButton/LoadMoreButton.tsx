import React from "react";
import { Button, Flex, Text, Box } from "@chakra-ui/react";

interface LoadMoreButtonProps {
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
}

export const LoadMoreButton = ({
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
}: LoadMoreButtonProps) => (
  <>
    <Flex justifyContent="center" paddingY={6}>
      {hasNextPage ? (
        <Button
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          loadingText="Loading"
        >
          Load more
        </Button>
      ) : (
        <Box>
          <Text>This is where it all started ☝️</Text>
        </Box>
      )}
    </Flex>
  </>
);
