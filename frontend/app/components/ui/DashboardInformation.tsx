import React, { useEffect, useState } from "react";
import { type LucideIcon } from "lucide-react";
import { formatCurrency } from "~/utils/format/format";

export interface DashboardInformationProps {
  label: string;
  labelValue: number;
  labelValueColor: string;
  icon: LucideIcon;
  iconColor: string;
  iconBackground: string;
}
const DashboardInformation = ({
  label,
  labelValue,
  labelValueColor,
  icon: Icon,
  iconBackground,
  iconColor,
}: DashboardInformationProps) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 flex items-center justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
      <div className="flex flex-col gap-2">
        <p className="text-xs md:text-sm text-gray-500">{label}</p>
        <h1 className={`${labelValueColor} text-lg md:text-xl`}>
          {formatCurrency(labelValue)}
        </h1>
      </div>

      <div className={`rounded-full ${iconBackground} w-fit p-2`}>
        <Icon className={`${iconColor}`} />
      </div>
    </div>
  );
};

export default DashboardInformation;
