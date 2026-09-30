"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { locales, localeMeta } from "@/lib/i18n/config";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className={clsx("relative", className)} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-sm font-medium text-[var(--color-starlight)] transition-colors hover:border-[var(--color-moonlight)]/50"
      >
        <Globe className="size-4" aria-hidden="true" />
        <span>{localeMeta[locale].label}</span>
        <ChevronDown className={clsx("size-3.5 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute end-0 z-50 mt-2 min-w-[9rem] overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-void-light)] py-1.5 shadow-[var(--shadow-glow)]"
        >
          {locales.map((loc) => (
            <li key={loc}>
              <button
                type="button"
                role="option"
                aria-selected={locale === loc}
                onClick={() => {
                  setLocale(loc);
                  setOpen(false);
                }}
                className={clsx(
                  "flex w-full items-center px-4 py-2 text-sm transition-colors hover:bg-white/5",
                  locale === loc ? "font-semibold text-[var(--color-moonlight)]" : "text-[var(--color-silver)]"
                )}
              >
                {localeMeta[loc].label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
