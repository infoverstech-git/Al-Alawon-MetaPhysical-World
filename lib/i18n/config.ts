export const locales = ["en", "ur", "ar"] as const;
export type Locale = (typeof locales)[number];

export const localeMeta: Record<Locale, { label: string; dir: "rtl" | "ltr" }> = {
  en: { label: "English", dir: "ltr" },
  ur: { label: "اردو", dir: "rtl" },
  ar: { label: "العربية", dir: "rtl" },
};

export const defaultLocale: Locale = "en";
