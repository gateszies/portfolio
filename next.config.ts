import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { join } from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  images: {
    qualities: [75, 92],
  },
};

const withMDX = createMDX({
  extension: /\.mdx$/,
  options: {
    // Absolute path: the MDX loader resolves relative specifiers against its
    // own directory in node_modules, not the project root. The local module
    // wraps non-serializable options (themeCssSelector / customCreateRenderer),
    // which cannot cross the loader boundary; site theme stays `.dark`.
    rehypePlugins: [join(import.meta.dirname, "plugins/rehype-code/index.mjs")],
  },
});

export default withMDX(nextConfig);
