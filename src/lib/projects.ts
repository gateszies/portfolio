import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked, Renderer, type Tokens } from "marked";
import { codeToHtml } from "shiki";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

const COPY_ICON =
  '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 15c-.932 0-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C2 13.398 2 12.932 2 12V5.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C3.52 2 4.08 2 5.2 2H12c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C15 3.602 15 4.068 15 5m-2.8 17h6.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C22 20.48 22 19.92 22 18.8v-6.6c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C20.48 9 19.92 9 18.8 9h-6.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C9 10.52 9 11.08 9 12.2v6.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C10.52 22 11.08 22 12.2 22Z"/></svg>';

const FILENAME_COMMENT = /^\/\/\s*([\w./-]+\.\w+)\s*$/;

function splitFilename(code: string) {
  const lines = code.split("\n");
  const match = FILENAME_COMMENT.exec(lines[0] ?? "");

  if (!match) {
    return { filename: null, code };
  }

  return { filename: match[1], code: lines.slice(1).join("\n") };
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

type CodeToken = Tokens.Code & { highlighted?: string };

const renderer = new Renderer();
const defaultCode = renderer.code.bind(renderer);

renderer.code = (token) => {
  const codeToken = token as CodeToken;
  return codeToken.highlighted ?? defaultCode(token);
};

marked.use({
  renderer,
  async walkTokens(token) {
    if (token.type !== "code") return;

    const codeToken = token as CodeToken;
    const { filename, code } = splitFilename(codeToken.text);

    let highlightedCode: string;
    try {
      highlightedCode = await codeToHtml(code, {
        lang: codeToken.lang || "text",
        themes: { light: "github-light", dark: "night-owl" },
        defaultColor: false,
      });
    } catch {
      highlightedCode = defaultCode({ ...codeToken, text: code });
    }

    const filenameHtml = filename
      ? `<span class="code-block-filename">${escapeHtml(filename)}</span>`
      : "<span></span>";

    codeToken.highlighted = `<div class="code-block"><div class="code-block-header">${filenameHtml}<button type="button" class="js-copy-code" aria-label="Copy code">${COPY_ICON}</button></div>${highlightedCode}</div>`;
  },
});

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  hero: string;
  bodyHtml: string;
};

export async function getAllProjects(): Promise<Project[]> {
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".md"));

  return Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.md$/, "");
      const fileContents = fs.readFileSync(
        path.join(PROJECTS_DIR, file),
        "utf8",
      );
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title as string,
        description: data.description as string,
        tags: (data.tags as string[]) ?? [],
        thumbnail: data.thumbnail as string,
        hero: data.hero as string,
        bodyHtml: await marked.parse(content, { async: true }),
      };
    }),
  );
}
