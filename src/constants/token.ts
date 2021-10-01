const TOKEN_KEY = "upside-dn_token";
export const getTokenLocalStorage = localStorage.getItem(TOKEN_KEY);
export const setTokenLocalStorage = (value: string) => {
  localStorage.setItem(TOKEN_KEY, value);
};
