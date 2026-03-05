import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Landing.tsx"),
  route("log-in", "routes/LogIn.tsx"),
  route("sign-up", "routes/SignUp.tsx"),
  route("app", "routes/app.tsx"),
] satisfies RouteConfig;
