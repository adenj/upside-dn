import { TransactionResource } from "../types/transaction";

interface GroupedTransactions {
  date: string;
  transactions: TransactionResource[];
}

export const groupTransactionsByDate = (
  data: TransactionResource[]
): GroupedTransactions[] => {
  const groups = data.reduce(
    (
      groupedDate: Record<string, TransactionResource[]>,
      item: TransactionResource
    ) => {
      const date = item.attributes.createdAt.split("T")[0];
      if (!groupedDate[date]) {
        groupedDate[date] = [];
      }
      groupedDate[date].push(item);
      return groupedDate;
    },
    {}
  );

  return Object.keys(groups).map((date) => ({
    date,
    transactions: groups[date],
  }));
};
