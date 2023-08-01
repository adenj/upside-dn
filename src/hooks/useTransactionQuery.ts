import { useInfiniteQuery } from "@tanstack/react-query";
import { useToken } from "./useToken";
import { TransactionResponse } from "../types/transaction";
import { createQueryProps } from "../utils/createQueryProps";
import { makeQueryPath } from "../utils/makeQueryPath";

export const useTransactionQuery = (key: string) => {
  const path = makeQueryPath(key);
  const { token } = useToken();

  const fetchTransactions = async (path: string) => {
    return await fetch(path, createQueryProps(token!)).then((res) =>
      res.json(),
    );
  };

  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<TransactionResponse>(
    [key],
    ({ pageParam = path }) => fetchTransactions(pageParam),
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => lastPage.links.next,
    },
  );

  const list = data?.pages
    .map((page) => {
      return page.data;
    })
    .flat();

  return {
    data: list,
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    error,
    hasNextPage,
  };
};
