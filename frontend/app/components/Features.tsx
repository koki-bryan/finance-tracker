import React from "react";
import FeatureCard, { type FeatureCardProps } from "./ui/FeatureCard";
import {
  Wallet,
  TrendingUp,
  PieChart,
  Shield,
  BarChart3,
  Filter,
  CheckCircle,
} from "lucide-react";

const data: FeatureCardProps[] = [
  {
    color: "indigo",
    icon: TrendingUp,
    title: "Track Income & Expenses",
    text: "Easily log all your transactions with detailed categorization. Know exactly where your money comes from and where it goes",
  },
  {
    color: "purple",
    icon: PieChart,
    title: "Visual Analytics",
    text: "Beautiful charts and graphs show your spending patterns at a glance. Turn complex data into actionable insights.",
  },
  {
    color: "blue",
    icon: BarChart3,
    title: "Monthly Trends",
    text: "Compare your income and expenses across months. Identify trends and make better financial decisions.",
  },
  {
    color: "green",
    icon: Filter,
    title: "Smart Categorization",
    text: "Organize transactions into meaningful categories. Filter and search to find exactly what you need.",
  },
  {
    color: "yellow",
    icon: Shield,
    title: "Secure & Private",
    text: "Your financial data is stored securely. We never share your information with third parties.",
  },
  {
    color: "red",
    icon: Wallet,
    title: "Real-time Balance",
    text: "See your current balance update instantly. Always know your financial standing in real-time.",
  },
];
const Features = () => {
  return (
    <section className="bg-linear-to-br from-blue-50 to-white p-6 pb-12">
      <div className="py-12 flex flex-col gap-4">
        <h1 className="text-center font-semibold font-poppins text-xl md:text-3xl">
          Powerful Features to Manage Your Money
        </h1>
        <p className="text-center text-gray-600 md:text-lg max-w-2xl mx-auto font-poppins">
          Everything you need to track, analyze, and improve your financial
          habits in one simple platform.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-6xl mx-auto">
        {data.map((feature) => (
          <FeatureCard
            key={feature.title}
            color={feature.color}
            icon={feature.icon}
            title={feature.title}
            text={feature.text}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
