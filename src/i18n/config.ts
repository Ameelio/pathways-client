import i18n from "i18next";
import enDashboard from "./en/dashboard.json";
import enProfile from "./en/profile.json";
import esProfile from "./es/profile.json";
import enCall from "./en/call.json";
import enCalls from "./en/calls.json";
import enLogin from "./en/login.json";
import enFeedback from "./en/feedback.json";
import enError from "./en/error.json";
import enCommon from "./en/common.json";
import esLogin from "./es/login.json";
import esDashboard from "./es/dashboard.json";
import esCall from "./es/call.json";
import enModals from "./en/modals.json";
import esModals from "./es/modals.json";
import enSettings from "./en/settings.json";
import esSettings from "./es/settings.json";
import esFeedback from "./es/feedback.json";
import esError from "./es/error.json";
import esCommon from "./es/common.json";

import { initReactI18next } from "react-i18next";

export const resources = {
  en: {
    login: enLogin,
    dashboard: enDashboard,
    profile: enProfile,
    call: enCall,
    calls: enCalls,
    modals: enModals,
    settings: enSettings,
    feedback: enFeedback,
    error: enError,
    common: enCommon,
  },
  es: {
    login: esLogin,
    dashboard: esDashboard,
    profile: esProfile,
    call: esCall,
    modals: esModals,
    settings: esSettings,
    feedback: esFeedback,
    error: esError,
    common: esCommon,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "en",
  ns: [
    "login",
    "dashboard",
    "call",
    "profile",
    "settings",
    "modals",
    "feedback",
    "error",
    "common",
  ],
  resources,
});
