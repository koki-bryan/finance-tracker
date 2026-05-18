import React from "react";
import ChartImg from "/assets/charts-img.jpg";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const content = [
  {
    id: 1,
    heading: "Simple & Intuitive",
    description:
      "No complicated spreadsheets or confusing interfaces. Just clean, simple money tracking.",
  },
  {
    id: 2,
    heading: "Understand Your Habits",
    description:
      " Visual insights help you identify spending patterns and areas where you can save more.",
  },
  {
    id: 3,
    heading: "Make Better Decisions",
    description:
      "Armed with data about your finances, you can make informed choices about your money.",
  },
  {
    id: 4,
    heading: "Stay Accountable",
    description:
      "Regular tracking keeps you accountable to your financial goals and helps build better money habits.",
  },
  {
    id: 5,
    heading: "Completely Free",
    description:
      "Access all features at no cost. No hidden fees, no premium tiers, just free financial tracking.",
  },
];
const WhyUse = () => {
  return (
    <section className="bg-linear-to-br from-gray-50 to bg-indigo-50 p-6 pb-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 py-12">
        <motion.div 
          className="rounded-2xl overflow-hidden w-full"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <img src={ChartImg} alt="" className="w-full h-full object-cover" />
        </motion.div>
        <div className="">
          <motion.h1 
            className="font-semibold text-base md:text-xl font-poppins mb-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            Why choose Fi-Track?
          </motion.h1>
          <div>
            {content.map((c, i) => (
              <motion.div 
                className="flex gap-2 items-start my-2" 
                key={c.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <CheckCircle className="text-green-500 w-6 h-6 mt-1 shrink-0" />
                <div>
                  <h1 className="text-lg mb-1 font-medium">{c.heading}</h1>
                  <p className="text-sm max-w-sm">{c.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUse;
