import type { Metadata } from "next";
import { HomeContent } from "./HomeContent";
import { siteConfig } from "@/content/site-config";

const PAGE_URL = "https://al-alawn-metaphysical.example.com";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Islamic Spiritual Guidance & Istikhara Consultation`,
  description:
    "Islamic spiritual guidance rooted in the Quran and Sunnah — Istikhara, Islamic numerology, Quranic Ruqyah, and private consultation for marriage, business, and family matters.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `${siteConfig.name} — Metaphysical World`,
    description: siteConfig.description,
    url: PAGE_URL,
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  description: siteConfig.description,
  email: siteConfig.email,
  telephone: siteConfig.phoneE164,
  url: PAGE_URL,
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeContent />
    </>
  );
}
