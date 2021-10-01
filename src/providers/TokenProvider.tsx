import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getTokenLocalStorage, setTokenLocalStorage } from "../constants/token";

interface Context {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}

export const TokenContext = createContext<Context>(null!);

export const TokenProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(getTokenLocalStorage!);

  useEffect(() => {
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
