import React, { createContext, ReactNode } from "react";
import { useQuery } from "react-query";
import { baseUrl } from "../constants/upApi";
import { AccountResponse } from "../types/account";
import { createQueryProps } from "../utils/createQueryProps";
import { TokenContext } from "./TokenProvider";

interface Context {
  data: AccountResponse | undefined;
  isLoading: boolean;
  error: Error | null;
}

export const AccountsContext = createContext<Context>(null!);

export const AccountsProvider = ({ children }: { children: ReactNode }) => {
  const { token } = React.useContext(TokenContext);
  const { data, isLoading, error } = useQuery<AccountResponse, Error>(
    "accounts",
    async () =>
      fetch(`${baseUrl}/accounts?page[size]=30`, createQueryProps(token!)).then(
        (res) => res.json()
      ),
    {
      enabled: Boolean(token),
    }
  );

  return (
    <AccountsContext.Provider value={{ data, isLoading, error }}>
      {children}
    </AccountsContext.Provider>
  );
};
