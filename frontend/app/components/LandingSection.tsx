import React from "react";
import BusinessImg from "/assets/business-img.jpg";
import { Link } from "react-router";
import ArrowRight from "/icons/arrow-right.svg";

const LandingSection = () => {
  return (
    <section className="bg-linear-to-tr from-blue-50/80 to-indigo-100/50 pb-8 shadow-md mb-0.5">
      <div className="max-w-6xl mx-auto p-6 pt-16 grid-cols-1 grid items-center gap-6 lg:gap-8 xl:gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-4 ">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wide bg-linear-to-br from-indigo-600 via-blue-500 to-purple-600 text-transparent bg-clip-text">
            Take Control of Your Financial Future
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 tracking-wide leading-relaxed max-w-md lg:max-w-lg xl:max-w-xl">
            Track every dollar, understand your spending habits, and make
            smarter financial decisions with our intuitive personal finance
            tracker.
          </p>
          <div className="flex flex-col gap-4 md:flex-row">
            <button className="p-4 text-base bg-indigo-600 font-poppins text-white rounded-xl cursor-pointer flex items-center justify-center gap-2">
              <Link to={"/signup"}>Get Started for Free</Link>
              <img src={ArrowRight} alt="" className="size-5" />
            </button>
            <button className="md:px-8 p-4 text-base bg-white font-poppins text-indigo-600 rounded-xl border border-indigo-600 cursor-pointer">
              <Link to={"/login"}>Log in</Link>
            </button>
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-2xl shadow-xl lg:max-h-130">
          <img
            src={BusinessImg}
            alt="Financial dashboard illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default LandingSection;
