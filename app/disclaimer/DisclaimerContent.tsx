"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { siteConfig } from "@/content/site-config";

export function DisclaimerContent() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20 lg:px-8">
      <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-starlight)] sm:text-3xl">
        {t("disclaimer_page_title")}
      </h1>

      <div className="mt-10 space-y-7 font-[family-name:var(--font-body)] text-[17px] leading-relaxed text-[var(--color-silver)]">
        <section>
          <h2 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-moonlight)]">
            {t("disclaimer_h1")}
          </h2>
          <p className="mt-2">{t("disclaimer_p1")}</p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-moonlight)]">
            {t("disclaimer_h2")}
          </h2>
          <p className="mt-2">{t("disclaimer_p2")}</p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-moonlight)]">
            {t("disclaimer_h3")}
          </h2>
          <p className="mt-2">{t("disclaimer_p3")}</p>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-lg text-[var(--color-moonlight)]">
            {t("disclaimer_h4")}
          </h2>
          <p className="mt-2">
            {t("disclaimer_p4")} {siteConfig.email} {t("footer_disclaimer") === "Disclaimer" ? "or" : ""} {siteConfig.phoneDisplay}.
          </p>
        </section>
      </div>
    </div>
  );
}
