import React from "react";
import { Link } from "react-router";
import Features from "~/components/Features";
import LandingSection from "~/components/LandingSection";
import Nav from "~/components/Nav";

import type { Route } from "./+types/Landing"; // If using generated types
import WhyUse from "~/components/WhyUse";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Fi-Track" },
    {
      name: "description",
      content: "The best tool to track your daily expenses and savings.",
    },
    { property: "og:title", content: "Finance Tracker" },
    {
      property: "og:description",
      content: "Take control of your money today.",
    },

    { name: "keywords", content: "finance, tracker, budget, money, graph" },
  ];
}

const Landing = () => {
  return (
    <>
      <Nav />
      <LandingSection />
      <Features />
      <WhyUse />
    </>
  );
};

export default Landing;
