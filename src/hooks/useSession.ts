import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export const useSession = () => {
  const { session } = useContext(AuthContext);
  return { session };
};
