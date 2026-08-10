# Mapperoni Site

This repository is the Mapperoni documentation and marketing site, built with Next.js App Router, React, TypeScript, Markdoc, Tailwind CSS, and Biome.

## Layout

- `src/app` contains routes, layouts, metadata, feeds, and social images.
- `src/content` contains Markdown content for documentation, policy pages, and blog posts.
- `src/components` contains shared React UI.
- `src/markdoc` defines Markdoc nodes, tags, and search integration.
- `src/lib/navigation.ts` controls documentation navigation.
- `scripts/generate-search-data.mjs` generates `.generated/search-data.json`; do not edit generated output manually.

## Guidelines

- Use npm and keep `package-lock.json` synchronized with dependency changes.
- Prefer server components. Add `"use client"` only where browser APIs, state, or event handling require it.
- Preserve the existing visual language and responsive behavior; verify user-facing changes on narrow and wide layouts.
- Keep documentation navigation, metadata, internal links, and generated search data consistent when adding or moving content.
- Reuse existing components and Markdoc tags before introducing new abstractions or dependencies.
- Follow strict TypeScript and the `@/*` import alias. Use Biome for formatting and linting.
- Never commit `.next`, `.generated`, `node_modules`, local environment files, or secrets.

## Verification

- Run `npm run lint` for all changes.
- Run `npm run build` for routing, content, configuration, dependency, or production-facing changes.
- Run `npm run generate:search` when validating content or navigation changes without a full build.
