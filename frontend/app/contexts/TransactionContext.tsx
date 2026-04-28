import { useState, createContext, useEffect, useContext } from "react";
import { getTransactions } from "~/services/transactionService";

type Category = {
  id: number;
  name: string;
  type: "income" | "expense" | null;
};

export const CATEGORIES: Category[] = [
  // Income
  { id: 1, name: "Salary", type: "income" },
  { id: 2, name: "Freelance", type: "income" },
  { id: 3, name: "Investment", type: "income" },
  { id: 4, name: "Gift", type: "income" },
  { id: 5, name: "Refund", type: "income" },
  { id: 6, name: "Other", type: "income" },

  // Expense
  { id: 7, name: "Housing", type: "expense" },
  { id: 8, name: "Transportation", type: "expense" },
  { id: 9, name: "Food & Dining", type: "expense" },
  { id: 10, name: "Utilities", type: "expense" },
  { id: 11, name: "Healthcare", type: "expense" },
  { id: 12, name: "Entertainment", type: "expense" },
  { id: 13, name: "Shopping", type: "expense" },
  { id: 14, name: "Personal Care", type: "expense" },
  { id: 15, name: "Education", type: "expense" },
  { id: 16, name: "Other", type: "expense" },
];

export type Transaction = {
  id: number;
  amount: string; // Database returns "8500.00"
  category_id: number;
  description: string;
  date: string;
  created_at: string;
  user_id: number;
};

export type IESummary = {
  date_trunc: string;
  type: "income" | "expense";
  sum: string;
};
interface TransactionContextType {
  transactions: Transaction[];
  loading: boolean;
  fetchTransactions: () => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined,
);

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);

    try {
      const response = await getTransactions();
      const data = await response.json();
      setTransactions(data);
    } catch (err) {
      console.error("Error fetching: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions, loading, fetchTransactions }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);

  // If the hook is used outside of the Provider, throw a helpful error
  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a TransactionProvider",
    );
  }

  // Now TypeScript knows context is definitely NOT undefined
  return context;
};
