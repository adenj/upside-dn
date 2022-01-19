import { useSession } from "./useSession";

export const useExpenseAccess = () => {
  const { session } = useSession();
  const hasExpenseAccess = session?.user?.user_metadata.expenseAccess;
  return { hasExpenseAccess };
};
