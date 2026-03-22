import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "/favicon.png";

const NavApp = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav className="flex items-center justify-between p-4 md:py-8 md:justify-around shadow-md mb-0.5">
      <div className="flex gap-0.5 items-center">
        <img src={Logo} alt="" className="size-12" />
        <h1 className="font-montserrat text-indigo-600 font-bold text-2xl md:text-3xl lg:text-4xl tracking-wider">
          Fi-Track
        </h1>
      </div>

      <div className="flex items-center justify-center gap-2 md:gap-4 text-xs md:text-lg">
        <button
          className="bg-indigo-600 px-4 py-2 font-semibold rounded-lg text-white cursor-pointer"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
      <NavLink to={"/app/dashboard"}>Dashboard</NavLink>
      <NavLink to={"/app/transactions"}>Transactions</NavLink>
    </nav>
  );
};

export default NavApp;
