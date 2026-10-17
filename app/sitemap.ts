import type { MetadataRoute } from "next";

const BASE_URL = "https://al-alawon-spiritual-world.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/contact", "/disclaimer"].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
