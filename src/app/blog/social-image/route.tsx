import { ImageResponse } from "next/og";

export function GET() {
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
          Mapperoni
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 80,
              fontWeight: 700,
              letterSpacing: "-0.05em",
            }}
          >
            Mapperoni Blog
          </div>
          <div
            style={{
              color: "#64748b",
              display: "flex",
              fontSize: 32,
              marginTop: 20,
            }}
          >
            News and updates from Mapperoni.
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
