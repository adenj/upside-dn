import { TransactionResource } from "../types/transaction";

interface GroupedTransactions {
  date: string;
  transactions: TransactionResource[];
}

export const groupTransactionsByDate = (
  data: TransactionResource[]
): GroupedTransactions[] => {
  const groups = data.reduce((groups: any, item: any) => {
    const date = item.attributes.createdAt.split("T")[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});

  return Object.keys(groups).map((date) => {
    return {
      date,
      transactions: groups[date],
    };
  });
};
