import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    inlineCss: true,
  },
  images: {
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
