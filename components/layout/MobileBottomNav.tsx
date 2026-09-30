"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, UserRound, Mail, MessageCircle } from "lucide-react";
import { clsx } from "clsx";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { buildWhatsAppLink } from "@/content/site-config";

const itemClass =
  "flex flex-col items-center justify-center gap-1 px-1 py-2.5 text-[11px] font-medium leading-none transition-colors";

/** App-style tab bar pinned to the bottom of the screen on phones/tablets (hidden on desktop). */
export function MobileBottomNav() {
  const { t } = useLanguage();
  const pathname = usePathname();

  const items = [
    { href: "/", label: t("nav_home"), Icon: House },
    { href: "/about", label: t("nav_about"), Icon: UserRound },
    { href: "/contact", label: t("nav_contact"), Icon: Mail },
  ];

  return (
    <nav
      aria-label={t("nav_primary")}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[var(--color-void)]/95 backdrop-blur-md lg:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {items.map(({ href, label, Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  itemClass,
                  "h-full",
                  active ? "text-[var(--color-moonlight)]" : "text-[var(--color-silver)] active:text-[var(--color-starlight)]"
                )}
              >
                <Icon className="size-5" aria-hidden="true" />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
        <li>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(itemClass, "h-full text-[var(--color-silver)] active:text-[var(--color-starlight)]")}
          >
            <MessageCircle className="size-5" aria-hidden="true" />
            <span>{t("nav_whatsapp_short")}</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
