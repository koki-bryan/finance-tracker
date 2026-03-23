import React from "react";
import { Link } from "react-router";
import Features from "~/components/Features";
import LandingSection from "~/components/LandingSection";
import Nav from "~/components/Nav";

import type { Route } from "./+types/Landing"; // If using generated types

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Finance Tracker" },
    {
      name: "description",
      content: "The best tool to track your daily expenses and savings.",
    },
    { property: "og:title", content: "Finance Tracker" },
    {
      property: "og:description",
      content: "Take control of your money today.",
    },
    // You can also add custom attributes
    { name: "keywords", content: "finance, tracker, budget, money, graph" },
  ];
}

const Landing = () => {
  return (
    <>
      <Nav />
      <LandingSection />
      <Features />
    </>
  );
};

export default Landing;
