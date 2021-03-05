import i18n from "i18next";
import enDashboard from "./en/dashboard.json";
import enProfile from "./en/profile.json";
import esProfile from "./es/profile.json";
import enCall from "./en/call.json";
import enCalls from "./en/calls.json";
import enLogin from "./en/login.json";
import esLogin from "./es/login.json";
import esDashboard from "./es/dashboard.json";
import esCall from "./es/call.json";
import enModals from "./en/modals.json";
import esModals from "./es/modals.json";
import enSettings from "./en/settings.json";
import esSettings from "./es/settings.json";

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
  },
  es: {
    login: esLogin,
    dashboard: esDashboard,
    profile: esProfile,
    call: esCall,
    modals: esModals,
    settings: esSettings,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "en",
  ns: ["login", "dashboard", "call"],
  resources,
});
