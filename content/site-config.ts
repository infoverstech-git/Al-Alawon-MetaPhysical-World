export const siteConfig = {
  name: "Al-A'lawn",
  tagline: "Metaphysical World",
  taglineUrdu: "دنیائے ماوراء الطبیعت",
  description:
    "Spiritual guidance rooted in the Quran and Sunnah — Istikhara, Islamic numerology, Ruqyah, and support through life's difficult passages.",
  email: "abualnoorqadri1112@gmail.com",
  phoneDisplay: "0301-4423433",
  phoneE164: "+923014423433",
};

export function buildWhatsAppLink(message?: string) {
  const base = `https://wa.me/${siteConfig.phoneE164.replace(/\D/g, "")}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
