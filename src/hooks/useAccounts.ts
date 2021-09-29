import { useContext } from "react";
import { AccountsContext } from "../providers/AccountsProvider";

export const useAccounts = () => {
  const { data, isLoading, error } = useContext(AccountsContext);
  return { data, isLoading, error };
};
