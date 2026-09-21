import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder art under /public and /placeholders is SVG; safe since it's
    // our own static, trusted content, not user-uploaded.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
  },
};

export default nextConfig;
