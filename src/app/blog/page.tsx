import type { Metadata } from "next";
import Link from "next/link";

import { formatBlogDate, getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "News and updates from Mapperoni.",
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": "/blog/rss.xml",
    },
  },
  openGraph: {
    type: "website",
    title: "Mapperoni Blog",
    description: "News and updates from Mapperoni.",
    url: "/blog",
    siteName: "Mapperoni",
    locale: "en_US",
    images: [
      {
        url: "/blog/social-image",
        width: 1200,
        height: 630,
        alt: "Mapperoni Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mapperoni Blog",
    description: "News and updates from Mapperoni.",
    images: [{ url: "/blog/social-image", alt: "Mapperoni Blog" }],
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <header className="max-w-2xl">
        <p className="font-display text-sm font-medium text-sky-700">
          Mapperoni
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-slate-900 sm:text-5xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-slate-500">
          News and updates from Mapperoni.
        </p>
      </header>

      <div className="mt-12 border-t border-slate-200">
        {posts.map(({ slug, frontmatter }) => (
          <article
            key={slug}
            className="grid gap-3 border-b border-slate-200 py-8 sm:grid-cols-[10rem_1fr] sm:gap-8 sm:py-10"
          >
            <time
              dateTime={frontmatter.publishedAt}
              className="text-sm text-slate-500"
            >
              {formatBlogDate(frontmatter.publishedAt)}
            </time>
            <div>
              <h2 className="font-display text-2xl tracking-tight text-slate-900">
                <Link
                  href={`/blog/${slug}`}
                  className="transition-colors hover:text-sky-600"
                >
                  {frontmatter.title}
                </Link>
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {frontmatter.description}
              </p>
              <p className="mt-3 text-sm text-slate-500">
                By {frontmatter.author}
                {frontmatter.authorRole && `, ${frontmatter.authorRole}`}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
