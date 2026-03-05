import { Link } from "react-router";
import type { Route } from "./+types/SignUp";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Sign Up | Fi Track" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function SignUp() {
  const handleSubmit = async () => {};
  return (
    <section className="h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 flex flex-col items-center justify-center rounded-lg gap-4 shadow-lg">
        <div className="mx-auto bg-indigo-500 p-4 rounded-full flex items-center justify-center size-fit">
          <img src="/icons/user-add.svg" alt="" className="size-10" />
        </div>
        <h1 className="font-bold text-xl">Create Account</h1>
        <p className="text-sm text-gray-500">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <div className="form-control">
            <label htmlFor="full-name">Full Name:</label>
            <input type="text" name="full-name" id="full-name" />
          </div>
          <div className="form-control">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" required />
          </div>
          <div className="form-control">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              required
              type="password"
              name="confirm-password"
              id="confirm-password"
            />
            <button
              type="submit"
              className="bg-linear-to-br cursor-pointer from-indigo-500 to-blue-500 py-2 text-white font-semibold rounded-xl mt-2 shadow-sm"
            >
              Sign Up
            </button>
            <p className="text-xs text-center mt-1 text-gray-500">
              Already have an account?{" "}
              <span className="text-indigo-500 cursor-pointer">
                <Link to={"/log-in"}>Log In</Link>
              </span>
            </p>
          </div>
          <div></div>
        </form>
      </div>
    </section>
  );
}
