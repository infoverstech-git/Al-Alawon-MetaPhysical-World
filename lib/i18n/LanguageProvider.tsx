"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { defaultLocale, localeMeta, type Locale } from "./config";
import { dictionaries } from "./dictionaries";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: "rtl" | "ltr";
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);
const STORAGE_KEY = "al-alawn-meta-locale";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && stored in localeMeta && stored !== defaultLocale) {
      setLocaleState(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = localeMeta[locale].dir;
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  };

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
      dir: localeMeta[locale].dir,
      t: (key: string) => dictionaries[locale][key] ?? dictionaries.en[key] ?? key,
    }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
