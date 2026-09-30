"use client";

import * as Icons from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { Service } from "@/content/services";

export function ServiceCard({ service }: { service: Service }) {
  const { t, locale } = useLanguage();
  const Icon = (Icons[service.icon as keyof typeof Icons] as LucideIcon) ?? Icons.Sparkles;

  const title = locale === "en" ? service.titleEn : locale === "ur" ? service.titleUr : service.titleAr;
  const description =
    locale === "en" ? service.descriptionEn : locale === "ur" ? service.descriptionUr : service.descriptionAr;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-all duration-300 hover:border-[var(--color-moonlight)]/40 hover:shadow-[var(--shadow-glow)]">
      <span className="absolute end-6 top-6 font-[family-name:var(--font-display)] text-2xl text-white/[0.06]">
        {service.number}
      </span>
      <span className="flex size-12 items-center justify-center rounded-2xl border border-[var(--color-moonlight)]/25 bg-[var(--color-indigo)] text-[var(--color-moonlight)]">
        <Icon className="size-6" aria-hidden="true" />
      </span>

      <h3
        className={`mt-5 text-lg leading-snug text-[var(--color-starlight)] ${
          locale === "en" ? "font-[family-name:var(--font-display)]" : "font-[family-name:var(--font-arabic)]"
        }`}
      >
        {title}
      </h3>
      <p className="mt-3 font-[family-name:var(--font-body)] text-[15px] leading-relaxed text-[var(--color-silver)]">
        {description}
      </p>

      {service.sensitiveNote && (
        <p className="mt-4 rounded-xl border border-amber-300/20 bg-amber-300/5 px-3 py-2 text-xs leading-relaxed text-amber-200/90">
          {t("sensitive_note")}
        </p>
      )}
    </div>
  );
}
