import type { MetadataRoute } from "next";

import { getBlogPosts } from "@/lib/blog";
import { getContentRoutes } from "@/lib/content-pages";

const baseUrl = "https://www.mapperoni.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [routes, posts] = await Promise.all([
    getContentRoutes(),
    getBlogPosts(),
  ]);

  return [
    ...routes.map(({ pathname }) => ({
      url: new URL(pathname, baseUrl).href,
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
