Mapperoni.com
==============

Mapperoni is a tool for creating user-friendly survey forms, public-engagement questionnaires, and collaborative maps. Collect feedback and geospatial data by inviting people to mark and describe locations directly on an interactive map. Learn more at [www.mapperoni.com](https://www.mapperoni.com).

This repository contains the source for the Mapperoni website and documentation site. The Mapperoni application is available at [app.mapperoni.com](https://app.mapperoni.com).

A Markdoc-powered documentation site built with Next.js 16 (App Router) and Tailwind CSS 4. The content lives in Markdown (`page.md`) files under `src/app`, and a small Markdoc schema adds custom components, syntax highlighting, and a FlexSearch-based doc search.

## License

This repository, including the Mapperoni website and its documentation, is licensed under the [MIT License](LICENSE). This license does not apply to the Mapperoni application or service at [app.mapperoni.com](https://app.mapperoni.com). Use of that application is subject to separately agreed commercial terms or other written arrangements with Canvis Software LLC.

## Quick start

- Install dependencies: `npm install` (npm is recommended; pnpm/yarn also work).
- Run the dev server: `npm dev` then open http://localhost:3000.
- Lint/format: `npm lint` (Biome) and `npm format`.
- Production build: `npm build` then `npm start`.

## Project layout

- `src/app` — App Router pages; docs live in nested `page.md` files (frontmatter supplies titles/metadata).
- `src/markdoc` — Markdoc schema (`nodes.js`, `tags.js`) and client search indexer.
- `src/components` — UI building blocks for the docs shell, navigation, and content rendering.
- `scripts/generate-search-data.mjs` — Build-time script that parses Markdown and emits `.generated/search-data.json` for client-side search.
- `public` — Static assets such as the favicon and social images.

## Markdoc authoring tips

- Add new docs by creating a `page.md` inside `src/app/docs/<slug>/` with YAML frontmatter (`title`, optional `nextjs.metadata`).
- Custom tags (e.g., callouts, quick links) are defined in `src/markdoc/tags.js`; nodes like code blocks/links are configured in `src/markdoc/nodes.js`.
- Navigation is controlled in `src/lib/navigation.ts`.

## Search indexing

`npm dev` and `npm build` run `scripts/generate-search-data.mjs` before Next starts to create `.generated/search-data.json`. If you add or rename pages while the dev server is running, run `npm generate:search` so search stays in sync.

## Requirements

- Node 18+ (matches Next.js 16 support matrix).

## Deployment

The app is a standard Next.js output. Any platform that supports `next start` will work. Ensure the build step runs `npm build` so the search index is generated before serving.
