import type { MetadataRoute } from "next";

import { getBlogPosts } from "@/lib/blog";

const baseUrl = "https://www.mapperoni.com";

const routes = [
  "",
  "/about-us",
  "/contact",
  "/acceptable-use",
  "/privacy",
  "/terms",
  "/docs/quickstart",
  "/docs/teams-and-roles",
  "/docs/conditional-questions",
  "/docs/pricing",
  "/docs/deployments",
  "/docs/maps",
  "/docs/export-data",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const posts = await getBlogPosts();

  return [
    ...routes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified,
    })),
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(
        `${posts[0]?.frontmatter.updatedAt ?? "2026-08-10"}T00:00:00Z`,
      ),
    },
    ...posts.map(({ slug, frontmatter }) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(`${frontmatter.updatedAt}T00:00:00Z`),
    })),
  ];
}
