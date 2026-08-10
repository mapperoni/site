import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import Markdoc from "@markdoc/markdoc";
import { load } from "js-yaml";

const blogDirectory = path.join(process.cwd(), "src/content/blog");

export type BlogFrontmatter = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  authorRole?: string;
  image?: string;
  imageAlt?: string;
  socialImage?: string;
  socialImageAlt?: string;
};

export type BlogPost = {
  slug: string;
  frontmatter: BlogFrontmatter;
  source: string;
  ast: ReturnType<typeof Markdoc.parse>;
};

function normalizeDate(value: unknown, field: string, slug: string) {
  const date = value instanceof Date ? value.toISOString().slice(0, 10) : value;

  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`${field} must be an ISO date in blog post "${slug}"`);
  }

  return date;
}

function parseFrontmatter(source: string, slug: string): BlogFrontmatter {
  const ast = Markdoc.parse(source);
  const parsed = ast.attributes.frontmatter
    ? load(ast.attributes.frontmatter)
    : null;

  if (!parsed || typeof parsed !== "object") {
    throw new Error(`Missing frontmatter in blog post "${slug}"`);
  }

  const values = parsed as Record<string, unknown>;
  const title = values.title;
  const description = values.description;
  const author = values.author;
  const authorRole = values.authorRole;
  const image = values.image;
  const imageAlt = values.imageAlt;
  const socialImage = values.socialImage;
  const socialImageAlt = values.socialImageAlt;

  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof author !== "string"
  ) {
    throw new Error(
      `Blog post "${slug}" requires a title, description, and author`,
    );
  }

  if (authorRole !== undefined && typeof authorRole !== "string") {
    throw new Error(`authorRole must be text in blog post "${slug}"`);
  }

  if (image !== undefined && typeof image !== "string") {
    throw new Error(`image must be a path in blog post "${slug}"`);
  }

  if (imageAlt !== undefined && typeof imageAlt !== "string") {
    throw new Error(`imageAlt must be text in blog post "${slug}"`);
  }

  if (socialImage !== undefined && typeof socialImage !== "string") {
    throw new Error(`socialImage must be a path in blog post "${slug}"`);
  }

  if (socialImageAlt !== undefined && typeof socialImageAlt !== "string") {
    throw new Error(`socialImageAlt must be text in blog post "${slug}"`);
  }

  return {
    title,
    description,
    author,
    authorRole,
    image,
    imageAlt,
    socialImage,
    socialImageAlt,
    publishedAt: normalizeDate(values.publishedAt, "publishedAt", slug),
    updatedAt: normalizeDate(values.updatedAt, "updatedAt", slug),
  };
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const source = await readFile(
      path.join(blogDirectory, `${slug}.md`),
      "utf8",
    );
    return {
      slug,
      source,
      ast: Markdoc.parse(source),
      frontmatter: parseFrontmatter(source, slug),
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function getBlogPosts() {
  const entries = await readdir(blogDirectory, { withFileTypes: true });
  const posts = await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map((entry) => getBlogPost(entry.name.replace(/\.md$/, ""))),
  );

  return posts
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) =>
      b.frontmatter.publishedAt.localeCompare(a.frontmatter.publishedAt),
    );
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
