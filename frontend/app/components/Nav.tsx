import React from "react";
import Logo from "/favicon.png";
import { Link } from "react-router";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between p-4 md:justify-around shadow-md mb-0.5">
      <div className="flex gap-0.5 items-center">
        <img src={Logo} alt="" className="size-12" />
        <h1 className="font-montserrat text-indigo-600 font-bold text-2xl md:text-3xl tracking-wider">
          Fi-Track
        </h1>
      </div>
      <div className="flex items-center justify-center gap-2 md:gap-4 text-xs md:text-lg">
        <button className="">
          <Link to={"/log-in"} className="">
            Log In
          </Link>
        </button>
        <button className="bg-indigo-600 px-4 py-2 font-semibold rounded-lg text-white">
          <Link to={"/sign-up"} className="">
            Sign Up
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
