// utils/format.js
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
};

// Then in your Dashboard component:
//<span>{formatCurrency(summary.total_income)}</span>;
// Renders: $1,234.50
