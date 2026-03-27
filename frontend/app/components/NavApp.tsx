import React from "react";
import { Link, NavLink, useNavigate } from "react-router";
import Logo from "/favicon.png";
import { LayoutList, DollarSign } from "lucide-react";

const NavApp = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav className="flex flex-col p-4 md:py-8 shadow-md mb-0.5 ">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex justify-between gap-0.5 items-center ">
          <div className="flex items-center gap-1">
            <img src={Logo} alt="" className="size-12" />
            <h1 className="font-montserrat text-indigo-600 font-bold text-2xl md:text-3xl lg:text-4xl tracking-wider">
              Fi-Track
            </h1>
          </div>

          <button
            className="bg-indigo-600 px-4 py-2 font-semibold rounded-lg text-xs md:text-lg text-white cursor-pointer"
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>

        <div className="mt-4 flex gap-6">
          <NavLink
            to="/app/dashboard"
            className={({ isActive }) =>
              `px-4 pb-2 text-sm md:text-base font-medium border-b-2 -mb-px transition-all duration-300 ease-in-out flex gap-1 items-center ${
                isActive
                  ? "text-indigo-600 border-indigo-600"
                  : "text-gray-500 border-transparent hover:text-indigo-600 hover:border-indigo-300"
              }`
            }
          >
            <LayoutList className="w-4 h-4" />
            Dashboard
          </NavLink>
          <NavLink
            to="/app/transactions"
            className={({ isActive }) =>
              `px-4 pb-2 text-sm md:text-base font-medium border-b-2 -mb-px transition-all duration-300 ease-in-out flex gap-1 items-center ${
                isActive
                  ? "text-indigo-600 border-indigo-600"
                  : "text-gray-500 border-transparent hover:text-indigo-600 hover:border-indigo-300"
              }`
            }
          >
            <DollarSign className="w-4 h-4" />
            Transactions
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavApp;
