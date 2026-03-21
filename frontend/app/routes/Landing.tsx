import React from "react";
import { Link } from "react-router";
import Features from "~/components/Features.tsx";
import LandingSection from "~/components/LandingSection";
import Nav from "~/components/Nav";

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
