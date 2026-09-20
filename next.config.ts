import path from "node:path";
import type { NextConfig } from "next";

const root = path.resolve(process.cwd());

const nextConfig: NextConfig = {
  // $HOME tem pnpm-workspace.yaml; sem isso o Next resolve CSS fora do repo.
  outputFileTracingRoot: root,
  turbopack: {
    root,
  },
};

export default nextConfig;
