import React from "react";
import { Link } from "react-router";

const Landing = () => {
  return (
    <div>
      Landing Page
      <button>
        <Link to={"/sign-up"}>Sign Up</Link>
      </button>
      <button>
        <Link to={"/log-in"}>Log In</Link>
      </button>
    </div>
  );
};

export default Landing;
