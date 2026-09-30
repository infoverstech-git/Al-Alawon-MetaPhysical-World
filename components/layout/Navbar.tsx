"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Moon } from "lucide-react";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { siteConfig } from "@/content/site-config";

export function Navbar() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/", label: t("nav_home") },
    { href: "/about", label: t("nav_about") },
    { href: "/contact", label: t("nav_contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[var(--color-void)]/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 lg:px-8">
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-2.5 sm:flex-none">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-moonlight)]/40 bg-[var(--color-indigo)] text-[var(--color-moonlight)] sm:size-10">
            <Moon className="size-4 sm:size-5" aria-hidden="true" />
          </span>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-[family-name:var(--font-display)] text-base tracking-wide text-[var(--color-starlight)] sm:text-lg">
              {siteConfig.name}
            </span>
            <span className="truncate text-[10px] tracking-[0.2em] text-[var(--color-moonlight)]/80 sm:text-[11px]">
              {siteConfig.tagline.toUpperCase()}
            </span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-[var(--color-silver)] transition-colors hover:bg-white/5 hover:text-[var(--color-starlight)]"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <WhatsAppButton label={t("nav_whatsapp")} />
        </div>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full text-[var(--color-starlight)] lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={open}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      <div
        className={clsx(
          "overflow-hidden border-t border-white/10 bg-[var(--color-void)] transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-96" : "max-h-0"
        )}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--color-silver)] hover:bg-white/5"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
          <LanguageSwitcher />
          <WhatsAppButton label={t("nav_whatsapp")} />
        </div>
      </div>
    </header>
  );
}
