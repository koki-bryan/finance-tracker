import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Landing.tsx"),
  route("login", "routes/LogIn.tsx"),
  route("signup", "routes/SignUp.tsx"),
  route("app", "layouts/ProtectedLayout.tsx", [
    route("", "layouts/AppLayout.tsx", [
      route("dashboard", "routes/Dashboard.tsx"),
      route("transactions", "routes/Transactions.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
