import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  deleteTokenLocalStorage,
  getTokenLocalStorage,
  setTokenLocalStorage,
} from "../constants/token";

interface Context {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}

export const TokenContext = createContext<Context>(null!);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(getTokenLocalStorage!);

  useEffect(() => {
    if (token === null) {
      deleteTokenLocalStorage();
    }
    if (!token) {
      return;
    }
    setTokenLocalStorage(token!);
  }, [token]);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
