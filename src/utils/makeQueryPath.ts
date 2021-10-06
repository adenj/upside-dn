const baseUrl = "https://api.up.com.au/api/v1";
const paths = {
  accounts: "accounts",
  transactions: "transactions",
};

const pageSize = 30;

export const makeQueryPath = (id: string) =>
  `${baseUrl}/${paths.accounts}/${id}/${paths.transactions}?page[size]=${pageSize}`;
