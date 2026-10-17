import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Amiri } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { FloatingWhatsAppButton } from "@/components/whatsapp/FloatingWhatsAppButton";
import { siteConfig } from "@/content/site-config";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#060b1c",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://al-alawon-spiritual-world.com"),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${cinzel.variable} ${cormorant.variable} ${amiri.variable} starfield antialiased`}
      >
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <MobileBottomNav />
          <FloatingWhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
