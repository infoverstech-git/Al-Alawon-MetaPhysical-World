import type { Metadata } from "next";
import { DisclaimerContent } from "./DisclaimerContent";

const PAGE_URL = "https://al-alawn-metaphysical.example.com/disclaimer";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important disclaimer regarding the spiritual guidance services offered by Al-A'lawn.",
  alternates: { canonical: PAGE_URL },
};

export default function DisclaimerPage() {
  return <DisclaimerContent />;
}
