export const siteConfig = {
  name: "Al-A'lawn",
  tagline: "Islamic Spiritual Guidance",
  taglineUrdu: "دنیائے ماوراء الطبیعت",
  description:
    "Explore Islamic spiritual guidance rooted in the Quran and Sunnah, including Istikhara, Ruqyah, and faith-based support through life's challenges. Learn about these practices with clear, respectful guidance.",
  email: "abualnoorqadri1112@gmail.com",
  phoneDisplay: "0301-4423433",
  phoneE164: "+923014423433",
};

export function buildWhatsAppLink(message?: string) {
  const base = `https://wa.me/${siteConfig.phoneE164.replace(/\D/g, "")}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
