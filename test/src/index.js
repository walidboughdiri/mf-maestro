import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { i18nResources, startMediator } from "mf-maestro";
import MainPage from "./pages/MainPage";
import init from "./init";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init(
    {
      resources: i18nResources,
      lng: "en",
      keySeparator: false, // we do not use keys in form messages.welcome
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
    },
    () => {
      startMediator("root", MainPage, init);
    }
  );
