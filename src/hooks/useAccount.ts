import { useQuery } from "react-query";
import { baseUrl } from "../constants/upApi";
import { TransactionResponse } from "../types/transaction";
import { queryProps } from "../utils/createQueryProps";

export const useAccount = (id: string) => {
  const { data, isLoading, error } = useQuery<TransactionResponse, Error>(
    "account",
    async () => {
      return await fetch(
        `${baseUrl}/accounts/${id}/transactions?page[size]=30`,
        queryProps
      ).then((res) => res.json());
    }
  );
  return { data, isLoading, error };
};
