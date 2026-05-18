import React from "react";
import BusinessImg from "/assets/business-img.jpg";
import { Link } from "react-router";
import ArrowRight from "/icons/arrow-right.svg";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.8,
      ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for slow start and smooth acceleration
    },
  },
};

const LandingSection = () => {
  return (
    <section className="bg-linear-to-tr from-blue-50/80 to-indigo-100/50 pb-8 shadow-md mb-0.5">
      <div className="max-w-6xl mx-auto p-6 pt-16 grid-cols-1 grid items-center gap-6 lg:gap-8 xl:gap-10 lg:grid-cols-2">
        <motion.div
          className="flex flex-col gap-4 "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-semibold font-montserrat tracking-wide bg-linear-to-br from-indigo-600 via-blue-500 to-purple-600 text-transparent bg-clip-text"
            variants={itemVariants}
          >
            Take Control of Your Financial Future
          </motion.h1>
          <motion.p
            className="text-sm md:text-base font-poppins lg:text-lg text-gray-600 tracking-wide leading-relaxed max-w-md lg:max-w-lg xl:max-w-xl"
            variants={itemVariants}
          >
            Track every dollar, understand your spending habits, and make
            smarter financial decisions with our intuitive personal finance
            tracker.
          </motion.p>
          <motion.div
            className="flex flex-col gap-4 md:flex-row"
            variants={itemVariants}
          >
            <button className="p-4 text-base bg-indigo-600 font-poppins text-white rounded-xl cursor-pointer flex items-center justify-center gap-2">
              <Link to={"/signup"}>Get Started for Free</Link>
              <img src={ArrowRight} alt="" className="size-5" />
            </button>
            <button className="md:px-8 p-4 text-base bg-white font-poppins text-indigo-600 rounded-xl border border-indigo-600 cursor-pointer">
              <Link to={"/login"}>Log in</Link>
            </button>
          </motion.div>
        </motion.div>
        <motion.div
          className="w-full overflow-hidden rounded-2xl shadow-xl lg:max-h-130"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            delay: 0.4,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <img
            src={BusinessImg}
            alt="Financial dashboard illustration"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default LandingSection;
