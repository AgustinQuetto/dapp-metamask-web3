export const GET_BALANCE = "GET_BALANCE";
export const GET_ACCOUNTS = "GET_ACCOUNTS";

export const getBalance = (payload: object) => ({
  type: GET_BALANCE,
  ...payload,
});

export const getAccounts = (payload: object) => ({
  type: GET_ACCOUNTS,
  ...payload,
});
