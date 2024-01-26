import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ResourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";

import { assets } from "@/assets/assets";

i18n
  .use(ResourcesToBackend((locale: string, ns: string) => assets.locales[locale]?.[ns]?.()))
  .use(new LanguageDetector(null, { caches: ["cookie"], lookupCookie: "locale" }))
  .use(initReactI18next)
  .init({
    load: "languageOnly",
    lowerCaseLng: true,
    cleanCode: true,
    fallbackLng: "en",
    supportedLngs: ["en"],
    interpolation: { escapeValue: false },
    ns: ["common"]
  });

i18n.on("languageChanged", (lng) => {
  /**
   * Stripe "-" character from languages since it"s not necessary.
   * Also needed for /routes/Menu.tsx language component to work.
   * For ex. en-US -> en, tr-TR -> tr
   */
  if (lng.indexOf("-") === -1) return;

  const stripped = lng.split("-")[0];
  if (stripped) i18n.changeLanguage(stripped);
})

//i18n.on("initialized", () => {
//  useAppStore.getState().changeLocale(i18n.language);
//})

export default i18n;