import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

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
