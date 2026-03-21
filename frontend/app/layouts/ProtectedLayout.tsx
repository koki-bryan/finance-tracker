import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router";

const ProtectedLayout = () => {
  const [token, setToken] = useState<string | null>(null);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setCheckedAuth(true);
  });

  if (!checkedAuth) return null;
  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
