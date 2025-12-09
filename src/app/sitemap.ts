import type { MetadataRoute } from "next";

const baseUrl = "https://www.mapperoni.com";

const routes = [
  "",
  "/about-us",
  "/contact",
  "/acceptable-use",
  "/privacy-policy",
  "/terms-of-service",
  "/docs/quickstart",
  "/docs/faq",
  "/docs/conditional-questions",
  "/docs/pricing",
  "/docs/deployments",
  "/docs/maps",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
  }));
}
