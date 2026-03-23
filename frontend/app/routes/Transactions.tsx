import React from "react";
import type { Route } from "./+types/Transactions";
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
  return (
    <section className="max-w-6xl mx-auto mt-4">
      <div className="px-4">Transactions</div>
    </section>
  );
};

export default Transactions;
