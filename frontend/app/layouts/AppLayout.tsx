import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import NavApp from "~/components/NavApp";

const AppLayout = () => {
  const location = useLocation();

  if (location.pathname === "/app") {
    return <Navigate to="/app/dashboard" replace />;
  }
  return (
    <main>
      <NavApp />
      <Outlet />
    </main>
  );
};

export default AppLayout;
