import Markdoc, {
  type Config,
  type RenderableTreeNodes,
} from "@markdoc/markdoc";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import * as React from "react";

import { getBlogPost, getBlogPosts } from "@/lib/blog";
import blogNodes from "@/markdoc/blog-nodes";
import tags from "@/markdoc/tags";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const { frontmatter } = post;
  const socialImage = frontmatter.socialImage ?? `/blog/${slug}/social-image`;
  const socialImageAlt =
    frontmatter.socialImageAlt ?? `${frontmatter.title} | Mapperoni`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    authors: [{ name: frontmatter.author }],
    alternates: {
      canonical: `/blog/${slug}`,
      types: {
        "application/rss+xml": "/blog/rss.xml",
      },
    },
    openGraph: {
      type: "article",
      title: frontmatter.title,
      description: frontmatter.description,
      url: `/blog/${slug}`,
      siteName: "Mapperoni",
      locale: "en_US",
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
      authors: [frontmatter.author],
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: socialImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: [{ url: socialImage, alt: socialImageAlt }],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const config = {
    nodes: blogNodes,
    tags,
    source: post.source,
  } as unknown as Config;
  const content = Markdoc.transform(post.ast, config) as RenderableTreeNodes;
  const url = `https://www.mapperoni.com/blog/${slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.publishedAt,
    dateModified: post.frontmatter.updatedAt,
    author: {
      "@type": "Person",
      name: post.frontmatter.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Mapperoni",
      logo: {
        "@type": "ImageObject",
        url: "https://www.mapperoni.com/mapperoni-logo.svg",
      },
    },
    mainEntityOfPage: url,
    url,
    image: new URL(
      post.frontmatter.socialImage ?? `/blog/${slug}/social-image`,
      "https://www.mapperoni.com",
    ).href,
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Frontmatter is validated and '<' is escaped before insertion.
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires raw script content.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      {Markdoc.renderers.react(content, React)}
    </>
  );
}
