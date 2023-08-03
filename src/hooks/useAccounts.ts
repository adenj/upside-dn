import { useContext, useEffect, useState } from "react";
import { AccountsContext } from "../providers/AccountsProvider";
import { AccountResource } from "../types/account";

export const useAccounts = () => {
  const [spendingAccount, setSpendingAccount] = useState<AccountResource | null>(null);
  const [saversAccounts, setSaversAccounts] = useState<AccountResource[] | null>(null);
  const { data, isLoading, error } = useContext(AccountsContext);
  useEffect(() => {
    if (!data) return;
    const spending = data.data.find(
      (acc) => acc.attributes.displayName === "Spending",
    );
    const savers = data.data.filter(
      (acc) => acc.attributes.displayName !== "Spending",
    );
    setSpendingAccount(spending!);
    setSaversAccounts(savers!)
  }, [data])

  return { data, isLoading, error, spendingAccount, saversAccounts };
};
