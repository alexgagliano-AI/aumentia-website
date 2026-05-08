import fr from "./translations/fr";
import en from "./translations/en";
import it from "./translations/it";

export const locales = ["fr", "en", "it"] as const;
export type Locale = (typeof locales)[number];
export type { Translations } from "./translations/types";
export const defaultLocale: Locale = "fr";

const translations = { fr, en, it };

export function getTranslations(locale: string) {
  const l = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale;
  return translations[l];
}

export const localeLabels: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  it: "IT",
};
