"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { services } from "@/content/services";
import { buildWhatsAppLink } from "@/content/site-config";

const inputClass =
  "w-full rounded-2xl border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-[var(--color-starlight)] outline-none transition-colors placeholder:text-[var(--color-silver)]/40 focus:border-[var(--color-moonlight)]";

export function ContactForm() {
  const { t, locale } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const fullName = String(data.get("fullName") || "");
    const phone = String(data.get("phone") || "");
    const service = String(data.get("service") || "");
    const message = String(data.get("message") || "");

    const waMessage = [
      `*${t("contact_form_name")}:* ${fullName}`,
      `*${t("contact_form_phone")}:* ${phone}`,
      service ? `*${t("contact_form_service")}:* ${service}` : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(buildWhatsAppLink(waMessage), "_blank");
    setSubmitted(true);
    form.reset();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-medium text-[var(--color-silver)]">
            {t("contact_form_name")}
          </label>
          <input id="fullName" name="fullName" required maxLength={120} className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-[var(--color-silver)]">
            {t("contact_form_phone")}
          </label>
          <input id="phone" name="phone" type="tel" required maxLength={30} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-[var(--color-silver)]">
          {t("contact_form_service")}
        </label>
        <select id="service" name="service" className={inputClass} defaultValue="">
          <option value="" disabled>
            —
          </option>
          {services.map((s) => (
            <option key={s.slug} value={locale === "en" ? s.titleEn : locale === "ur" ? s.titleUr : s.titleAr}>
              {locale === "en" ? s.titleEn : locale === "ur" ? s.titleUr : s.titleAr}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[var(--color-silver)]">
          {t("contact_form_message")}
        </label>
        <textarea id="message" name="message" required minLength={10} maxLength={4000} rows={5} className={inputClass} />
      </div>

      {submitted && (
        <p className="rounded-2xl border border-[var(--color-moonlight)]/30 bg-[var(--color-moonlight)]/10 px-4 py-3 text-sm text-[var(--color-moonlight)]">
          {t("contact_form_success")}
        </p>
      )}

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-moonlight)] px-6 py-3.5 text-sm font-semibold text-[var(--color-void)] transition-colors hover:bg-[var(--color-moonlight-soft)] sm:w-auto"
      >
        <Send className="size-4" aria-hidden="true" />
        {t("contact_form_submit")}
      </button>
    </form>
  );
}
