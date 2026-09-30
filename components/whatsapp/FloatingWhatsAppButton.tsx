"use client";

import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "@/content/site-config";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function FloatingWhatsAppButton() {
  const { t } = useLanguage();

  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("nav_whatsapp")}
      className="fixed bottom-4 end-4 z-50 flex max-lg:hidden size-12 items-center justify-center rounded-full bg-[var(--color-moonlight)] text-[var(--color-void)] shadow-[0_10px_30px_-5px_rgba(217,176,74,0.45)] transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-starlight)] sm:bottom-5 sm:end-5 sm:size-14"
    >
      <MessageCircle className="size-5 sm:size-6" aria-hidden="true" />
    </a>
  );
}
