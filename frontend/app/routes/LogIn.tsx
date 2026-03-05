import { Link } from "react-router";
import type { Route } from "./+types/LogIn";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Log In | FiTrack" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function LogIn() {
  const handleSubmit = async () => {};
  return (
    <section className="h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md p-6 flex flex-col items-center justify-center rounded-lg gap-4 shadow-lg">
        <div className="mx-auto bg-indigo-500 p-4 rounded-full flex items-center justify-center size-fit">
          <img src="/icons/log-in.svg" alt="" className="size-10" />
        </div>
        <h1 className="font-bold text-xl">Welcome Back</h1>
        <p className="text-sm text-gray-500">Sign in to your account</p>

        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          <div className="form-control">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" required />
          </div>

          <div className="form-control">
            <button
              type="submit"
              className="bg-linear-to-br cursor-pointer from-indigo-500 to-blue-500 py-2 text-white font-semibold rounded-xl mt-2 shadow-sm"
            >
              Log In
            </button>
            <p className="text-xs text-center mt-1 text-gray-500">
              Don't have an account?{" "}
              <span className="text-indigo-500 cursor-pointer">
                <Link to={"/sign-up"}>Sign Up</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
