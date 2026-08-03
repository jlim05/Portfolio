import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // The sibling `my-portfolio/` app and its lockfile confuse Turbopack's
    // automatic workspace-root detection; pin it to this directory.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
