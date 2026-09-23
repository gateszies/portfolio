import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked, Renderer } from "marked";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

const COPY_ICON =
  '<svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 15c-.932 0-1.398 0-1.765-.152a2 2 0 0 1-1.083-1.083C2 13.398 2 12.932 2 12V5.2c0-1.12 0-1.68.218-2.108a2 2 0 0 1 .874-.874C3.52 2 4.08 2 5.2 2H12c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C15 3.602 15 4.068 15 5m-2.8 17h6.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C22 20.48 22 19.92 22 18.8v-6.6c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C20.48 9 19.92 9 18.8 9h-6.6c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C9 10.52 9 11.08 9 12.2v6.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C10.52 22 11.08 22 12.2 22Z"/></svg>';

const renderer = new Renderer();
const defaultCode = renderer.code.bind(renderer);

renderer.code = (token) =>
  `<div class="code-block"><div class="code-block-header"><button type="button" class="js-copy-code" aria-label="Copy code">${COPY_ICON}</button></div>${defaultCode(token)}</div>`;

marked.use({ renderer });

export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  hero: string;
  bodyHtml: string;
};

/** Reads every content/projects/*.md file — add a project by adding a file, no code changes needed. */
export function getAllProjects(): Project[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
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
        bodyHtml: marked.parse(content, { async: false }) as string,
      };
    });
}
