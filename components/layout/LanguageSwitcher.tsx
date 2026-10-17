
"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { locales, localeMeta } from "@/lib/i18n/config";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function LanguageSwitcher({
  className,
}: {
  className?: string;
}) {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    if (!open || !ref.current) return;

    const updatePosition = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      setOpenUpward(
        spaceBelow < 240 && spaceAbove > spaceBelow
      );
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  return (
    <div
      className={clsx("relative z-[100]", className)}
      ref={ref}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full border border-white/15 px-3.5 py-2 text-sm font-medium text-[var(--color-starlight)] transition-colors hover:border-[var(--color-moonlight)]/50"
      >
        <Globe className="size-4" aria-hidden="true" />

        <span>{localeMeta[locale].label}</span>

        <ChevronDown
          className={clsx(
            "size-3.5 transition-transform",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Choose language"
          className={clsx(
            "absolute end-0 z-[999] min-w-[9rem] max-w-[calc(100vw-2rem)] overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-[var(--color-void-light)] py-1.5 shadow-[var(--shadow-glow)]",
            "max-h-[min(16rem,40dvh)]",
            openUpward
              ? "bottom-full mb-2"
              : "top-full mt-2"
          )}
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
                  "flex w-full items-center whitespace-nowrap px-4 py-2.5 text-sm transition-colors hover:bg-white/5",
                  locale === loc
                    ? "font-semibold text-[var(--color-moonlight)]"
                    : "text-[var(--color-silver)]"
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
