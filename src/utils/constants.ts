import { Quote, Route } from "src/types/Common";
import ProfilePage from "src/pages/Profile";
import DashboardPage from "src/pages/Dashboard";
import CallPage from "src/pages/Call";
import CallFeedbackPage from "src/pages/CallFeedback";
import { Language } from "src/types/Session";

export const UNAUTHENTICATED_USER_ID = -1;

export const AVATAR_LARGE = 135;

export const ROUTES: Route[] = [
  { path: "/profile/:id", component: ProfilePage, label: "Profile" },
  { path: "/call/:id", component: CallPage, label: "Call" },
  { path: "/feedback/:id", component: CallFeedbackPage, label: "Feedback" },
  { path: "/", component: DashboardPage, label: "Dash" },
];

export const TOKEN_KEY = "apiToken";

export const WRAPPER_PADDING = { padding: 24, paddingTop: 0 };

export const QUOTES: Quote[] = [
  {
    author: "Mary Ann Evans",
    quote: "It is never too late to be what you might have been.",
    description: "",
    background:
      "https://images.unsplash.com/photo-1536257104079-aa99c6460a5a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    author: "Walt Disney",
    quote:
      "All our dreams can come true, if we have the courage to pursue them.",
    description: "",
    background:
      "https://images.unsplash.com/photo-1508556497405-ed7dcd94acfc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    author: "Mark Twain",
    quote: "The secret of getting ahead is getting started",
    description: "",
    background:
      "https://images.unsplash.com/photo-1532971077387-7c6568101df5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    author: "Babe Ruth",
    quote: "It’s hard to beat a person who never gives up.",
    description: "",
    background:
      "https://images.unsplash.com/photo-1564521456797-9f176245daa9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80",
  },
];

export const LANGUAGES: Record<Language, string> = {
  en: "English",
  es: "Español",
};
