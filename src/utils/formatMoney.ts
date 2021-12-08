const formatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  // @ts-ignore
  signDisplay: "never",
});

export const formatMoney = (cents: number) => {
  return formatter.format(formatBaseValue(cents));
};

export const formatBaseValue = (cents: number) => {
  return cents / 100;
};
