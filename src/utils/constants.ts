import { Route } from "src/types/Common";
import ProfilePage from "src/pages/Profile";
import CallsPage from "src/pages/Calls";
import SettingsPage from "src/pages/Settings";
import DashboardPage from "src/pages/Dashboard";
import CallPage from "src/pages/Call";
import CallFeedbackPage from "src/pages/CallFeedback";
import { Language } from "src/types/Session";

export const UNAUTHENTICATED_USER_ID = -1;

export const AVATAR_LARGE = 135;

export const ROUTES: Route[] = [
  { path: "/calls", component: CallsPage, label: "Calls" },
  { path: "/settings", component: SettingsPage, label: "Settings" },
  { path: "/profile/:id", component: ProfilePage, label: "Profile" },
  { path: "/call/:id", component: CallPage, label: "Call" },
  { path: "/feedback/:id", component: CallFeedbackPage, label: "Feedback" },
  { path: "/", component: DashboardPage, label: "Dash" },
];

export const TOKEN_KEY = "apiToken";

export const WRAPPER_PADDING = { padding: 24, paddingTop: 0 };

export const LANGUAGES: Record<Language, string> = {
  en: "English",
  es: "Español",
};
