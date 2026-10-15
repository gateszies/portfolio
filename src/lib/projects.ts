import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

type ProjectSpec = {
  label: string;
  value: string;
  href?: string;
};

type ProjectMetadata = {
  title: string;
  description: string;
  tags: string[];
  thumbnail: string;
  hero: string;
  specs?: ProjectSpec[];
  order?: number;
  draft?: boolean;
};

type Project = ProjectMetadata & {
  slug: string;
  Content: ComponentType;
};

type ProjectModule = {
  default: ComponentType;
  project: ProjectMetadata;
};

/** Reads every content/projects/*.mdx file — add a project by adding a file, no code changes needed. */
export async function getAllProjects(): Promise<Project[]> {
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx"));

  const projects = await Promise.all(
    files.map((file) => getProject(file.replace(/\.mdx$/, ""))),
  );

  return projects
    .filter((project) => !project.draft)
    .sort(
      (a, b) =>
        (a.order ?? Number.POSITIVE_INFINITY) -
        (b.order ?? Number.POSITIVE_INFINITY),
    );
}

export async function getProject(slug: string): Promise<Project> {
  const mod = (await import(`@content/projects/${slug}.mdx`)) as ProjectModule;

  return {
    slug,
    ...mod.project,
    Content: mod.default,
  };
}
