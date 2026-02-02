import en from "./en.json";
import es from "./es.json";

export const supportedLocales = ["en", "es"];

const dictionaries = { en, es };

export function getLocaleFromUrl(url) {
  const [, first] = url.pathname.split("/");
  if (supportedLocales.includes(first)) return first;
  return "en";
}

export function t(locale, keyPath) {
  const dict = dictionaries[locale];
  const parts = keyPath.split(".");
  let value = dict;
  for (const p of parts) {
    if (value && typeof value === "object" && p in value) {
      value = value[p];
    } else {
      return undefined;
    }
  }
  return value;
}

