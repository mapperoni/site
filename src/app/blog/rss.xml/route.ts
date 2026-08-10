import { getBlogPosts } from "@/lib/blog";

const baseUrl = "https://www.mapperoni.com";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const posts = await getBlogPosts();
  const items = posts
    .map(({ slug, frontmatter }) => {
      const url = `${baseUrl}/blog/${slug}`;
      const publishedAt = new Date(
        `${frontmatter.publishedAt}T00:00:00Z`,
      ).toUTCString();

      return `
    <item>
      <title>${escapeXml(frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(frontmatter.description)}</description>
      <pubDate>${publishedAt}</pubDate>
      <dc:creator>${escapeXml(frontmatter.author)}</dc:creator>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Mapperoni Blog</title>
    <link>${baseUrl}/blog</link>
    <description>News and updates from Mapperoni.</description>
    <language>en</language>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
