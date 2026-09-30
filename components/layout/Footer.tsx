"use client";

import Link from "next/link";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { siteConfig, buildWhatsAppLink } from "@/content/site-config";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/10 bg-[var(--color-void-light)] text-[var(--color-silver)] max-lg:pb-20">
      <div className="mx-auto max-w-6xl px-5 py-8 sm:py-10 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-[family-name:var(--font-display)] text-xl text-[var(--color-moonlight)]">
              {siteConfig.name}
            </p>
            <p className="mt-1 text-xs tracking-[0.2em] text-[var(--color-silver)]/60">
              {siteConfig.tagline.toUpperCase()}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {[
                { href: "/", label: t("nav_home") },
                { href: "/about", label: t("nav_about") },
                { href: "/contact", label: t("nav_contact") },
                { href: "/disclaimer", label: t("footer_disclaimer") },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2.5 text-sm">
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-white">
              <Mail className="size-4" aria-hidden="true" /> {siteConfig.email}
            </a>
            <a href={`tel:${siteConfig.phoneE164}`} className="flex items-center gap-2 hover:text-white">
              <Phone className="size-4" aria-hidden="true" /> {siteConfig.phoneDisplay}
            </a>
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-white"
            >
              <MessageCircle className="size-4" aria-hidden="true" /> {t("nav_whatsapp")}
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-4 text-xs text-[var(--color-silver)]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. {t("footer_rights")}</p>
          <Link href="/disclaimer" className="hover:text-white">{t("footer_disclaimer")}</Link>
        </div>
      </div>
    </footer>
  );
}
