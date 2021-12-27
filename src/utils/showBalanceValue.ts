import { SHOW_BALANCE } from "../constants/showBalance";

export const getShowBalanceValue =
  localStorage.getItem(SHOW_BALANCE) === "false" ? false : true;

export const setShowBalanceValue = (value: boolean) =>
  localStorage.setItem(SHOW_BALANCE, JSON.stringify(value));
