import React from "react";
import { useQuery } from "react-query";
import { token } from "../constants/token";
import { baseUrl } from "../constants/upApi";
import { TransactionResponse } from "../types/transaction";

export const useAccount = (id: string) => {
  const { data, isLoading, error } = useQuery<TransactionResponse, Error>(
    "account",
    async () => {
      return await fetch(
        `${baseUrl}/accounts/${id}/transactions?page[size]=30`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json());
    }
  );
  return { data, isLoading, error };
};
