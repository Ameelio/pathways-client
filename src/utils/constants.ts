import { Quote, Route } from "src/types/Common";
import DashboardPage from "src/pages/Dashboard";
import CallPage from "src/pages/Call";

export const UNAUTHENTICATED_USER_ID = -1;

export const ROUTES: Route[] = [
  { path: "/call/:id", component: CallPage, label: "Call" },
  { path: "/", component: DashboardPage, label: "Dash" },
];

export const TOKEN_KEY = "apiToken";
export const REMEMBER_TOKEN_KEY = "rememberToken";

export const WRAPPER_PADDING = { padding: 24, paddingTop: 0 };

export const QUOTES: Quote[] = [
  {
    author: "Mary Ann Evans",
    quote: "It is never too late to be what you might have been.",
    description: "",
  },
  {
    author: "Walt Disney",
    quote:
      "All our dreams can come true, if we have the courage to pursue them.",
    description: "",
  },
  {
    author: "Mark Twain",
    quote: "The secret of getting ahead is getting started",
    description: "",
  },
  {
    author: "Babe Ruth",
    quote: "It’s hard to beat a person who never gives up.",
    description: "",
  },
];
