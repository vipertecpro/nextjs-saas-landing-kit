import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Builds a self-contained server in .next/standalone with only the
  // dependencies it needs, so a deploy doesn't need node_modules.
  // `npm run release` packages it (see scripts/release.mjs).
  output: "standalone",
  // Responses are gzip-compressed by the Node server. Turn this off if a
  // proxy such as nginx compresses them instead.
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
