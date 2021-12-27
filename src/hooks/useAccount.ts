import { useContext } from "react";
import { useQuery } from "react-query";
import { baseUrl } from "../constants/upApi";
import { TokenContext } from "../providers/TokenProvider";
import { TransactionResponse } from "../types/transaction";

export const useAccount = (id: string) => {
  const { token } = useContext(TokenContext);
  const { data, isLoading, error } = useQuery<TransactionResponse, Error>(
    "account",
    async () =>
      fetch(`${baseUrl}/accounts/${id}/transactions?page[size]=30`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json())
  );
  return { data, isLoading, error };
};
