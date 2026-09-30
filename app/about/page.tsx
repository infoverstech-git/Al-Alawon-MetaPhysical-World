import type { Metadata } from "next";
import { AboutContent } from "./AboutContent";

const PAGE_URL = "https://al-alawn-metaphysical.example.com/about";

export const metadata: Metadata = {
  title: "About the Scholar",
  description:
    "Academic qualifications, Islamic education, and teaching experience behind the spiritual guidance offered at Al-A'lawn.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "About the Scholar | Al-A'lawn",
    description: "Academic qualifications, Islamic education, and teaching experience behind Al-A'lawn.",
    url: PAGE_URL,
    type: "profile",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
