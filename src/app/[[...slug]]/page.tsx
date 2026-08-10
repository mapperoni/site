import { readdir, readFile } from "node:fs/promises";
import * as path from "node:path";
import Markdoc, {
  type Config,
  type RenderableTreeNodes,
} from "@markdoc/markdoc";
import { load } from "js-yaml";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import * as React from "react";

import { Hero } from "@/components/Hero";
import nodes from "@/markdoc/nodes";
import tags from "@/markdoc/tags";

const contentDirectory = path.join(process.cwd(), "src/content");

type PageProps = {
  params: Promise<{ slug?: string[] }>;
};

type Frontmatter = {
  title?: string;
  nextjs?: { metadata?: Metadata };
};

async function getContentFiles(
  directory = contentDirectory,
): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries
      .filter(
        (entry) => directory !== contentDirectory || entry.name !== "blog",
      )
      .map((entry) => {
        const entryPath = path.join(directory, entry.name);
        return entry.isDirectory() ? getContentFiles(entryPath) : entryPath;
      }),
  );

  return files.flat().filter((file) => file.endsWith(".md"));
}

async function getPage(slug: string[] = []) {
  const relativePath = slug.length > 0 ? `${slug.join("/")}.md` : "index.md";
  const filePath = path.join(contentDirectory, relativePath);

  try {
    const source = await readFile(filePath, "utf8");
    const ast = Markdoc.parse(source);
    const frontmatter = ast.attributes.frontmatter
      ? (load(ast.attributes.frontmatter) as Frontmatter)
      : {};

    return { ast, frontmatter, source };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      notFound();
    }
    throw error;
  }
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const files = await getContentFiles();

  return files.map((file) => {
    const relativePath = path
      .relative(contentDirectory, file)
      .replace(/\.md$/, "");
    return {
      slug: relativePath === "index" ? [] : relativePath.split(path.sep),
    };
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { frontmatter } = await getPage(slug);

  return frontmatter.nextjs?.metadata ?? { title: frontmatter.title };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const { ast, source } = await getPage(slug);
  const activePath = slug?.length ? `/${slug.join("/")}` : "/";
  const config = { nodes, tags, source, activePath } as unknown as Config;
  const content = Markdoc.transform(ast, config) as RenderableTreeNodes;

  return (
    <>
      {activePath === "/" && <Hero />}
      {Markdoc.renderers.react(content, React)}
    </>
  );
}
