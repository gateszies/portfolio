import rehypeExpressiveCode, {
  createRenderer,
} from "rehype-expressive-code";
import { pluginFileIcons } from "@xt0rted/expressive-code-file-icons";
import { CODE_THEMES } from "./code-themes.mjs";

const options = {
  themes: CODE_THEMES,
  useDarkModeMediaQuery: false,
  themeCssSelector: (theme) => (theme.type === "dark" ? ".dark" : false),
  defaultProps: {
    wrap: true,
  },
  plugins: [pluginFileIcons()],
  frames: {
    showCopyToClipboardButton: false,
  },
  styleOverrides: {
    codeFontSize: "14px",
    frames: {
      editorActiveTabIndicatorTopColor: "transparent",
      editorActiveTabIndicatorBottomColor: "transparent",
      editorTabBarBorderBottomColor: ({ resolveSetting }) =>
        resolveSetting("borderColor"),
    },
  },
  // React 19 refuses to execute <script> tags rendered inside components.
  // Drop EC's inline modules from the MDX tree (copy is off; wrap covers overflow).
  customCreateRenderer: async (rendererOptions) => {
    const renderer = await createRenderer(rendererOptions);
    return { ...renderer, jsModules: [] };
  },
};

export default function rehypeCode() {
  return rehypeExpressiveCode(options);
}
