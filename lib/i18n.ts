import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../i18n/locales/en/data.json";
import de from "../i18n/locales/de/data.json";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      de: { translation: de },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
