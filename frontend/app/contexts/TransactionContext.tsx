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
