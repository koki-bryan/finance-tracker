import React from "react";
import type { Route } from "./+types/Dashboard";

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
  return (
    <section className="max-w-6xl mx-auto mt-4">
      <div className="px-4">Dashboard</div>
    </section>
  );
};

export default Dashboard;
