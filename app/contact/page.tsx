import type { Metadata } from "next";
import { ContactPageContent } from "./ContactPageContent";

const PAGE_URL = "https://al-alawn-metaphysical.example.com/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Al-A'lawn for a private spiritual consultation — by phone, email, or WhatsApp.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Contact Al-A'lawn",
    description: "Get in touch for a private spiritual consultation.",
    url: PAGE_URL,
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
