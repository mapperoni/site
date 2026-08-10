import Markdoc, {
  type Config,
  type RenderableTreeNodes,
} from "@markdoc/markdoc";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import * as React from "react";

import { Hero } from "@/components/Hero";
import {
  getContentPage,
  getContentRoutes,
  pathnameFromSlug,
} from "@/lib/content-pages";
import nodes from "@/markdoc/nodes";
import tags from "@/markdoc/tags";

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

async function getPage(slug: string[] = []) {
  const page = await getContentPage(slug);

  if (!page) {
    notFound();
  }

  return page;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const routes = await getContentRoutes();
  return routes.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await getPage(slug);
  const pathname = pathnameFromSlug(slug);
  const socialImage = "/social-image";
  const isHomePage = pathname === "/";
  const pageTitle = frontmatter.metaTitle ?? frontmatter.title;
  const title = isHomePage ? { absolute: pageTitle } : pageTitle;

  return {
    title,
    description: frontmatter.description,
    alternates: {
      canonical: pathname,
      types: {
        "application/rss+xml": "/blog/rss.xml",
      },
    },
    openGraph: {
      type: "website",
      title: pageTitle,
      description: frontmatter.description,
      url: pathname,
      siteName: "Mapperoni",
      locale: "en_US",
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "Mapperoni geospatial surveys and collaborative maps",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: frontmatter.description,
      images: [
        {
          url: socialImage,
          alt: "Mapperoni geospatial surveys and collaborative maps",
        },
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { ast, source } = await getPage(slug);
  const activePath = pathnameFromSlug(slug);
  const config = { nodes, tags, source, activePath } as unknown as Config;
  const content = Markdoc.transform(ast, config) as RenderableTreeNodes;

  return (
    <>
      {activePath === "/" && <Hero />}
      {Markdoc.renderers.react(content, React)}
    </>
  );
}
