import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

import { getBlogPost } from "@/lib/blog";

const imageContentTypes: Record<string, string> = {
  ".avif": "image/avif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

async function loadPublicImage(imagePath: string) {
  const relativePath = imagePath.replace(/^\/+/, "");
  const contentType =
    imageContentTypes[path.extname(relativePath).toLowerCase()];

  if (!contentType) {
    throw new Error(`Unsupported social card image: ${imagePath}`);
  }

  const image = await readFile(
    path.join(process.cwd(), "public", relativePath),
  );
  return `data:${contentType};base64,${image.toString("base64")}`;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  const { frontmatter } = post;
  const articleImage = frontmatter.image
    ? await loadPublicImage(frontmatter.image)
    : null;

  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#f8fafc",
        color: "#0f172a",
        display: "flex",
        height: "100%",
        padding: "72px 80px",
        width: "100%",
      }}
    >
      <div
        style={{
          alignItems: "flex-start",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ color: "#0284c7", display: "flex", fontSize: 28 }}>
          Mapperoni Blog
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 56,
            width: "100%",
          }}
        >
          {articleImage && (
            <img
              src={articleImage}
              alt=""
              width={220}
              height={220}
              style={{ objectFit: "contain" }}
            />
          )}
          <div
            style={{
              display: "flex",
              flex: 1,
              fontSize: 60,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.08,
            }}
          >
            {frontmatter.title}
          </div>
        </div>
        <div style={{ color: "#64748b", display: "flex", fontSize: 24 }}>
          mapperoni.com
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=86400",
      },
    },
  );
}
