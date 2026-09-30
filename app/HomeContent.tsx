"use client";

import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { ServiceCard } from "@/components/home/ServiceCard";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { services } from "@/content/services";

export function HomeContent() {
  const { t } = useLanguage();

  return (
    <>
      <Hero />

      <section id="services" className="mx-auto max-w-6xl px-5 py-14 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs tracking-[0.2em] text-[var(--color-moonlight)]">{t("services_eyebrow")}</span>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-[var(--color-starlight)] sm:text-3xl">
            {t("services_title")}
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[var(--color-void-light)] py-10">
        <div className="mx-auto max-w-3xl px-5 text-center lg:px-8">
          <p className="font-[family-name:var(--font-body)] text-sm leading-relaxed text-[var(--color-silver)]/80">
            {t("disclaimer_strip")}{" "}
            <Link href="/disclaimer" className="text-[var(--color-moonlight)] underline underline-offset-2">
              {t("disclaimer_link")}
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14 text-center sm:py-16 lg:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-starlight)] sm:text-3xl">
          {t("cta_title")}
        </h2>
        <p className="mx-auto mt-3 max-w-md font-[family-name:var(--font-body)] text-base text-[var(--color-silver)]">
          {t("cta_sub")}
        </p>
        <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-moonlight)] px-6 py-3 text-sm font-semibold text-[var(--color-void)] hover:bg-[var(--color-moonlight-soft)] sm:w-auto"
          >
            {t("cta_contact")}
          </Link>
          <WhatsAppButton label={t("nav_whatsapp")} variant="outline" className="w-full sm:w-auto" />
        </div>
      </section>
    </>
  );
}
