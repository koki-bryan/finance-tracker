import React from "react";
import RecentTransactionsCard from "./ui/RecentTransactionsCard";
import { useTransactions } from "~/contexts/TransactionContext";

const RecentTransactions = () => {
  const { transactions } = useTransactions();
  return (
    <div className="bg-white shadow-md rounded-md p-4 w-full">
      <h1 className="lg:text-lg font-semibold tracking-tight">
        Recent Transactions
      </h1>
      <div className="flex flex-col gap-2">
        {transactions.length > 0 ? (
          transactions.map((t) => (
            <RecentTransactionsCard key={t.id} transaction={t} />
          ))
        ) : (
          <p className="text-xs md:text-sm text-gray-500 p-8 text-center">
            No transactions yet. Start by adding your first transaction!
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
