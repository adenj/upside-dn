import { useContext } from "react";
import { TokenContext } from "../providers/TokenProvider";

export const useToken = () => {
  const { token, setToken } = useContext(TokenContext);
  return { token, setToken };
};