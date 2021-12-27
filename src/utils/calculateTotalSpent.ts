// this is incorrect.
export const dailyTotal = (outgoingTransactions: any) =>
  outgoingTransactions.reduce(
    (a: any, b: any) => a + (Number(b.attributes.amount.value) || 0),
    0
  ) * -1;
