const formatter = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  signDisplay: "never",
});

export const formatMoney = (cents: number) =>
  formatter.format(formatBaseValue(cents));

export const formatNormaliseAmount = (cents: number) =>
  Math.abs(formatBaseValue(cents));

export const formatBaseValue = (cents: number) => cents / 100;
