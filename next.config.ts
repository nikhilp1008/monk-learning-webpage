import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root: a stray lockfile in the home directory otherwise
  // makes Turbopack treat ~/ as the root and scan it.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
