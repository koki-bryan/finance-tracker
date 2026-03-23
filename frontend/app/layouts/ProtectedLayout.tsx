import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router";

const ProtectedLayout = () => {
  const [token, setToken] = useState<string | null>(null);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        setCheckedAuth(true);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/v1/me", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          setToken(null);
        } else {
          setToken(storedToken);
        }
      } catch (err) {
        localStorage.removeItem("token");
        setToken(null);
      }

      setCheckedAuth(true);
    };

    checkAuth();
  }, []);

  if (!checkedAuth) return null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
