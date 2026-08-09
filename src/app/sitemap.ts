import type { MetadataRoute } from "next";

const baseUrl = "https://www.mapperoni.com";

const routes = [
  "",
  "/about-us",
  "/contact",
  "/acceptable-use",
  "/privacy",
  "/terms",
  "/docs/quickstart",
  "/docs/conditional-questions",
  "/docs/pricing",
  "/docs/deployments",
  "/docs/maps",
  "/docs/export-data",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified,
  }));
}
