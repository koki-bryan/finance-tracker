import React, { useState } from "react";
import type { Route } from "./+types/Transactions";
import { Plus, Filter, ArrowUpDown, type LucideIcon } from "lucide-react";
import TransactionModal from "~/components/TransactionModal";
import { CATEGORIES, useTransactions, type Transaction } from "~/contexts/TransactionContext";
import TableRow from "~/components/ui/TableRow";
import EmptyState from "~/components/ui/EmptyState";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Transactions | Fi-Track" },
    { name: "description", content: "See your daily expenses and savings." },
    { property: "og:title", content: "Finance Tracker" },
    {
      property: "og:description",
      content:
        "Take control of your money today. Add, Delete or Update your transactions here.",
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
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredCategories =
    type === "all"
      ? CATEGORIES
      : CATEGORIES.filter((category) => category.type === type);
  const filteredTransactions = transactions.filter((t) => {
    const cat = CATEGORIES.find((c) => c.id === t.category_id);
    if (!cat) return false;
    
    // Check type filter
    if (type !== "all" && cat.type !== type) return false;
    
    // Check category filter
    if (category && category !== "all" && t.category_id.toString() !== category) return false;
    
    return true;
  });

  const sortedTransactions = React.useMemo(() => {
    let sortableItems = [...filteredTransactions];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        let aValue: any = a[sortConfig.key as keyof Transaction];
        let bValue: any = b[sortConfig.key as keyof Transaction];
        
        // Handle special cases like category name or amount parsing
        if (sortConfig.key === "amount") {
          aValue = parseFloat(a.amount);
          bValue = parseFloat(b.amount);
        } else if (sortConfig.key === "date") {
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
        } else if (sortConfig.key === "category") {
          aValue = CATEGORIES.find(c => c.id === a.category_id)?.name || "";
          bValue = CATEGORIES.find(c => c.id === b.category_id)?.name || "";
        } else if (sortConfig.key === "type") {
          aValue = CATEGORIES.find(c => c.id === a.category_id)?.type || "";
          bValue = CATEGORIES.find(c => c.id === b.category_id)?.type || "";
        }

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredTransactions, sortConfig]);

  const SortableHeader = ({ label, sortKey }: { label: string; sortKey: string }) => (
    <th 
      className="text-gray-500 cursor-pointer hover:text-gray-700 transition-colors py-3 text-left font-medium text-sm"
      onClick={() => requestSort(sortKey)}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown className="w-3 h-3 opacity-50" />
      </div>
    </th>
  );

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
            {/* TYPE CONTAINER */}
            <div className="">
              <div className="flex flex-col gap-2 px-6">
                <h2 className="font-poppins tracking-wider text-gray-500">
                  Type
                </h2>
                <select
                  value={type}
                  onChange={(e) => {
                    setType(e.target.value as "all" | "income" | "expense");
                    setCategory("all"); // Reset category to "all" when type changes
                  }}
                  className="border p-2 rounded-lg border-gray-300 text-sm px-4 font-poppins"
                >
                  <option value="all">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
            </div>

            {/* CATEGORIES CONTAINER */}
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
                  <option value="all">All categories</option>
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
            {sortedTransactions.length > 0 ? (
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <SortableHeader label="DATE" sortKey="date" />
                    <SortableHeader label="DESCRIPTION" sortKey="description" />
                    <SortableHeader label="CATEGORY" sortKey="category" />
                    <SortableHeader label="TYPE" sortKey="type" />
                    <SortableHeader label="AMOUNT" sortKey="amount" />
                    <th className="text-gray-500 py-3 text-left font-medium text-sm">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTransactions.map((t) => (
                    <TableRow key={t.id} transaction={t} />
                  ))}
                </tbody>
              </table>
            ) : (
              <EmptyState />
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
