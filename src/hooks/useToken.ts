import { useSession } from "./useSession";

export const useToken = () => {
  const { session } = useSession();
  const token = session?.user?.user_metadata.api_key;
  return { token };
};
