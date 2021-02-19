import i18n from "i18next";
import enDashboard from "./en/dashboard.json";
import enCall from "./en/call.json";
import enLogin from "./en/login.json";
import esLogin from "./es/login.json";
import esDashboard from "./es/dashboard.json";
import esCall from "./es/call.json";

import { initReactI18next } from "react-i18next";

export const resources = {
  en: {
    login: enLogin,
    dashboard: enDashboard,
    call: enCall,
  },
  es: {
    login: esLogin,
    dashboard: esDashboard,
    call: esCall,
  },
} as const;

i18n.use(initReactI18next).init({
  lng: "en",
  ns: ["login", "dashboard", "call"],
  resources,
});
