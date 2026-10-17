
"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 160,
  });

  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const updatePosition = () => {
      const button = buttonRef.current;
      if (!button) return;

      const rect = button.getBoundingClientRect();
      const width = Math.min(180, window.innerWidth - 24);
      const estimatedHeight = Math.min(
        locales.length * 44 + 12,
        window.innerHeight * 0.5
      );

      let left = rect.right - width;
      left = Math.max(
        12,
        Math.min(left, window.innerWidth - width - 12)
      );

      let top = rect.bottom + 8;

      if (top + estimatedHeight > window.innerHeight - 12) {
        top = rect.top - estimatedHeight - 8;
      }

      top = Math.max(
        12,
        Math.min(top, window.innerHeight - estimatedHeight - 12)
      );

      setPosition({ top, left, width });
    };

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

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

  return (
    <div className={clsx("relative", className)} ref={ref}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
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

      {mounted &&
        open &&
        createPortal(
          <ul
            ref={undefined}
            role="listbox"
            aria-label="Choose language"
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              width: position.width,
              zIndex: 99999,
              maxHeight: "50dvh",
            }}
            className="overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-[var(--color-void-light)] py-1.5 shadow-[var(--shadow-glow)]"
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
                    "flex w-full items-center px-4 py-3 text-left text-sm transition-colors hover:bg-white/5",
                    locale === loc
                      ? "font-semibold text-[var(--color-moonlight)]"
                      : "text-[var(--color-silver)]"
                  )}
                >
                  {localeMeta[loc].label}
                </button>
              </li>
            ))}
          </ul>,
          document.body
        )}
    </div>
  );
}
