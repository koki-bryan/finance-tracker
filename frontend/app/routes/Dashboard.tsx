import React, { useEffect, useState } from "react";
import type { Route } from "./+types/Dashboard";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import type { DashboardInformationProps } from "~/components/ui/DashboardInformation";
import DashboardInformation from "~/components/ui/DashboardInformation";
import { apiFetch } from "~/utils/api/apiFetch";
import {
  useTransactions,
  CATEGORIES,
  type IESummary,
} from "~/contexts/TransactionContext";
import {
  BarChart,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import RecentTransactions from "~/components/RecentTransactions";
import {
  ExpenseTooltip,
  renderActiveShape,
} from "~/components/ui/PieChartEdits";
import IEBarChart from "~/components/IEBarChart";

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

// ─── Color palette keyed by category name ───────────────────────────────────
const CATEGORY_COLORS: Record<string, string> = {
  Housing: "#5DCAA5",
  Food: "#7F77DD",
  Transport: "#EF9F27",
  Healthcare: "#D85A30",
  Education: "#378ADD",
  Shopping: "#D4537E",
  Utilities: "#639922",
  Entertainment: "#E24B4A",
  Other: "#888780",
};
const FALLBACK_COLORS = [
  "#5DCAA5",
  "#7F77DD",
  "#EF9F27",
  "#D85A30",
  "#378ADD",
  "#D4537E",
  "#639922",
  "#E24B4A",
  "#888780",
];

// ─── Dashboard ───────────────────────────────────────────────────────────────
const Dashboard = () => {
  const { transactions } = useTransactions();
  const [summary, setSummary] = useState({
    total_balance: 0,
    total_income: 0,
    total_expenses: 0,
  });

  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const totalsByCategoryId = transactions.reduce<Record<number, number>>(
    (acc, t) => {
      const id = t.category_id;
      acc[id] = (acc[id] || 0) + Number(t.amount);
      return acc;
    },
    {},
  );

  const expenseData = CATEGORIES.filter((c) => c.type === "expense")
    .map((c, i) => ({
      name: c.name,
      value: totalsByCategoryId[c.id] || 0,
      fill:
        CATEGORY_COLORS[c.name] ?? FALLBACK_COLORS[i % FALLBACK_COLORS.length],
    }))
    .filter((d) => d.value > 0);

  const expenseTotal = expenseData.reduce((sum, d) => sum + d.value, 0);

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

  //Data fetching for the INCOME VS EXPENSE LAST 6 MONTHS
  const [IESummary, setIESummary] = useState<IESummary[]>([]);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const result = await apiFetch(
          "http://localhost:5000/api/v1/transaction/summary",
        );

        if (!result || !result.ok) throw new Error("Failed to fetch summary");
        const data = await result.json();
        setIESummary(data);
      } catch (err) {
        console.error("Fetching error:", err);
      }
    };

    fetchSummary();
  }, []);

  return (
    <section className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Dashboard Summary Cards */}
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

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {/* Pie Chart */}
          <div className="w-full h-80 bg-white shadow-md rounded-md p-4">
            <h2 className="font-semibold tracking-tight lg:text-lg mb-1">
              Expenses by Category
            </h2>
            {expenseData.length > 0 ? (
              <ResponsiveContainer width={"100%"} height={260}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                    stroke="none"
                    activeIndex={activeIdx ?? undefined}
                    activeShape={renderActiveShape}
                    onMouseEnter={(_, i) => setActiveIdx(i)}
                    onMouseLeave={() => setActiveIdx(null)}
                  />
                  {/* ✅ Idle center label — rendered as a direct SVG child of PieChart */}
                  {activeIdx === null && (
                    <text
                      x="50%"
                      y="44%"
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{ fontSize: 11, fill: "#9ca3af" }}
                    >
                      Total Spent
                    </text>
                  )}
                  {activeIdx === null && (
                    <text
                      x="50%"
                      y="56%"
                      textAnchor="middle"
                      dominantBaseline="central"
                      style={{ fontSize: 16, fontWeight: 600, fill: "#111827" }}
                    >
                      ₱{expenseTotal.toLocaleString()}
                    </text>
                  )}
                  <Tooltip content={<ExpenseTooltip total={expenseTotal} />} />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => (
                      <span className="text-xs text-gray-500">{value}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-xs md:text-sm text-gray-500 text-center">
                  No expense data available
                </p>
              </div>
            )}
          </div>

          {/* Bar Chart */}
          <div className="bg-white shadow-md rounded-md p-4">
            <ResponsiveContainer width={"100%"} height={260}>
              <IEBarChart data={IESummary} />
            </ResponsiveContainer>
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
