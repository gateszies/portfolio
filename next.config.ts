import type { NextConfig } from "next";
import createMDX from "@next/mdx";

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
    // String package name so Turbopack's MDX loader can resolve it from
    // node_modules (absolute paths and file: symlinks both fail in the loader
    // pool — see .npmrc install-links). Local package wraps non-serializable
    // options (themeCssSelector / customCreateRenderer); site theme stays `.dark`.
    rehypePlugins: ["rehype-code"],
  },
});

export default withMDX(nextConfig);
