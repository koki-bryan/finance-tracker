import React from "react";
import { type LucideIcon } from "lucide-react";

export interface FeatureCardProps {
  color: string;
  icon: LucideIcon;
  title: string;
  text: string;
}
const iconColorMap = {
  indigo: "text-indigo-600",
  purple: "text-purple-600",
  blue: "text-blue-600",
  green: "text-green-600",
  yellow: "text-yellow-600",
  red: "text-red-600",
};

const backgroundColorMap = {
  indigo: "bg-indigo-100",
  purple: "bg-purple-100",
  blue: "bg-blue-100",
  green: "bg-green-100",
  yellow: "bg-yellow-100",
  red: "bg-red-100",
};
const FeatureCard = ({ color, icon: Icon, title, text }: FeatureCardProps) => {
  return (
    <div className="rounded-lg shadow-md border-gray-200 border p-4 flex flex-col max-w-sm cursor-pointer">
      <div className={`${backgroundColorMap[color]} p-3 w-fit rounded-lg mb-4`}>
        <Icon className={`${iconColorMap[color]} w-6 h-6`} />
      </div>
      <h1 className="font-semibold text-lg mb-2">{title}</h1>
      <p className="text-xs max-w-md">{text}</p>
    </div>
  );
};

export default FeatureCard;
