import React, { useEffect, useState } from "react";
import type { Route } from "./+types/Dashboard";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import type { DashboardInformationProps } from "~/components/ui/DashboardInformation";
import DashboardInformation from "~/components/ui/DashboardInformation";
import { apiFetch } from "~/utils/api/apiFetch";
import { formatCurrency } from "~/utils/format/format";
import { useTransactions, CATEGORIES } from "~/contexts/TransactionContext";
import {
  BarChart,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import RecentTransactions from "~/components/RecentTransactions";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard | Fi-Track" },
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

const Dashboard = () => {
  const { transactions } = useTransactions();
  const [summary, setSummary] = useState({
    total_balance: 0,
    total_income: 0,
    total_expenses: 0,
  });

  // 1. Pre-calculate totals for ALL categories in one single pass
  const totalsByCategoryId = transactions.reduce<Record<number, number>>(
    (acc, t) => {
      const id = t.category_id;
      acc[id] = (acc[id] || 0) + Number(t.amount);
      return acc;
    },
    {},
  );

  // 2. Simply look up the pre-calculated values
  const expenseData = CATEGORIES.filter((c) => c.type === "expense")
    .map((c) => ({
      name: c.name,
      value: totalsByCategoryId[c.id] || 0, // Instant lookup!
    }))
    .filter((d) => d.value > 0);
  // console.log(transactions);
  const dashboardColumns: DashboardInformationProps[] = [
    {
      label: "Total Balance",
      labelValue: summary.total_balance,
      labelValueColor: "text-green-600",
      icon: Wallet,
      iconBackground: "bg-indigo-200",
      iconColor: "text-indigo-600",
    },
    {
      label: "Total Income",
      labelValue: summary.total_income,
      labelValueColor: "text-green-600",
      icon: TrendingUp,
      iconBackground: "bg-green-200",
      iconColor: "text-green-600",
    },
    {
      label: "Total Expenses",
      labelValue: summary.total_expenses,
      labelValueColor: "text-red-400",
      icon: TrendingDown,
      iconBackground: "bg-red-200",
      iconColor: "text-red-600",
    },
  ];

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await apiFetch(
          "http://localhost:5000/api/v1/dashboard",
        );

        if (!response || !response.ok)
          throw new Error("Failed to fetch summary");

        const data = await response.json();
        setSummary(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchSummary();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
  return (
    <section className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Dashboard Columns Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dashboardColumns.map((col) => (
            <DashboardInformation
              key={col.label}
              label={col.label}
              labelValue={col.labelValue}
              labelValueColor={col.labelValueColor}
              icon={col.icon}
              iconBackground={col.iconBackground}
              iconColor={col.iconColor}
            />
          ))}
        </div>

        {/* Chart Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {/* Pie Chart */}
          <div className="w-full h-80 bg-white shadow-md rounded-md p-4">
            <h1 className="font-semibold tracking-tight lg:text-lg">
              Expenses by Category
            </h1>
            {transactions.length > 0 ? (
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={expenseData} // Your optimized array
                    dataKey="value" // What determines slice size
                    nameKey="name" // What appears in the Legend
                    cx="50%" // Horizontal center
                    cy="50%" // Vertical center
                    outerRadius={80} // Size of the pie
                    label // Displays category names next to slices
                  >
                    {/* 2. Map colors to each slice using Cell */}
                    {expenseData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip></Tooltip>
                  <Legend className="pb-2"></Legend>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <h1 className="text-xs md:text-sm text-gray-500 text-center">
                  No expense data available
                </h1>
              </div>
            )}
          </div>
          {/* Bar Chart */}
          <div className="bg-white shadow-md rounded-md p-4">
            <BarChart />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mt-4">
          <RecentTransactions />
        </div>
      </div>
    </section>
  );
};
export default Dashboard;
