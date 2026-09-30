"use client";

import { Mail, Phone, MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig, buildWhatsAppLink } from "@/content/site-config";

export function ContactPageContent() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-[family-name:var(--font-display)] text-2xl text-[var(--color-starlight)] sm:text-3xl">
          {t("contact_title")}
        </h1>
        <p className="mt-3 font-[family-name:var(--font-body)] text-base text-[var(--color-silver)]">
          {t("contact_sub")}
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="rounded-3xl border border-white/10 bg-[var(--color-void-light)] p-8">
          <p className="font-[family-name:var(--font-display)] text-lg text-[var(--color-moonlight)]">
            {siteConfig.name}
          </p>
          <div className="mt-8 space-y-4">
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3.5 text-sm text-[var(--color-silver)] hover:bg-white/10">
              <Mail className="size-4 text-[var(--color-moonlight)]" aria-hidden="true" /> {siteConfig.email}
            </a>
            <a href={`tel:${siteConfig.phoneE164}`} className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3.5 text-sm text-[var(--color-silver)] hover:bg-white/10">
              <Phone className="size-4 text-[var(--color-moonlight)]" aria-hidden="true" /> {siteConfig.phoneDisplay}
            </a>
            <a href={buildWhatsAppLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3.5 text-sm text-[var(--color-silver)] hover:bg-white/10">
              <MessageCircle className="size-4 text-[var(--color-moonlight)]" aria-hidden="true" /> {t("nav_whatsapp")}
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
