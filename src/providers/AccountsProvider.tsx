import React, { createContext, ReactNode } from "react";
import { useQuery } from "react-query";
import { baseUrl } from "../constants/upApi";
import { useToken } from "../hooks/useToken";
import { AccountResponse } from "../types/account";
import { createQueryProps } from "../utils/createQueryProps";

interface Context {
  data: AccountResponse;
  isLoading: boolean;
  error: Error;
}

export const AccountsContext = createContext<Context>(null!);

export const AccountsProvider = ({ children }: { children: ReactNode }) => {
  const { token } = useToken();
  const { data, isLoading, error } = useQuery<AccountResponse, Error>(
    "accounts",
    async () => {
      return await fetch(
        `${baseUrl}/accounts?page[size]=30`,
        createQueryProps(token!),
      ).then((res) => res.json());
    },
    {
      enabled: Boolean(token),
    },
  );

  return (
    // @ts-ignore
    <AccountsContext.Provider value={{ data, isLoading, error }}>
      {children}
    </AccountsContext.Provider>
  );
};
