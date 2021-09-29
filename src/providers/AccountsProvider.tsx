import React, { createContext, ReactNode } from "react";
import { useQuery } from "react-query";
import { token } from "../constants/token";
import { baseUrl } from "../constants/upApi";
import { AccountResponse } from "../types/account";

interface Context {
  data: AccountResponse;
  isLoading: boolean;
  error: Error;
}

export const AccountsContext = createContext<Context>(null!);

export const AccountsProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, error } = useQuery<AccountResponse, Error>(
    "accounts",
    async () => {
      return await fetch(`${baseUrl}/accounts?page[size]=30`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
    }
  );

  return (
    <AccountsContext.Provider value={{ data, isLoading, error }}>
      {children}
    </AccountsContext.Provider>
  );
};
