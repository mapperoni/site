# Architecture overview

High-level map of how the site is built and what runs where.

## Framework and routing
- Next.js 16 App Router with `pageExtensions` including `md`, plus `@markdoc/next.js` to compile Markdown into React. Webpack is forced (`--webpack`) because the Markdoc loader lacks Turbopack support.
- The root layout (`src/app/layout.tsx`) is a server component: sets metadata, loads fonts via `next/font`, and wraps everything in the client-side `Providers` (`next-themes`).
- Pages live under `src/app/**/page.md`; Markdoc renders them through custom nodes/tags (`src/markdoc/nodes.js`, `src/markdoc/tags.js`) so content flows into `DocsLayout`, which builds the article shell, prev/next links, and table of contents.
- Routing/navigation metadata is centralized in `src/lib/navigation.ts` and drives the sidebar, breadcrumbs in search results, and prev/next link selection.

## Rendering model (build vs runtime)
- Build time: `pnpm build` first runs `scripts/generate-search-data.mjs` to emit `.generated/search-data.json`, then `next build --webpack`. Because pages are static Markdown with no `fetch`/revalidation hooks, Next prerenders them to static assets.
- Runtime on the server: effectively a static file host (can be served from Vercel’s edge cache or any CDN). No server data fetching or server actions are executed per request.
- Runtime on the client: interactive pieces only—theme toggling, search modal, mobile navigation drawer, table of contents scroll tracking, syntax highlighting, and prev/next link resolution. Content itself is already hydrated HTML from the static render.

## Client components and behavior
- Marked with `"use client"`: `Layout` (header, hero, and slot), `Search`, `TableOfContents`, `PrevNextLinks`, `DocsHeader` (anchors), `Fence` (Prism highlighting), `MobileNavigation`, and `Providers`.
- Search UI (`src/components/Search.tsx`) lazy-loads the FlexSearch index to keep initial JS lighter and uses Algolia Autocomplete core for keyboard/focus handling.
- Table of contents (`src/components/TableOfContents.tsx`) runs an intersection-like scroll tracker to highlight the active section.
- Theme switching uses `next-themes` with class-based toggling to avoid layout shifts.

## Data flow
- Content source: Markdown files with frontmatter titles; headings are slugified by a shared helper (`src/lib/slugify.js`), and `collectSections` (`src/lib/sections.ts`) builds the table of contents from the AST passed into `DocsLayout`.
- Navigation source of truth: `navigation.ts` powers the sidebar, prev/next, and the hierarchy line in search results.
- Search data: `.generated/search-data.json` created at build time and consumed client-side by `src/markdoc/search.ts`; no remote API calls are made for search.

## Performance, scale, and cost expectations
- Static prerendering means negligible per-request compute; CDN caching should serve the bulk of traffic with low latency.
- Client bundle weight is driven mainly by the design system, search (FlexSearch + autocomplete), and syntax highlighting; lazy-loading search keeps that cost off the critical path.
- Build time scales with the number of Markdown pages (Markdoc parse + Next prerender + search-data generation). Large doc sets may warrant incremental search-data builds or chunked indexes.
- Infra cost is dominated by storage and CDN egress; no databases or dynamic backends are required for the current feature set.

# Future improvements
Find a way to lazy load the Fence / syntax highlighting so that we don't load `prism-react-renderer`