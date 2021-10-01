export const createQueryProps = (token: string) => ({
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
