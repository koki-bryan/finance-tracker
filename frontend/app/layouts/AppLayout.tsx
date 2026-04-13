import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import NavApp from "~/components/NavApp";
import { TransactionProvider } from "~/contexts/TransactionContext";

const AppLayout = () => {
  const location = useLocation();

  if (location.pathname === "/app") {
    return <Navigate to="/app/dashboard" replace />;
  }
  return (
    <TransactionProvider>
      <main>
        <NavApp />
        <Outlet />
      </main>
    </TransactionProvider>
  );
};

export default AppLayout;
