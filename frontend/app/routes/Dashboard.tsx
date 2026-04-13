import React, { useEffect, useState } from "react";
import type { Route } from "./+types/Dashboard";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import type { DashboardInformationProps } from "~/components/ui/DashboardInformation";
import DashboardInformation from "~/components/ui/DashboardInformation";
import { apiFetch } from "~/utils/api/apiFetch";
import { formatCurrency } from "~/utils/format/format";

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
  const [summary, setSummary] = useState({
    total_balance: 0,
    total_income: 0,
    total_expenses: 0,
  });

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

  return (
    <section className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
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
      </div>
    </section>
  );
};
export default Dashboard;
