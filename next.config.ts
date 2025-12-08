import withMarkdoc from "@markdoc/next.js";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md"],
  images: {
    dangerouslyAllowSVG: true,
  },
};

// Note: @markdoc/next.js uses this.getResolve() which is not supported by Turbopack.
// Must use --webpack flag until markdoc updates their loader for Turbopack compatibility.
export default withMarkdoc({ schemaPath: "./src/markdoc" })(nextConfig);
