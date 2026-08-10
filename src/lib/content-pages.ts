import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import Markdoc from "@markdoc/markdoc";
import { load } from "js-yaml";

const contentDirectory = path.join(process.cwd(), "src/content");

export type PageFrontmatter = {
  title: string;
  metaTitle?: string;
  description: string;
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

function parseFrontmatter(
  ast: ReturnType<typeof Markdoc.parse>,
  pathname: string,
): PageFrontmatter {
  const parsed = ast.attributes.frontmatter
    ? load(ast.attributes.frontmatter)
    : null;

  if (!parsed || typeof parsed !== "object") {
    throw new Error(`Missing frontmatter in page "${pathname}"`);
  }

  const { title, metaTitle, description } = parsed as Record<string, unknown>;

  if (
    typeof title !== "string" ||
    title.trim() === "" ||
    typeof description !== "string" ||
    description.trim() === ""
  ) {
    throw new Error(
      `Page "${pathname}" requires a non-empty title and description`,
    );
  }

  if (
    metaTitle !== undefined &&
    (typeof metaTitle !== "string" || metaTitle.trim() === "")
  ) {
    throw new Error(`metaTitle must be non-empty text in page "${pathname}"`);
  }

  return { title, metaTitle, description };
}

export function pathnameFromSlug(slug: string[] = []) {
  return slug.length > 0 ? `/${slug.join("/")}` : "/";
}

export async function getContentRoutes() {
  const files = await getContentFiles();

  return files.map((file) => {
    const relativePath = path
      .relative(contentDirectory, file)
      .replace(/\.md$/, "");
    const slug = relativePath === "index" ? [] : relativePath.split(path.sep);

    return { slug, pathname: pathnameFromSlug(slug) };
  });
}

export async function getContentPage(slug: string[] = []) {
  const relativePath = slug.length > 0 ? `${slug.join("/")}.md` : "index.md";
  const filePath = path.join(contentDirectory, relativePath);

  try {
    const source = await readFile(filePath, "utf8");
    const ast = Markdoc.parse(source);
    const pathname = pathnameFromSlug(slug);

    return {
      ast,
      frontmatter: parseFrontmatter(ast, pathname),
      source,
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}
