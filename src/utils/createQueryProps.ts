import { token } from "../constants/token";

export const queryProps = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
