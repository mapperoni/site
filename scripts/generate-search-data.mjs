// Build-time script to generate search index data
// Run this during build: node src/markdoc/generate-search-data.mjs

import * as fs from "node:fs";
import * as path from "node:path";
import Markdoc from "@markdoc/markdoc";

import { slugifyWithCounter } from "../src/lib/slugify.mjs";

const slugify = slugifyWithCounter();

function findPages(dir, base = dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory() && entry.name !== "blog") {
      files.push(...findPages(entryPath, base));
    } else if (entry.name.endsWith(".md")) {
      files.push(path.relative(base, entryPath));
    }
  }

  return files;
}

function nodeToString(node) {
  let str =
    node.type === "text" && typeof node.attributes?.content === "string"
      ? node.attributes.content
      : "";
  if ("children" in node) {
    for (const child of node.children) {
      str += nodeToString(child);
    }
  }
  return str;
}

function extractSections(node, sections, isRoot = true) {
  if (isRoot) {
    slugify.reset();
  }
  if (node.type === "heading" || node.type === "paragraph") {
    const content = nodeToString(node).trim();
    if (node.type === "heading" && node.attributes.level <= 2) {
      const hash = node.attributes?.id ?? slugify(content);
      sections.push([content, hash, []]);
    } else {
      sections.at(-1)?.[2].push(content);
    }
  } else if ("children" in node) {
    for (const child of node.children) {
      extractSections(child, sections, false);
    }
  }
}

function generateSearchData() {
  const contentDir = path.resolve("./src/content");
  const files = findPages(contentDir);

  const data = files.map((file) => {
    const url = file === "index.md" ? "/" : `/${file.replace(/\.md$/, "")}`;
    const md = fs.readFileSync(path.join(contentDir, file), "utf8");

    const ast = Markdoc.parse(md);
    const title =
      ast.attributes?.frontmatter?.match(/^title:\s*(.*?)\s*$/m)?.[1];
    const sections = [[title, null, []]];
    extractSections(ast, sections);

    return { url, sections };
  });

  return data;
}

// Generate and write the data
const data = generateSearchData();
const outputDir = path.resolve("./.generated");
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
const outputPath = path.join(outputDir, "search-data.json");
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
console.log(`Search data generated: ${outputPath}`);
