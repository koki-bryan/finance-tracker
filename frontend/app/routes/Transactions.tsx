import React, { useState } from "react";
import type { Route } from "./+types/Transactions";
import { Plus, Filter, type LucideIcon } from "lucide-react";
import TransactionModal from "~/components/TransactionModal";
import { CATEGORIES, useTransactions } from "~/contexts/TransactionContext";
import TableRow from "~/components/ui/TableRow";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Transactions | Fi-Track" },
    { name: "description", content: "See your daily expenses and savings." },
    { property: "og:title", content: "Finance Tracker" },
    {
      property: "og:description",
      content: "Take control of your money today.",
    },
    {
      name: "keywords",
      content:
        "finance, tracker, budget, money, graph, dashboard, transact, transactions",
    },
  ];
}
const Transactions = () => {
  const { transactions } = useTransactions();
  const [type, setType] = useState<"all" | "expense" | "income">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState("");

  const filteredCategories =
    type === "all"
      ? CATEGORIES
      : CATEGORIES.filter((category) => category.type === type);
  return (
    <section className="min-h-screen bg-gray-50 py-8">
      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-xl">Transactions</h1>

          <button
            className="flex items-center font-semibold text-xs gap-2 bg-indigo-600 text-white px-2 md:px-4 py-2 rounded-md cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        </div>

        {/* Filters Card */}
        <div className="bg-white shadow-md rounded-md">
          <div className="flex gap-2 items-center p-6">
            <Filter className="w-4 h-4 text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-500">Filters</h2>
          </div>

          {/* Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="">
              <div className="flex flex-col gap-2 px-6">
                <h2 className="font-poppins tracking-wider text-gray-500">
                  Type
                </h2>
                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value as "all" | "income" | "expense");
                    setCategory("");
                  }}
                  className="border p-2 rounded-lg border-gray-300 text-sm px-4 font-poppins"
                >
                  <option value="all">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
            </div>
            <div className="">
              <div className="flex flex-col gap-2 px-6 pb-6">
                <h2 className="font-poppins tracking-wider text-gray-500">
                  Categories
                </h2>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                  className="border p-2 rounded-lg border-gray-300 text-sm px-4 font-poppins"
                >
                  <option value="">All categories</option>
                  {filteredCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Transactions List Card */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            {transactions.length > 0 ? (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr className="">
                    <th className="text-gray-500">DATE</th>
                    <th className="text-gray-500">DESCRIPTION</th>
                    <th className="text-gray-500">CATEGORY</th>
                    <th className="text-gray-500">TYPE</th>
                    <th className="text-gray-500">AMOUNT</th>
                    <th className="text-gray-500">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <TableRow key={t.id} transaction={t} />
                  ))}
                </tbody>
              </table>
            ) : (
              <h1 className="p-6 text-md font-poppins">
                No transactions found, try a different filter or add transaction
              </h1>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TransactionModal onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
};

export default Transactions;
