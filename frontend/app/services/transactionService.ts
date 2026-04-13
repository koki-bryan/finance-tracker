import { apiFetch } from "~/utils/api/apiFetch";

const BASE_URL = "http://localhost:5000/api/v1";

type dataProps = {
  category: number;
  amount: number;
  description: string;
  date: string;
};

export const createTransaction = async (data: dataProps) => {
  return await apiFetch(`${BASE_URL}/transaction`, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const getTransactions = async () => {
  return await apiFetch(`${BASE_URL}/transaction`);
};
