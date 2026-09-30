"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { HeroVideoBackground } from "./HeroVideoBackground";
import { siteConfig } from "@/content/site-config";

export function Hero() {
  const { t, locale } = useLanguage();

  return (
    <section className="nebula-bg relative overflow-hidden border-b border-white/10">
      <HeroVideoBackground />
      <div className="relative mx-auto max-w-4xl px-5 py-14 text-center sm:py-24 lg:px-8">
        <span className="mx-auto flex w-fit items-center gap-2 rounded-full border border-[var(--color-moonlight)]/30 bg-white/5 px-4 py-1.5 text-xs tracking-[0.2em] text-[var(--color-moonlight)]">
          <Sparkles className="size-3.5" aria-hidden="true" />
          {t("hero_badge")}
        </span>

        <h1 className="mt-6 font-[family-name:var(--font-display)] text-2xl leading-tight text-[var(--color-starlight)] sm:mt-8 sm:text-5xl">
          {siteConfig.name}
        </h1>
        <p className={`mt-2 text-xl italic text-[var(--color-moonlight)] sm:text-2xl ${locale === "ar" ? "font-[family-name:var(--font-arabic)]" : locale === "ur" ? "font-[family-name:var(--font-arabic)]" : "font-[family-name:var(--font-body)]"}`}>
          {locale === "ur" ? siteConfig.taglineUrdu : siteConfig.tagline}
        </p>

        <p className="mx-auto mt-6 max-w-xl font-[family-name:var(--font-body)] text-base leading-relaxed text-[var(--color-silver)] sm:text-lg">
          {t("hero_tagline")}
        </p>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4">
          <Link
            href="#services"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-moonlight)]/40 px-6 py-3 text-sm font-semibold tracking-wide text-[var(--color-moonlight)] transition-colors hover:bg-[var(--color-moonlight)]/10 sm:w-auto"
          >
            {t("hero_cta_services")}
          </Link>
          <WhatsAppButton label={t("nav_whatsapp")} className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
