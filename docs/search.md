# Search system

How search works end-to-end for the documentation site, from index generation to the in-app experience.

## Build-time indexing pipeline
- Entrypoint: `scripts/generate-search-data.mjs`, invoked by `pnpm dev` and `pnpm build` before Next starts.
- Discovery: scans `src/app/**/page.md` so every Markdoc page becomes searchable.
- Parsing: uses `@markdoc/markdoc` to walk the AST; frontmatter `title` becomes the page title stored as the first section.
- Section extraction: collects headings up to level 2 and the paragraphs that follow them. Headings get stable IDs via the shared slugify helper (`src/lib/slugify.mjs`); paragraphs are appended to the most recent section. H3+ content is not indexed.
- Shape: each page is serialized to `{ url, sections: [title, hash | null, [paragraphs...]][] }` and written to `.generated/search-data.json` (created if missing). The first section has `hash: null` so top-level page hits link to the page root; sub-sections include `#hash` in their URLs.

## Runtime search engine
- Location: `src/markdoc/search.ts` (client-safe—no Node APIs).
- Index: builds a `FlexSearch.Document` with `id = url`, indexed field `content`, and stored fields `title` and `pageTitle`. Context options (`resolution: 9`, `depth: 2`) enable phrase-like matching.
- Document creation: for each section in `.generated/search-data.json`, builds a doc with `content` made of the heading plus its paragraph text. When a hash exists, `pageTitle` stores the parent page title for breadcrumb display.
- Querying: `search(query, { limit })` calls `sectionIndex.search()` with `enrich: true` and returns `{ url, title, pageTitle? }[]`. Empty results return an empty array to keep UI simple.

## UI wiring
- Component: `src/components/Search.tsx` (client) uses `@algolia/autocomplete-core` for keyboard/focus handling and panel logic.
- Loading: `getSources` lazily imports `@/markdoc/search`, keeping FlexSearch and the JSON payload out of the initial bundle until a user types.
- UX: opens via the header button or `Cmd/Ctrl+K`, closes on route changes, and uses `react-highlight-words` to emphasize matches. The side hierarchy label is derived from `navigation` to show the section group and parent page.
- Navigation: selection pushes a Next.js client-side route. If the target is already active, the dialog closes without redundant navigation.

## Maintenance checklist
- After adding or editing docs while the dev server is running, rerun `pnpm generate:search` so the local search index stays current. Both `pnpm dev` and `pnpm build` generate it before Next starts.
- Keep important headings at H1/H2 if you want them indexed; H3/H4 content is currently ignored.
- If you move content out of `page.md` files, update the generator’s glob in `scripts/generate-search-data.mjs`.

## Future improvements (concise)
- Watch-mode generator or dev server hook to auto-refresh `.generated/search-data.json`.
- Index H3/H4 headings and capture short snippets for better relevancy previews.
- Add lightweight scoring tweaks (e.g., boost frontmatter titles, prefer exact phrase hits) once result quality is assessed.
