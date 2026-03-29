import React from "react";
import type { Route } from "./+types/Dashboard";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import type { DashboardInformationProps } from "~/components/ui/DashboardInformation";
import DashboardInformation from "~/components/ui/DashboardInformation";

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

const dashboardColumns: DashboardInformationProps[] = [
  {
    label: "Total Balance",
    labelValue: 19,
    labelValueColor: "text-green-600",
    icon: Wallet,
    iconBackground: "bg-indigo-200",
    iconColor: "text-indigo-600",
  },
  {
    label: "Total Income",
    labelValue: 90,
    labelValueColor: "text-green-600",
    icon: TrendingUp,
    iconBackground: "bg-green-200",
    iconColor: "text-green-600",
  },
  {
    label: "Total Expenses",
    labelValue: 71,
    labelValueColor: "text-red-400",
    icon: TrendingDown,
    iconBackground: "bg-red-200",
    iconColor: "text-red-600",
  },
];

const Dashboard = () => {
  return (
    // Background
    <section className="min-h-screen bg-gray-50 py-8">
      {/*Content Container */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Column Heading Container*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Column Headings */}
          {dashboardColumns.map((col) => (
            <DashboardInformation
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
