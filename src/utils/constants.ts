import { Route } from "src/types/Common";
import DashboardPage from "src/pages/Dashboard";
import CallPage from "src/pages/Call";

export const UNAUTHENTICATED_USER_ID = -1;

export const ROUTES: Route[] = [
  { path: "/call/:id", component: CallPage, label: "Call" },
  { path: "/", component: DashboardPage, label: "Dash" },
];

export const TOKEN_KEY = "apiToken";
export const REMEMBER_TOKEN_KEY = "rememberToken";
