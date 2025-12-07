import withMarkdoc from "@markdoc/next.js";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "md"],
};

export default withMarkdoc({ schemaPath: "./src/markdoc" })(nextConfig);
