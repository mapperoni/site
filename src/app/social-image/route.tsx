import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export async function GET() {
  const logo = await readFile(
    path.join(process.cwd(), "public/images/brand/mapperoni-logo.png"),
  );
  const logoUrl = `data:image/png;base64,${logo.toString("base64")}`;

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
        <img
          src={logoUrl}
          alt="Mapperoni"
          width={300}
          height={60}
          style={{ objectFit: "contain" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 1.05,
            }}
          >
            Shareable surveys &amp; collaborative maps
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
