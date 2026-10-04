import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // `output: "export"` removed (Phase 1 blocker B1): a static export cannot
  // run middleware, cannot do server-side data fetching, and cannot serve
  // dynamic routes without generateStaticParams. This project needs a
  // normal Next.js server deployment for middleware/route-level auth
  // enforcement, per the approved Phase 1 decision.
};

export default nextConfig;
