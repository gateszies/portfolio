import { createRequire } from "node:module";
import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const require = createRequire(import.meta.url);
const rehypeCode = require.resolve("./src/lib/rehype-code.mjs");

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    // Placeholder art under /public and /placeholders is SVG; safe since it's
    // our own static, trusted content, not user-uploaded.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    qualities: [75, 92],
  },
};

const withMDX = createMDX({
  extension: /\.mdx$/,
  options: {
    // Local wrapper keeps themeCssSelector (a function) out of Turbopack's
    // serializable plugin options — site theme stays a plain `.dark` class.
    rehypePlugins: [rehypeCode],
  },
});

export default withMDX(nextConfig);
